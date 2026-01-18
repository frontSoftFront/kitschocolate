# Monobank API Integration

This document describes the Monobank payment integration for the Kits Chocolate Firebase Functions.

## Setup

### 1. Environment Variables

Set the following environment variables in Firebase Functions:

```bash
firebase functions:config:set monobank.token="YOUR_MONOBANK_API_TOKEN"
firebase functions:config:set monobank.webhook_secret="YOUR_WEBHOOK_SECRET"
```

### 2. Install Dependencies

```bash
cd functions
npm install
```

### 3. Deploy Functions

```bash
firebase deploy --only functions
```

## API Endpoints

### 1. Create Payment

**Endpoint:** `POST /createMonobankPayment`

**Request Body:**
```json
{
  "amount": 1500.50,
  "currency": "UAH",
  "orderId": "order_123",
  "redirectUrl": "https://your-domain.com/payment-success",
  "webHookUrl": "https://your-domain.com/api/monobank-webhook",
  "paymentType": "debit",
  "merchantPaymInfo": {
    "reference": "order_123",
    "destination": "Kits Chocolate Purchase",
    "basketOrder": [
      {
        "name": "Dark Chocolate Bar",
        "qty": 2,
        "unit": "шт",
        "code": "choc_001",
        "price": 75025,
        "sum": 150050
      }
    ]
  }
}
```

**Response:**
```json
{
  "success": true,
  "paymentId": "mono_payment_id",
  "invoiceUrl": "https://pay.monobank.ua/invoice/...",
  "redirectUrl": "https://pay.monobank.ua/invoice/..."
}
```

### 2. Webhook Handler

**Endpoint:** `POST /monobankWebhook`

This endpoint receives payment status updates from Monobank.

**Webhook URL:** `https://us-central1-kitschocolate-bc8f8.cloudfunctions.net/monobankWebhook`

**Webhook Payload:**
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

**Supported Status Values:**
- `success` - Payment completed successfully
- `failure` - Payment failed
- `pending` - Payment is being processed
- `expired` - Payment link expired

**Webhook Features:**
- ✅ Validates required fields (reference, status)
- ✅ Updates payment status in Firebase
- ✅ Updates order status for successful payments
- ✅ Sends confirmation emails for successful payments
- ✅ Handles failed payments
- ✅ Comprehensive logging for debugging
- ✅ Signature verification ready (when Monobank provides format)

### 3. Get Payment Status

**Endpoint:** `GET /getPaymentStatus?orderId=order_123`

**Response:**
```json
{
  "success": true,
  "payment": {
    "orderId": "order_123",
    "amount": 1500.50,
    "currency": "UAH",
    "status": "success",
    "paymentId": "mono_payment_id",
    "invoiceUrl": "https://pay.monobank.ua/invoice/...",
    "createdAt": "2024-01-01T12:00:00.000Z",
    "updatedAt": "2024-01-01T12:05:00.000Z"
  }
}
```

## Usage Examples

### Frontend Integration

```javascript
// Create payment
const createPayment = async (orderData) => {
  try {
    const response = await fetch('/api/createMonobankPayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: orderData.total,
        orderId: orderData.id,
        redirectUrl: `${window.location.origin}/payment-success`,
        merchantPaymInfo: {
          reference: orderData.id,
          destination: 'Kits Chocolate Purchase',
          basketOrder: orderData.items.map(item => ({
            name: item.title,
            qty: item.quantity,
            unit: 'шт',
            code: item.id,
            price: Math.round(item.price * 100),
            sum: Math.round(item.subtotal * 100)
          }))
        }
      })
    });

    const result = await response.json();
    
    if (result.success) {
      // Redirect to Monobank payment page
      window.location.href = result.redirectUrl;
    }
  } catch (error) {
    console.error('Payment creation failed:', error);
  }
};

// Check payment status
const checkPaymentStatus = async (orderId) => {
  try {
    const response = await fetch(`/api/getPaymentStatus?orderId=${orderId}`);
    const result = await response.json();
    
    if (result.success) {
      return result.payment.status;
    }
  } catch (error) {
    console.error('Failed to get payment status:', error);
  }
};
```

### Payment Flow

1. **Create Order**: User creates an order on your website
2. **Create Payment**: Call `/createMonobankPayment` with order details
3. **Redirect to Payment**: Redirect user to Monobank payment page
4. **Payment Processing**: User completes payment on Monobank
5. **Webhook Notification**: Monobank sends status update to webhook
6. **Order Update**: System updates order status based on payment result
7. **Success Redirect**: User is redirected back to your success page

## Error Handling

### Common Error Responses

```json
{
  "error": "Missing required fields: amount, orderId, redirectUrl"
}
```

```json
{
  "error": "Monobank token not configured"
}
```

```json
{
  "error": "Payment creation failed",
  "details": "Invalid amount"
}
```

### Error Codes

- `400`: Bad Request - Missing or invalid parameters
- `405`: Method Not Allowed - Wrong HTTP method
- `500`: Internal Server Error - Server or Monobank API error

## Security Considerations

1. **Webhook Verification**: Implement signature verification for webhooks
2. **Token Security**: Keep Monobank API token secure
3. **Amount Validation**: Validate payment amounts on both client and server
4. **Order Validation**: Ensure order exists before creating payment
5. **HTTPS Only**: Use HTTPS for all payment-related requests

## Testing

### Test Environment

For testing, use Monobank's test environment:

- Test API URL: `https://api.monobank.ua/api/merchant`
- Test cards available in Monobank documentation

### Local Development

```bash
# Start Firebase emulator
firebase emulators:start --only functions

# Test payment creation
curl -X POST http://localhost:5001/your-project/us-central1/createMonobankPayment \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100.00,
    "orderId": "test_order_123",
    "redirectUrl": "http://localhost:3000/success"
  }'
```

## Monitoring

### Firebase Functions Logs

```bash
firebase functions:log --only createMonobankPayment,monobankWebhook,getPaymentStatus
```

### Database Structure

Payments are stored in Firebase Realtime Database:

```
/payments/{orderId}
  - orderId: string
  - amount: number
  - currency: string
  - status: string
  - paymentId: string
  - invoiceUrl: string
  - createdAt: string
  - updatedAt: string
  - monobankData: object
  - webhookData: object
```

## Support

For issues with Monobank API integration:

1. Check Firebase Functions logs
2. Verify environment variables are set correctly
3. Ensure Monobank API token is valid
4. Check webhook URL is accessible
5. Verify payment amounts are in kopiyky (cents)

## Changelog

- **v1.0.0**: Initial implementation with basic payment creation and webhook handling
