# Monobank Webhook Setup Guide

This guide will help you configure the webhook in your Monobank merchant dashboard so that payment status updates are automatically sent to your application.

## 🎯 **What the Webhook Does**

When a customer completes or cancels a payment on Monobank, the webhook automatically:
- ✅ Updates payment status in your database
- ✅ Updates order status (paid/failed)
- ✅ Sends confirmation emails
- ✅ Logs all activities

## 📋 **Step-by-Step Setup**

### **Step 1: Access Monobank Merchant Dashboard**

1. Log into your Monobank merchant account
2. Navigate to the merchant dashboard
3. Look for "Settings", "Webhooks", or "API Configuration"

### **Step 2: Configure Webhook URL**

**Set this exact URL in your Monobank dashboard:**
```
https://us-central1-kitschocolate-bc8f8.cloudfunctions.net/monobankWebhook
```

### **Step 3: Configure Webhook Settings**

In your Monobank dashboard, set these options:

- **Webhook URL:** `https://us-central1-kitschocolate-bc8f8.cloudfunctions.net/monobankWebhook`
- **Events to send:** All payment events (success, failure, pending, expired)
- **HTTP Method:** POST
- **Content Type:** application/json
- **Retry attempts:** 3-5 (recommended)
- **Timeout:** 30 seconds

### **Step 4: Test the Webhook**

You can test the webhook using our test script:

```bash
cd functions
node test-webhook.js
```

## 🔍 **How to Verify Webhook is Working**

### **Method 1: Check Function Logs**
```bash
firebase functions:log --only monobankWebhook
```

### **Method 2: Check Firebase Database**
Look for updated records in:
- `/payments/{orderId}` - Payment status updates
- `/orders/{orderId}` - Order status updates

### **Method 3: Check Email Notifications**
Successful payments will trigger confirmation emails to `kitscustomers@gmail.com`

## 📊 **Webhook Payload Format**

Monobank will send webhooks in this format:

```json
{
  "invoiceId": "2508318zrdBEYPnKQbA2",
  "status": "success",
  "amount": 150050,
  "ccy": 980,
  "merchantPaymInfo": {
    "reference": "order_123"
  },
  "reference": "order_123"
}
```

## 🚨 **Troubleshooting**

### **Webhook Not Receiving Updates**

1. **Check URL Configuration:**
   - Ensure the webhook URL is exactly correct
   - No extra spaces or characters

2. **Check Function Status:**
   ```bash
   firebase functions:log --only monobankWebhook
   ```

3. **Test Manually:**
   ```bash
   curl -X POST https://us-central1-kitschocolate-bc8f8.cloudfunctions.net/monobankWebhook \
     -H "Content-Type: application/json" \
     -d '{"invoiceId":"test123","status":"success","reference":"test_order"}'
   ```

### **Common Issues**

1. **404 Error:** Function not deployed
2. **500 Error:** Check function logs for details
3. **Timeout:** Increase timeout in Monobank dashboard
4. **Authentication:** Ensure webhook URL is publicly accessible

## 📞 **Support**

If you need help setting up the webhook:

1. **Check Monobank Documentation** for their specific webhook setup process
2. **Contact Monobank Support** if you can't find webhook settings
3. **Check Firebase Logs** for any errors
4. **Test with our script** to verify functionality

## 🎉 **Success Indicators**

You'll know the webhook is working when:

- ✅ Payment status updates automatically in your database
- ✅ Order status changes to "paid" for successful payments
- ✅ Confirmation emails are sent for successful payments
- ✅ Function logs show webhook activity
- ✅ No manual intervention needed for payment status updates

---

**🎯 Once configured, your Monobank payments will be fully automated!**
