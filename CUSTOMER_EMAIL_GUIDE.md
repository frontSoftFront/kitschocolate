# Dual Email Notifications Guide

This guide explains when and how emails are sent to both customers and admins after payment confirmation in your Monobank integration.

## 📧 **When Emails Are Sent**

### **1. Real-time Webhook Notification** 
**Trigger:** When Monobank sends a webhook with `status: 'success'`
**File:** `functions/index.js` (lines 438-575)
**Timing:** Immediate (within seconds of payment completion)

### **2. Scheduled Function Backup**
**Trigger:** Every 5 minutes when checking pending payments
**File:** `functions/scheduled-functions.js` (lines 125-264)
**Timing:** Within 5 minutes of payment completion (if webhook missed)

## 🎯 **Dual Email Recipients**

### **Customer Email:**
- **Recipient:** `orderData.orderDescription.email`
- **Purpose:** Payment confirmation and order details
- **Template:** Customer-friendly with order information

### **Admin Email:**
- **Recipient:** `kitscustomers@gmail.com`
- **Purpose:** Order processing notification and next steps
- **Template:** Admin-focused with processing instructions

## 📊 **Customer Data Structure**

### **Order Data Path:**
```javascript
orders/
  └── order_123/
      └── orderDescription/
          ├── email: "customer@example.com"
          ├── firstName: "John"
          ├── lastName: "Doe"
          ├── phoneNumber: "+380123456789"
          └── ... (other fields)
```

### **Email Extraction:**
```javascript
const customerEmail = orderData?.orderDescription?.email;
const customerName = orderData?.orderDescription?.firstName && orderData?.orderDescription?.lastName 
  ? `${orderData.orderDescription.firstName} ${orderData.orderDescription.lastName}`
  : 'Valued Customer';
```

## 📧 **Dual Email System**

### **1. Customer Email**
**Subject:** `Платіж підтверджено - Kits Chocolate`
**Purpose:** Confirm payment and provide order details to customer

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
    <h1>Платіж підтверджено! 🎉</h1>
  </div>
  <div style="padding: 20px; background-color: #f9f9f9;">
    <h2>Шановний(а) [Customer Name],</h2>
    <p>Ваш платіж успішно оброблено!</p>
    
    <div style="background-color: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #2e7d32;">Деталі замовлення</h3>
      <p><strong>Номер замовлення:</strong> [Order ID]</p>
      <p><strong>ID платежу:</strong> [Payment ID]</p>
      <p><strong>Сума:</strong> [Amount] [Currency]</p>
      <p><strong>Спосіб оплати:</strong> Monobank</p>
      <p><strong>Дата:</strong> [Date]</p>
    </div>
    
    <p style="color: #2e7d32; font-weight: bold;">
      Дякуємо за покупку! Ваше замовлення буде оброблено найближчим часом.
    </p>
    
    <p>Якщо у вас є питання, будь ласка, зв'яжіться з нами: kitscustomers@gmail.com</p>
  </div>
</div>
```

### **2. Admin Email**
**Subject:** `Отримано новий платіж - Замовлення #[Order ID]`
**Purpose:** Notify admin of new payment and provide processing instructions

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background-color: #2196F3; color: white; padding: 20px; text-align: center;">
    <h1>Отримано новий платіж! 💰</h1>
  </div>
  <div style="padding: 20px; background-color: #f9f9f9;">
    <h2>Сповіщення про платіж для адміністратора</h2>
    <p>Новий платіж успішно оброблено і потребує вашої уваги.</p>
    
    <div style="background-color: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #1976d2;">Деталі замовлення</h3>
      <p><strong>Номер замовлення:</strong> [Order ID]</p>
      <p><strong>ID платежу:</strong> [Payment ID]</p>
      <p><strong>Сума:</strong> [Amount] [Currency]</p>
      <p><strong>Спосіб оплати:</strong> Monobank</p>
      <p><strong>Клієнт:</strong> [Customer Name]</p>
      <p><strong>Email клієнта:</strong> [Customer Email]</p>
      <p><strong>Дата:</strong> [Date]</p>
    </div>
    
    <p style="color: #1976d2; font-weight: bold;">
      Будь ласка, обробіть це замовлення для виконання.
    </p>
    
    <p><strong>Наступні кроки:</strong></p>
    <ul>
      <li>Перевірте платіж в панелі Monobank</li>
      <li>Підготуйте замовлення до відправки</li>
      <li>Оновіть статус замовлення на "Обробляється"</li>
      <li>Надішліть підтвердження відправки клієнту</li>
    </ul>
  </div>
