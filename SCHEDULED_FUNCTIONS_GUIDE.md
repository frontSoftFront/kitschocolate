# Scheduled Functions for Payment Status Checking

This guide explains the automated scheduled functions that monitor and update payment statuses in your Monobank integration.

## 🚀 **What Are Scheduled Functions?**

Scheduled functions are Firebase Cloud Functions that run automatically at specified intervals without requiring any user interaction. They provide **automated monitoring** and **maintenance** for your payment system.

## 📁 **File Structure**

### **Main Functions File:**
- `functions/index.js` - Contains HTTP functions (createMonobankPayment, monobankWebhook, getPaymentStatus)

### **Scheduled Functions File:**
- `functions/scheduled-functions.js` - Contains all scheduled functions

### **Import Statement:**
```javascript
// In functions/index.js
require('./scheduled-functions');
```

## ⏰ **Available Scheduled Functions**

### **1. Payment Status Checker** 
**Schedule:** Every 5 minutes  
**File:** `functions/scheduled-functions.js`

**What it does:**
- Automatically checks all pending payments
- Updates payment statuses via Monobank API
- Marks old payments as expired (24+ hours)
- Sends confirmation emails for successful payments
- Updates order statuses automatically

**Benefits:**
- ✅ **Real-time updates** even if webhooks fail
- ✅ **Automatic cleanup** of old payments
- ✅ **Email notifications** sent automatically
- ✅ **Database synchronization** maintained

### **2. Payment Cleanup** 
**Schedule:** Daily at 2:00 AM (Kiev time)  
**File:** `functions/scheduled-functions.js`

**What it does:**
- Archives payments older than 30 days
- Moves them to `archived_payments` collection
- Keeps your active payments collection clean
- Maintains data for reporting/auditing

### **3. Payment Reminders** 
**Schedule:** Every hour  
**File:** `functions/scheduled-functions.js`

**What it does:**
- Tracks payments that need reminders
- Updates reminder timestamps
- Prepares for future reminder functionality

## 🔧 **How to Deploy Scheduled Functions**

### **Step 1: Deploy Functions**
```bash
cd functions
firebase deploy --only functions
```

### **Step 2: Verify Deployment**
```bash
firebase functions:list
```

You should see:
- `checkPaymentStatusesScheduled` (scheduled)
- `cleanupOldPaymentsScheduled` (scheduled)
- `sendPaymentRemindersScheduled` (scheduled)

## 📊 **How the Payment Status Checker Works**

### **1. Every 5 Minutes:**
```javascript
// Function automatically runs from scheduled-functions.js
exports.checkPaymentStatusesScheduled = functions.pubsub
  .schedule('every 5 minutes')
  .onRun(async (context) => {
    // 1. Find all pending payments
    // 2. Check each with Monobank API
    // 3. Update statuses in Firebase
    // 4. Send confirmation emails
  });
```

### **2. Payment Processing Flow:**
```
Pending Payment → Check Monobank API → Update Status → Send Email → Update Order
```

### **3. Status Updates:**
- **Success:** Payment confirmed, order marked as paid
- **Failure:** Payment failed, order marked as failed  
- **Pending:** Status unchanged, timestamp updated
- **Expired:** Payment older than 24 hours marked as expired

## 🎯 **Configuration Options**

### **Schedule Intervals:**
```javascript
// Every 5 minutes
.schedule('every 5 minutes')

// Every hour  
.schedule('0 * * * *')

// Daily at specific time
.schedule('0 2 * * *')
.timeZone('Europe/Kiev')
```

### **Environment Variables Needed:**
```bash
# Monobank API token
firebase functions:config:set monobank.token="YOUR_TOKEN"

# Email password (for confirmations)
firebase functions:config:set email.password="YOUR_EMAIL_PASSWORD"
```

## 📈 **Monitoring and Logs**

### **View Function Logs:**
```bash
# View recent logs
firebase functions:log

# View specific function logs
firebase functions:log --only checkPaymentStatusesScheduled
```

### **Expected Log Output:**
```
Starting scheduled payment status check...
Found 3 pending payments
Payment order_123 status changed from pending to success
Payment order_456 is older than 24 hours, marking as expired
Updated 5 payment/order records
Scheduled payment status check completed successfully
```

## 🔄 **Integration with Webhooks**

### **Dual System:**
- **Webhooks:** Immediate updates from Monobank
- **Scheduled Functions:** Backup monitoring every 5 minutes

### **Benefits:**
- ✅ **Redundancy:** If webhook fails, scheduled function catches it
- ✅ **Reliability:** Ensures no payments are missed
- ✅ **Performance:** Webhooks are faster, scheduled functions are more reliable

## 🚨 **Error Handling**

### **API Failures:**
- Logs errors but continues processing other payments
- Updates `lastCheckError` field in database
- Continues monitoring on next run

### **Configuration Issues:**
- Skips payments if Monobank token is missing
- Logs configuration errors clearly
- Continues with other operations

## 💰 **Cost Considerations**

### **Firebase Pricing:**
- **Free Tier:** 125K invocations/month
- **Paid Tier:** $0.40 per million invocations

### **Estimated Monthly Cost:**
- **5-minute schedule:** 8,640 invocations/month
- **Free tier covers:** 125,000 invocations/month
- **Your usage:** Well within free tier limits

## 🎯 **Customization Options**

### **Change Schedule Frequency:**
```javascript
// Check every 10 minutes instead of 5
.schedule('every 10 minutes')

// Check every hour instead of 5 minutes  
.schedule('0 * * * *')
```

### **Modify Expiration Time:**
```javascript
// Change from 24 hours to 48 hours
if (hoursSinceCreation > 48) {
  // Mark as expired
}
```

### **Add Custom Logic:**
```javascript
// Add SMS notifications
if (newStatus === 'success') {
  // Send SMS confirmation
  await sendSMS(payment.phone, 'Payment confirmed!');
}
```

## 🚀 **Deployment Checklist**

### **Before Deploying:**
- [ ] Monobank token configured
- [ ] Email password configured  
- [ ] Functions tested locally
- [ ] Database structure ready

### **After Deploying:**
- [ ] Check function logs for errors
- [ ] Verify scheduled execution
- [ ] Test with a pending payment
- [ ] Monitor email delivery

## 📱 **Frontend Integration**

### **Real-time Updates:**
Your frontend components automatically benefit from scheduled functions:

```javascript
// PaymentStatusDisplay component
// Will show updated statuses automatically
<PaymentStatusDisplay
  orderId={orderId}
  onPaymentComplete={handlePaymentComplete}
/>
```

### **No Code Changes Needed:**
- Frontend continues to work as before
- Status updates happen automatically
- Users see real-time payment confirmations

## 🎉 **Ready to Deploy!**

Your scheduled functions are now ready to provide:

- ✅ **Automatic payment monitoring** every 5 minutes
- ✅ **Real-time status updates** for users
- ✅ **Automatic email confirmations** for successful payments
- ✅ **Database cleanup** and maintenance
- ✅ **Reliable backup** to webhook system

## 📝 **Important Notes**

### **File Organization:**
- **HTTP Functions:** `functions/index.js`
- **Scheduled Functions:** `functions/scheduled-functions.js`
- **Import Statement:** `require('./scheduled-functions')` in index.js

### **No Duplicates:**
- Each function exists in only one location
- Clean separation of concerns
- Easy maintenance and updates

Deploy with confidence knowing your payment system will be automatically monitored and maintained! 🚀
