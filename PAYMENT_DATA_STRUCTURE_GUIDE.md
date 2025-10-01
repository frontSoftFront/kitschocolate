# Payment Data Structure Guide

This guide explains the new unified data structure where all payment information is stored directly in the orders object instead of a separate payments collection.

## 🗂️ **New Data Structure**

### **Before (Separate Collections):**
```
orders/
  └── order_123/
      ├── orderDescription: {...}
      ├── items: {...}
      └── total: 1500

payments/
  └── order_123/
      ├── status: "pending"
      ├── paymentId: "invoice_456"
      ├── amount: 1500
      └── currency: "UAH"
```

### **After (Unified Structure):**
```
orders/
  └── order_123/
      ├── orderDescription: {...}
      ├── items: {...}
      ├── total: 1500
      ├── paymentStatus: "paid"
      ├── paymentId: "invoice_456"
      ├── paidAt: "2024-01-15T10:30:00Z"
      └── payment: {
          ├── amount: 1500
          ├── currency: "UAH"
          ├── status: "paid"
          ├── paymentId: "invoice_456"
          ├── createdAt: "2024-01-15T10:00:00Z"
          ├── updatedAt: "2024-01-15T10:30:00Z"
          ├── paidAt: "2024-01-15T10:30:00Z"
          ├── monobankData: {...}
          └── webhookData: {...}
      }
```

## 📊 **Payment Object Structure**

### **Core Payment Fields:**
```javascript
payment: {
  amount: 1500,                    // Amount in kopiyky (cents)
  currency: "UAH",                 // Currency code
  status: "pending",               // pending, paid, failed, expired
  paymentId: "invoice_456",        // Monobank invoice ID
  createdAt: "2024-01-15T10:00:00Z", // When payment was created
  updatedAt: "2024-01-15T10:30:00Z", // Last update timestamp
  monobankData: {...},             // Full Monobank API response
  webhookData: {...}               // Webhook payload data
}
```

### **Status-Specific Fields:**
```javascript
// For successful payments
payment: {
  status: "paid",
  paidAt: "2024-01-15T10:30:00Z",
  lastCheckedAt: "2024-01-15T10:30:00Z"
}

// For failed payments
payment: {
  status: "failed",
  failedAt: "2024-01-15T10:30:00Z",
  lastCheckError: "API timeout"
}

// For expired payments
payment: {
  status: "expired",
  expiredAt: "2024-01-15T10:30:00Z",
  expirationReason: "Payment older than 24 hours"
}
```

### **Order-Level Payment Fields:**
```javascript
// Top-level order fields for quick access
{
  paymentStatus: "paid",           // Quick status reference
  paymentId: "invoice_456",        // Quick payment ID reference
  paymentMethod: "monobank",       // Payment method used
  paidAt: "2024-01-15T10:30:00Z", // When payment was confirmed
  paymentFailedAt: null,           // When payment failed (if applicable)
  paymentExpiredAt: null           // When payment expired (if applicable)
}
```

## 🔄 **Updated Functions**

### **1. createMonobankPayment**
**Before:** Saved to `payments/{orderId}`
**After:** Saves to `orders/{orderId}/payment`

```javascript
// New structure
const paymentDataToSave = {
  payment: {
    amount,
    currency,
    status: 'pending',
    paymentId: response.data.invoiceId,
    createdAt: new Date().toISOString(),
    monobankData: response.data
  }
};
await orderRef.update(paymentDataToSave);
```

### **2. monobankWebhook**
**Before:** Updated `payments/{orderId}` and `orders/{orderId}` separately
**After:** Updates both in `orders/{orderId}` using dot notation

```javascript
// Payment status update
const paymentUpdateData = {
  'payment.status': status,
  'payment.updatedAt': new Date().toISOString(),
  'payment.webhookData': req.body,
  'payment.lastWebhookReceived': new Date().toISOString()
};

// Order status update
const orderUpdateData = {
  paymentStatus: 'paid',
  paidAt: new Date().toISOString(),
  paymentId: invoiceId,
  paymentMethod: 'monobank'
};

await orderRef.update({...paymentUpdateData, ...orderUpdateData});
```

### **3. getPaymentStatus**
**Before:** Read from `payments/{orderId}`
**After:** Reads from `orders/{orderId}/payment`

```javascript
const orderData = await orderRef.once('value');
const paymentData = orderData.val()?.payment;

if (!paymentData) {
  return res.status(404).json({ error: 'Payment not found' });
}
```

### **4. Scheduled Functions**
**Before:** Queried `payments` collection
**After:** Queries `orders` collection with `payment/status` filter

```javascript
// Get orders with pending payments
const snapshot = await ordersRef
  .orderByChild('payment/status')
  .equalTo('pending')
  .once('value');

// Update payment status using dot notation
await orderRef.update({
  'payment.status': newStatus,
  'payment.updatedAt': now.toISOString(),
  'payment.lastCheckedAt': now.toISOString()
});
```

## 🎯 **Benefits of New Structure**

### **✅ Simplified Data Management:**
- Single source of truth for order and payment data
- No need to maintain separate collections
- Easier to query and update related data

### **✅ Better Performance:**
- Fewer database reads (one query instead of two)
- Atomic updates for order and payment status
- Reduced complexity in data synchronization

### **✅ Improved Consistency:**
- Payment and order data always in sync
- No risk of orphaned payment records
- Simplified backup and restore procedures

### **✅ Easier Development:**
- Single object to work with
- Clearer data relationships
- Simplified API responses

## 🔍 **Database Queries**

### **Get Orders with Pending Payments:**
```javascript
const snapshot = await ordersRef
  .orderByChild('payment/status')
  .equalTo('pending')
  .once('value');
```

### **Get Orders with Successful Payments:**
```javascript
const snapshot = await ordersRef
  .orderByChild('paymentStatus')
  .equalTo('paid')
  .once('value');
```

### **Get Orders with Payments Older Than 30 Days:**
```javascript
const snapshot = await ordersRef
  .orderByChild('payment/createdAt')
  .endAt(thirtyDaysAgo.toISOString())
  .once('value');
```

## 📝 **Migration Notes**

### **Existing Data:**
- Old `payments` collection can be archived
- No immediate migration required for existing orders
- New orders will use the unified structure

### **API Compatibility:**
- `getPaymentStatus` API remains the same
- Response format unchanged
- Frontend code requires no changes

### **Cleanup:**
- `archived_payments` → `archived_orders`
- Cleanup functions now archive entire orders
- Better data retention and audit trail

## 🚀 **Ready to Deploy**

The new unified structure is now implemented across all functions:

- ✅ **createMonobankPayment** - Saves payment data in orders
- ✅ **monobankWebhook** - Updates payment status in orders
- ✅ **getPaymentStatus** - Reads payment data from orders
- ✅ **Scheduled Functions** - Work with orders collection
- ✅ **Cleanup Functions** - Archive orders instead of payments

Your payment system now uses a cleaner, more efficient data structure! 🎉