</div>
```

## 🔧 **Email Configuration**

### **SMTP Settings:**
```javascript
const transporter = nodemailer.createTransport({
  port: 465,
  secure: true,
  host: 'smtp.gmail.com',
  auth: {
    user: 'kitsinfo1234@gmail.com',
    pass: 'cmomofaurjbfiqfx'
  }
});
```

### **Email Headers:**
```javascript
const mailOptions = {
  html: emailTemplate,
  subject: 'Payment Confirmed - Kits Chocolate',
  to: customerEmail || 'kitscustomers@gmail.com',
  from: 'Kits Chocolate Website'
};
```

## 🚀 **Dual Email Flow Diagram**

```
Payment Success
     ↓
Webhook Received
     ↓
Get Order Data
     ↓
Extract Customer Email
     ↓
Send Customer Email (Confirmation)
     ↓
Send Admin Email (Notification)
     ↓
Log Both Results
```

## 📝 **Error Handling**

### **Missing Customer Email:**
```javascript
if (!customerEmail) {
  console.log('No customer email found for order:', orderId);
  // Send to admin as backup
  to: 'kitscustomers@gmail.com'
}
```

### **Email Send Failure:**
```javascript
try {
  await transporter.sendMail(mailOptions);
  console.log('Confirmation email sent:', info.messageId);
} catch (emailError) {
  console.error('Failed to send confirmation email:', emailError);
  // Don't fail the webhook if email fails
}
```

### **Scheduled Function Fallback:**
```javascript
if (!customerEmail) {
  console.log('No customer email found for order:', orderId);
  // Skip sending email if no customer email
  return;
}
```

## 🎯 **Email Timing Scenarios**

### **Scenario 1: Webhook Works**
```
Payment Complete → Webhook (0-5 seconds) → Email Sent to Customer
```

### **Scenario 2: Webhook Fails**
```
Payment Complete → Webhook Fails → Scheduled Check (5 minutes) → Email Sent to Customer
```

### **Scenario 3: No Customer Email**
```
Payment Complete → Webhook/Scheduled → No Customer Email → Email Sent to Admin
```

## 📊 **Email Tracking**

### **Success Logs:**
```
Customer confirmation email sent: <messageId>
Admin notification email sent: <messageId>
```

### **Error Logs:**
```
Customer email sending error: [error details]
Admin email sending error: [error details]
Failed to send confirmation email: [error details]
No customer email found for order: [orderId]
```

## 🔍 **Testing Email Functionality**

### **Test with Real Payment:**
1. Create a test order with valid email
2. Complete payment via Monobank
3. Check logs for email confirmation
4. Verify email received by customer

### **Test Missing Email:**
1. Create order without email field
2. Complete payment
3. Verify email goes to admin address

### **Test Email Template:**
```javascript
// Test email template locally
const testData = {
  customerName: 'John Doe',
  orderId: 'test_123',
  paymentId: 'invoice_456',
  amount: '150.00 UAH',
  date: new Date().toLocaleString('uk-UA')
};
```

## 🎨 **Customizing Email Template**

### **Change Colors:**
```javascript
// Change success color from green to blue
background-color: #2196F3; // Blue instead of #4CAF50
```

### **Add Company Logo:**
```html
<div style="text-align: center; margin-bottom: 20px;">
  <img src="https://your-domain.com/logo.png" alt="Kits Chocolate" style="height: 60px;">
</div>
```

### **Add Social Media Links:**
```html
<div style="text-align: center; margin-top: 20px;">
  <a href="https://facebook.com/kitschocolate">Facebook</a> |
  <a href="https://instagram.com/kitschocolate">Instagram</a>
</div>
```

## 📱 **Mobile-Friendly Email**

### **Responsive Design:**
```css
@media only screen and (max-width: 600px) {
  .email-container {
    width: 100% !important;
    padding: 10px !important;
  }
}
```

## 🚨 **Important Notes**

### **Email Delivery:**
- ✅ **Gmail SMTP:** Reliable delivery
- ✅ **HTML Format:** Rich formatting
- ✅ **Fallback Text:** Plain text version

### **Privacy:**
- ✅ **Customer Data:** Only used for order confirmation
- ✅ **No Spam:** Only sent for successful payments
- ✅ **Unsubscribe:** Not applicable (transactional emails)

### **Compliance:**
- ✅ **GDPR:** Transactional emails are allowed
- ✅ **CAN-SPAM:** Transactional emails exempt
- ✅ **Data Protection:** Customer data handled securely

## 🎉 **Ready to Send Customer Emails!**

Your system now automatically sends payment confirmation emails to customers:

- ✅ **Real-time delivery** via webhook
- ✅ **Backup delivery** via scheduled function
- ✅ **Customer personalization** with name and order details
- ✅ **Professional template** with company branding
- ✅ **Error handling** with admin fallback
- ✅ **Comprehensive logging** for monitoring

Your customers will now receive beautiful, personalized payment confirmation emails! 🚀
