/**
 * Monobank Payment Integration Helpers
 */

const MONOBANK_API_BASE = 'https://us-central1-kitschocolate-bc8f8.cloudfunctions.net';

/**
 * Convert currency string to integer code for Monobank API
 * @param {string} currencyStr - Currency string (UAH, USD, EUR)
 * @returns {number} - Currency code integer
 */
const getCurrencyCode = (currencyStr) => {
  const currencyMap = {
    'UAH': 980,
    'USD': 840,
    'EUR': 978
  };
  return currencyMap[currencyStr] || 980; // Default to UAH
};

/**
 * Create a Monobank payment
 * @param {Object} paymentData - Payment data
 * @param {number} paymentData.amount - Payment amount in UAH
 * @param {string} paymentData.orderId - Order ID
 * @param {Array} paymentData.items - Order items
 * @param {string} paymentData.redirectUrl - Redirect URL after payment
 * @returns {Promise<Object>} Payment result
 */
export const createMonobankPayment = async (paymentData) => {
  try {
    const { amount, orderId, items, redirectUrl } = paymentData;

    // Prepare basket order for Monobank
    const basketOrder = items.map(item => ({
      name: item.title,
      qty: item.quantity,
      unit: 'шт',
      code: item.id,
      price: Math.round(item.price * 100), // Convert to kopiyky
      sum: Math.round(item.subtotal * 100)
    }));

    const response = await fetch(`${MONOBANK_API_BASE}/createMonobankPayment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency: 'UAH',
        orderId,
        redirectUrl: redirectUrl || `${window.location.origin}/payment-success?orderId=${orderId}`,
        merchantPaymInfo: {
          reference: orderId,
          destination: 'Kits Chocolate Purchase',
          basketOrder
        }
      })
    });

    const result = await response.json();

    if (result.success) {
      return result;
    } else {
      throw new Error(result.error || 'Payment creation failed');
    }
  } catch (error) {
    console.error('Monobank payment error:', error);
    throw error;
  }
};

/**
 * Check payment status
 * @param {string} orderId - Order ID
 * @returns {Promise<Object>} Payment status
 */
export const checkPaymentStatus = async (orderId) => {
  try {
    const response = await fetch(
      `${MONOBANK_API_BASE}/getPaymentStatus?orderId=${orderId}`
    );
    
    const result = await response.json();
    
    if (result.success) {
      return result.payment;
    } else {
      throw new Error(result.error || 'Failed to get payment status');
    }
  } catch (error) {
    console.error('Failed to check payment status:', error);
    throw error;
  }
};

/**
 * Redirect to Monobank payment page
 * @param {string} paymentUrl - Monobank payment URL
 */
export const redirectToMonobankPayment = (paymentUrl) => {
  if (paymentUrl) {
    window.location.href = paymentUrl;
  }
};

/**
 * Format amount for display
 * @param {number} amount - Amount in kopiyky (cents)
 * @param {string} currency - Currency code
 * @returns {string} Formatted amount
 */
export const formatAmount = (amount, currency = 'UAH') => {
  const value = amount / 100;
  return `${value.toFixed(2)} ${currency}`;
};

/**
 * Validate payment amount
 * @param {number} amount - Amount in UAH
 * @returns {boolean} Whether amount is valid
 */
export const validatePaymentAmount = (amount) => {
  return amount >= 1 && amount <= 100000; // 1 UAH to 100,000 UAH
};

/**
 * Get payment status text in Ukrainian
 * @param {string} status - Payment status
 * @returns {string} Status text in Ukrainian
 */
export const getPaymentStatusText = (status) => {
  const statusMap = {
    'pending': 'В обробці',
    'success': 'Успішно',
    'failure': 'Не вдався',
    'expired': 'Закінчився термін дії',
    'unknown': 'Невідомий статус'
  };
  
  return statusMap[status] || 'Невідомий статус';
};

/**
 * Get payment status color
 * @param {string} status - Payment status
 * @returns {string} Color for status
 */
export const getPaymentStatusColor = (status) => {
  const colorMap = {
    'pending': '#FFA500', // Orange
    'success': '#28A745', // Green
    'failure': '#DC3545', // Red
    'expired': '#6C757D', // Gray
    'unknown': '#6C757D'  // Gray
  };
  
  return colorMap[status] || '#6C757D';
};
