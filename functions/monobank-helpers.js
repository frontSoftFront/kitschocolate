const crypto = require('crypto');

/**
 * Verify Monobank webhook signature
 * @param {string} payload - Raw request body
 * @param {string} signature - Signature from headers
 * @param {string} secretKey - Monobank webhook secret key
 * @returns {boolean} - Whether signature is valid
 */
const verifyWebhookSignature = (payload, signature, secretKey) => {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secretKey)
      .update(payload, 'utf8')
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
};

/**
 * Validate payment amount
 * @param {number} amount - Amount in kopiyky (cents)
 * @param {number} minAmount - Minimum amount in kopiyky
 * @param {number} maxAmount - Maximum amount in kopiyky
 * @returns {boolean} - Whether amount is valid
 */
const validatePaymentAmount = (
  amount,
  minAmount = 100,
  maxAmount = 10000000
) => {
  return amount >= minAmount && amount <= maxAmount;
};

/**
 * Format amount for display
 * @param {number} amount - Amount in kopiyky (cents)
 * @param {string} currency - Currency code
 * @returns {string} - Formatted amount
 */
const formatAmount = (amount, currency = 'UAH') => {
  const value = amount / 100;
  return `${value.toFixed(2)} ${currency}`;
};

/**
 * Create merchant payment info object
 * @param {string} orderId - Order ID
 * @param {Array} items - Array of order items
 * @param {string} destination - Payment destination
 * @returns {Object} - Merchant payment info
 */
const createMerchantPaymInfo = (
  orderId,
  items = [],
  destination = 'Kits Chocolate Purchase'
) => {
  const basketOrder =
    items.length > 0
      ? items.map(item => ({
          name: item.title || item.name,
          qty: item.quantity || 1,
          unit: 'шт',
          code: item.id || orderId,
          price: Math.round((item.price || 0) * 100),
          sum: Math.round((item.subtotal || item.price || 0) * 100)
        }))
      : [
          {
            name: 'Chocolate Products',
            qty: 1,
            unit: 'шт',
            code: orderId,
            price: 0,
            sum: 0
          }
        ];

  return {
    reference: orderId,
    destination,
    basketOrder
  };
};

/**
 * Generate unique payment ID
 * @param {string} orderId - Order ID
 * @returns {string} - Unique payment ID
 */
const generatePaymentId = orderId => {
  const timestamp = Date.now();
  const random = Math.random()
    .toString(36)
    .substring(2, 15);
  return `${orderId}_${timestamp}_${random}`;
};

/**
 * Convert currency string to integer code for Monobank API
 * @param {string} currencyStr - Currency string (UAH, USD, EUR)
 * @returns {number} - Currency code integer
 */
const getCurrencyCode = currencyStr => {
  const currencyMap = {
    UAH: 980,
    USD: 840,
    EUR: 978
  };
  return currencyMap[currencyStr] || 980; // Default to UAH
};

/**
 * Validate payment status
 * @param {string} status - Payment status from Monobank
 * @returns {boolean} - Whether status is valid
 */
const isValidPaymentStatus = status => {
  const validStatuses = ['pending', 'success', 'failure', 'expired'];
  return validStatuses.includes(status);
};

module.exports = {
  verifyWebhookSignature,
  validatePaymentAmount,
  formatAmount,
  createMerchantPaymInfo,
  generatePaymentId,
  isValidPaymentStatus,
  getCurrencyCode
};
