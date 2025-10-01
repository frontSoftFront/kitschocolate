# Frontend Webhook Integration Guide

This guide explains how the Monobank webhook functionality is integrated into your frontend application.

## 🔄 **Complete Payment Flow with Webhook Integration**

### **1. Payment Creation (Frontend → Backend)**
```javascript
// components/monobank-payment/index.js
const createMonobankPayment = async () => {
  // 1. User clicks "Оплатити через Monobank"
  // 2. Frontend calls createMonobankPayment function
  // 3. Backend creates payment with Monobank
  // 4. User is redirected to Monobank payment page
  window.location.href = result.redirectUrl;
};
```

### **2. Payment Processing (Monobank)**
- User completes payment on Monobank
- Monobank processes the payment

### **3. Webhook Notification (Monobank → Backend)**
```javascript
// functions/index.js - monobankWebhook
exports.monobankWebhook = functions.https.onRequest((req, res) => {
  // 1. Monobank sends webhook to your backend
  // 2. Backend updates payment status in Firebase
  // 3. Backend updates order status
  // 4. Backend sends confirmation email
});
```

### **4. Payment Status Check (Frontend → Backend)**
```javascript
// pages/payment-success.js
const checkPaymentStatus = async () => {
  // 1. User returns to your site
  // 2. Frontend checks payment status
  // 3. Shows appropriate status to user
};
```

## 🎯 **Where Webhook Functionality is Used in Frontend**

### **1. Payment Success Page**
**File:** `pages/payment-success.js`

**What it does:**
- Displays payment status when user returns from Monobank
- Uses `PaymentStatusDisplay` component for real-time updates
- Shows payment details and appropriate actions

**Webhook Integration:**
- Polls for payment status updates (works alongside webhook)
- Displays real-time status changes
- Handles all payment states (success, failure, pending, expired)

### **2. Payment Status Display Component**
**File:** `components/payment-status-display/index.js`

**What it does:**
- Shows comprehensive payment status information
- Includes real-time polling for pending payments
- Displays payment details and action buttons

**Webhook Integration:**
- Automatically refreshes status for pending payments
- Shows webhook-updated status in real-time
- Provides user-friendly status messages

### **3. Payment Status Poller Component**
**File:** `components/payment-status-poller/index.js`

**What it does:**
- Polls payment status at regular intervals
- Updates UI when status changes
- Stops polling when payment is complete

**Webhook Integration:**
- Works alongside webhook for immediate updates
- Provides fallback for webhook delays
- Ensures user sees status changes quickly

### **4. Monobank Payment Component**
**File:** `components/monobank-payment/index.js`

**What it does:**
- Creates Monobank payment
- Redirects user to Monobank payment page
- Handles payment creation errors

**Webhook Integration:**
- Sets up the payment that will trigger webhooks
- Provides redirect URL for payment completion

## 🚀 **How to Use Webhook-Enabled Components**

### **1. Basic Payment Status Display**
```javascript
import PaymentStatusDisplay from '../components/payment-status-display';

<PaymentStatusDisplay
  orderId="order_123"
  onPaymentComplete={(status, data) => {
    console.log('Payment completed:', status);
  }}
/>
```

### **2. Payment Status with Polling**
```javascript
import PaymentStatusPoller from '../components/payment-status-poller';

<PaymentStatusPoller
  orderId="order_123"
  onStatusChange={(status, data) => {
    console.log('Status changed:', status);
  }}
  onComplete={(status, data) => {
    console.log('Payment completed:', status);
  }}
  pollInterval={3000} // 3 seconds
  maxAttempts={40} // 2 minutes max
/>
```

### **3. Complete Payment Flow**
```javascript
// 1. Create payment
const createPayment = async (orderData) => {
  const result = await createMonobankPayment({
    amount: orderData.total,
    orderId: orderData.id,
    items: orderData.items
  });
  
  // Redirect to Monobank
  window.location.href = result.redirectUrl;
};

// 2. Handle payment completion
const handlePaymentComplete = (status, paymentData) => {
  if (status === 'success') {
    // Show success message
    showToastifyMessage('Платіж успішно здійснено!', 'success');
  } else if (status === 'failure') {
    // Show error message
    showToastifyMessage('Платіж не вдався', 'error');
  }
};
```

## 📊 **Webhook vs Frontend Polling**

### **Webhook (Backend)**
- ✅ **Real-time updates** from Monobank
- ✅ **Automatic processing** of payment status
- ✅ **Email notifications** sent automatically
- ✅ **Database updates** happen immediately

### **Frontend Polling (Fallback)**
- ✅ **Immediate UI updates** for users
- ✅ **Works even if webhook is delayed**
- ✅ **Provides user feedback** during processing
- ✅ **Handles edge cases** and timeouts

## 🎨 **UI Components Available**

### **1. PaymentStatusDisplay**
- Complete payment status with details
- Real-time updates with polling
- Action buttons for different states
- Beautiful, responsive design

### **2. PaymentStatusPoller**
- Lightweight status polling
- Loading indicators
- Error handling
- Configurable intervals

### **3. MonobankPayment**
- Payment creation button
- Loading states
- Error handling
- Redirect to Monobank

## 🔧 **Configuration Options**

### **Polling Configuration**
```javascript
<PaymentStatusPoller
  pollInterval={5000} // Check every 5 seconds
  maxAttempts={60}   // Try for 5 minutes
/>
```

### **Display Configuration**
```javascript
<PaymentStatusDisplay
  showPoller={true}    // Show polling for pending payments
  autoRefresh={true}   // Auto-refresh status
/>
```

## 🎯 **Best Practices**

### **1. Use Both Webhook and Polling**
- Webhook for backend processing
- Polling for frontend updates
- Provides redundancy and better UX

### **2. Handle All Payment States**
- Success: Show confirmation
- Failure: Show retry options
- Pending: Show loading with polling
- Expired: Show renewal options

### **3. Provide Clear User Feedback**
- Loading states during polling
- Error messages for failures
- Success confirmations
- Clear next steps

### **4. Graceful Degradation**
- Polling continues if webhook fails
- Fallback to manual status checks
- Clear error messages for users

## 🚀 **Ready to Use!**

Your frontend is now fully integrated with webhook functionality:

- ✅ **Real-time payment status** updates
- ✅ **Automatic UI refresh** for pending payments
- ✅ **Comprehensive error handling**
- ✅ **Beautiful, responsive components**
- ✅ **Configurable polling** and display options

The webhook ensures your backend stays updated, while the frontend components provide immediate feedback to users! 🎉
