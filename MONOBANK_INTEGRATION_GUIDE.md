# Monobank Payment Integration Guide

This guide explains how to integrate Monobank payments into your Kits Chocolate application.

## 🚀 **What's Been Integrated**

### 1. **Firebase Functions** ✅
- `createMonobankPayment` - Creates payment invoices
- `monobankWebhook` - Handles payment status updates
- `getPaymentStatus` - Retrieves payment status

### 2. **Frontend Components** ✅
- `MonobankPayment` component for payment creation
- `PaymentSuccessPage` for handling redirects
- Updated `OrderForm` with Monobank payment option

### 3. **Helper Functions** ✅
- Payment creation utilities
- Status checking functions
- Amount formatting and validation

## 📋 **Setup Instructions**

### Step 1: Environment Variables
Set your Monobank API credentials in Firebase:

```bash
firebase functions:config:set monobank.token="YOUR_MONOBANK_API_TOKEN"
firebase functions:config:set monobank.webhook_secret="YOUR_WEBHOOK_SECRET"
```

### Step 2: Deploy Functions
```bash
cd functions
npm install
firebase deploy --only functions
```

### Step 3: Configure Webhook URL
In your Monobank merchant dashboard, set the webhook URL to:
```
https://us-central1-kitschocolate-bc8f8.cloudfunctions.net/monobankWebhook
```

## 🎯 **How It Works**

### Payment Flow:
1. **User selects Monobank** in checkout
2. **Clicks "Оплатити через Monobank"** button
3. **System creates payment** via Firebase function
4. **User is redirected** to Monobank payment page
5. **User completes payment** on Monobank
6. **Monobank sends webhook** with payment status
7. **User is redirected back** to success page
8. **Order status is updated** automatically

## 💳 **Payment Options Available**

Your checkout now has 3 payment methods:

1. **Готівкою** (Cash on delivery)
2. **Карткою (LiqPay)** (LiqPay card payment)
3. **Monobank** (Monobank card payment) ⭐ **NEW**

## 🔧 **Files Modified/Created**

### New Files:
- `functions/monobank-helpers.js` - Helper functions
- `functions/MONOBANK_README.md` - Technical documentation
- `components/monobank-payment/index.js` - Payment component
- `pages/payment-success.js` - Success page
- `helpers/monobank-payment.js` - Frontend utilities
- `MONOBANK_INTEGRATION_GUIDE.md` - This guide

### Modified Files:
- `functions/index.js` - Added Monobank functions
- `functions/package.json` - Added dependencies
- `forms/order-form/index.js` - Added Monobank payment option

## 🎨 **UI Changes**

### Payment Selection:
- Added Monobank as a third payment option
- Responsive design for mobile/desktop
- Visual feedback for selected payment method

### Payment Button:
- "Оплатити через Monobank" button
- Loading state during payment creation
- Error handling with user feedback

### Success Page:
- Payment status display
- Order details summary
- Navigation buttons

## 🔒 **Security Features**

1. **Environment Variables** - API tokens stored securely
2. **Input Validation** - Amount and order validation
3. **Error Handling** - Comprehensive error responses
4. **Webhook Verification** - Ready for signature verification
5. **HTTPS Only** - All communication over secure channels

## 📱 **Testing**

### Test Payment Flow:
1. Go to checkout page
2. Select "Monobank" payment method
3. Fill in order details
4. Click "Оплатити через Monobank"
5. Should redirect to Monobank payment page

### Test Webhook:
```bash
# Check webhook logs
firebase functions:log --only monobankWebhook
```

## 🐛 **Troubleshooting**

### Common Issues:

1. **"Monobank token not configured"**
   - Set environment variables in Firebase

2. **"Payment creation failed"**
   - Check Monobank API credentials
   - Verify order amount is valid

3. **Webhook not receiving updates**
   - Check webhook URL configuration
   - Verify Firebase function is deployed

4. **Payment status not updating**
   - Check webhook logs
   - Verify order ID matches

## 📞 **Support**

For issues with Monobank integration:

1. Check Firebase Functions logs
2. Verify environment variables
3. Test with small amounts first
4. Contact Monobank support for API issues

## 🎉 **Next Steps**

1. **Test the integration** with small amounts
2. **Configure production** Monobank credentials
3. **Set up monitoring** for payment status
4. **Add analytics** for payment tracking
5. **Implement retry logic** for failed payments

## 📊 **Monitoring**

Monitor your payments through:

- Firebase Functions logs
- Firebase Realtime Database (`/payments/{orderId}`)
- Monobank merchant dashboard
- Email notifications for successful payments

---

**🎯 Your Monobank payment integration is now complete and ready for testing!**
