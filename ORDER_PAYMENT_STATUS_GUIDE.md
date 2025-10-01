# Order Payment Status Integration Guide

This guide explains how payment status is automatically set inside the order object in your Monobank integration.

## 🎯 **Overview**

The system automatically updates the `paymentStatus` field inside each order object whenever payment status changes. This happens through multiple mechanisms to ensure reliability.

## 📊 **Order Payment Status Fields**

### **Core Status Fields:**
```javascript
{
  "orderId": "order_123",
  "paymentStatus": "paid",           // Main status: pending, paid, failed, expired
  "paymentMethod": "monobank",       // Payment method used
  "paymentId": "invoice_456",        // Monobank invoice ID
  "paidAt": "2024-01-15T10:30:00Z",  // When payment was confirmed
  "updatedAt": "2024-01-15T10:30:00Z" // Last update timestamp
}
```

### **Status-Specific Fields:**
```javascript
// For successful payments
{
  "paymentStatus": "paid",
  "paidAt": "2024-01-15T10:30:00Z",
  "paymentId": "invoice_456"
}

// For failed payments
{
  "paymentStatus": "failed",
  "paymentFailedAt": "2024-01-15T10:30:00Z",
  "paymentId": "invoice_456"
}

// For expired payments
{
  "paymentStatus": "expired",
  "paymentExpiredAt": "2024-01-15T10:30:00Z",
  "expirationReason": "Payment older than 24 hours"
}
```

## 🔄 **Automatic Status Updates**

### **1. Webhook Handler** (`functions/index.js`)
**Triggers:** Real-time when Monobank sends webhook notifications

```javascript
// When payment is successful
if (status === 'success' && invoiceId) {
  const orderRef = admin.database().ref(`orders/${reference}`);
  const orderUpdateData = {
    paymentStatus: 'paid',
    paidAt: new Date().toISOString(),
    paymentId: invoiceId,
    paymentMethod: 'monobank'
  };
  await orderRef.update(orderUpdateData);
}
```

### **2. Scheduled Function** (`functions/scheduled-functions.js`)
**Triggers:** Every 5 minutes to check pending payments

```javascript
// When payment status changes
if (newStatus === 'success') {
  const orderUpdatePromise = admin
    .database()
    .ref(`orders/${orderId}`)
    .update({
      paymentStatus: 'paid',
      paidAt: now.toISOString(),
      paymentId: payment.paymentId,
      paymentMethod: 'monobank'
    });
}
```

### **3. Manual Admin Function** (`functions/index.js`)
**Triggers:** Admin can manually update status via API

```javascript
// POST to /updateOrderPaymentStatus
{
  "orderId": "order_123",
  "paymentStatus": "paid",
  "paymentId": "invoice_456"
}
```

## 📈 **Status Flow Diagram**

```
Order Created
     ↓
paymentStatus: 'pending'
     ↓
Payment Initiated
     ↓
Webhook Received OR Scheduled Check
     ↓
paymentStatus: 'paid' | 'failed' | 'expired'
     ↓
Order Processed
```

## 🎯 **Status Values**

### **`pending`**
- Initial status when order is created
- Payment has been initiated but not yet confirmed
- Order is waiting for payment completion

### **`paid`**
- Payment has been successfully completed
- Order can be processed for fulfillment
- Includes `paidAt` timestamp and `paymentId`

### **`failed`**
- Payment attempt failed
- Customer may need to retry payment
- Includes `paymentFailedAt` timestamp

### **`expired`**
- Payment was not completed within 24 hours
- Automatically set by scheduled function
- Includes `paymentExpiredAt` timestamp and reason

## 🔧 **How to Use Order Payment Status**

### **Frontend Integration:**
```javascript
// Check if order is paid
if (order.paymentStatus === 'paid') {
  // Show success message
  // Enable order tracking
  // Allow customer to download receipt
}

// Check if payment is pending
if (order.paymentStatus === 'pending') {
  // Show payment in progress
  // Display payment instructions
  // Enable payment retry
}
```

### **Admin Dashboard:**
```javascript
// Filter orders by payment status
const paidOrders = orders.filter(order => order.paymentStatus === 'paid');
const pendingOrders = orders.filter(order => order.paymentStatus === 'pending');
const failedOrders = orders.filter(order => order.paymentStatus === 'failed');
```

### **Order Processing:**
```javascript
// Only process paid orders
if (order.paymentStatus === 'paid') {
  // Start fulfillment process
  // Send confirmation email
  // Update inventory
  // Generate shipping label
}
```

## 🚀 **API Endpoints**

### **Get Order Payment Status:**
```bash
GET /getPaymentStatus?orderId=order_123
```

**Response:**
```json
{
  "success": true,
  "payment": {
    "orderId": "order_123",
    "status": "paid",
    "amount": 1500,
    "currency": "UAH",
    "paymentId": "invoice_456",
    "createdAt": "2024-01-15T10:00:00Z",
    "paidAt": "2024-01-15T10:30:00Z"
  }
}
```

### **Update Order Payment Status (Admin):**
```bash
POST /updateOrderPaymentStatus
Content-Type: application/json

{
  "orderId": "order_123",
  "paymentStatus": "paid",
  "paymentId": "invoice_456",
  "paymentMethod": "monobank"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order payment status updated successfully",
  "orderId": "order_123",
  "paymentStatus": "paid",
  "updateData": {
    "paymentStatus": "paid",
    "paymentMethod": "monobank",
    "updatedAt": "2024-01-15T10:30:00Z",
    "paidAt": "2024-01-15T10:30:00Z",
    "paymentId": "invoice_456"
  }
}
```

## 🔍 **Database Structure**

### **Orders Collection:**
```
orders/
  ├── order_123/
  │   ├── paymentStatus: "paid"
  │   ├── paymentMethod: "monobank"
  │   ├── paymentId: "invoice_456"
  │   ├── paidAt: "2024-01-15T10:30:00Z"
  │   ├── updatedAt: "2024-01-15T10:30:00Z"
  │   └── ... (other order fields)
  └── order_456/
      ├── paymentStatus: "pending"
      ├── paymentMethod: "monobank"
      └── ... (other order fields)
```

### **Payments Collection:**
```
payments/
  ├── order_123/
  │   ├── status: "paid"
  │   ├── paymentId: "invoice_456"
  │   ├── amount: 1500
  │   ├── currency: "UAH"
  │   └── ... (payment details)
  └── order_456/
      ├── status: "pending"
      └── ... (payment details)
```

## 🎯 **Benefits of This Integration**

### **✅ Real-time Updates:**
- Order status updates immediately when payment is confirmed
- No manual intervention required
- Customers see status changes instantly

### **✅ Reliable Monitoring:**
- Multiple update mechanisms (webhook + scheduled)
- Automatic retry for failed updates
- Comprehensive error handling

### **✅ Admin Control:**
- Manual status updates when needed
- Complete audit trail of status changes
- Easy troubleshooting and support

### **✅ Frontend Ready:**
- Order status available in real-time
- Easy to build status displays
- Simple conditional logic for order processing

## 🚨 **Error Handling**

### **Webhook Failures:**
- Scheduled function catches missed updates
- Automatic retry every 5 minutes
- Comprehensive logging for debugging

### **Database Errors:**
- Graceful error handling
- Detailed error messages
- Continues processing other orders

### **API Errors:**
- Validation of all inputs
- Clear error responses
- Proper HTTP status codes

## 📝 **Best Practices**

### **1. Always Check Status:**
```javascript
// Before processing any order
if (order.paymentStatus !== 'paid') {
  throw new Error('Order not paid yet');
}
```

### **2. Handle All Statuses:**
```javascript
switch (order.paymentStatus) {
  case 'paid':
    // Process order
    break;
  case 'pending':
    // Show payment instructions
    break;
  case 'failed':
    // Offer retry option
    break;
  case 'expired':
    // Create new payment
    break;
}
```

### **3. Use Timestamps:**
```javascript
// Check if payment is recent
const paidAt = new Date(order.paidAt);
const now = new Date();
const hoursSincePayment = (now - paidAt) / (1000 * 60 * 60);

if (hoursSincePayment > 24) {
  // Payment is old, verify status
}
```

## 🎉 **Ready to Use!**

Your order payment status integration is now complete and working! The system will automatically:

- ✅ **Set payment status** in orders when payments are confirmed
- ✅ **Update timestamps** for tracking payment history
- ✅ **Handle all status changes** (paid, failed, expired)
- ✅ **Provide admin tools** for manual updates
- ✅ **Maintain data consistency** between payments and orders

Your orders now have complete payment status tracking! 🚀
