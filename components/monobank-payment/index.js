import * as R from 'ramda';
import { useState } from 'react';
import { useRouter } from 'next/router';
// theme
import Theme from '../../theme';
// ui
import { Button } from '../../ui';
// helpers
import { showToastifyMessage } from '../../helpers';

const MonobankPayment = ({
  orderId,
  amount,
  items,
  onSuccess,
  onError,
  handleOpenLoader,
  handleCloseLoader,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { push } = useRouter();

  const createMonobankPayment = async () => {
    setIsLoading(true);
    handleOpenLoader(true);

    try {
      // Prepare basket order for Monobank
      const basketOrder = R.values(items).map(item => ({
        unit: 'шт',
        code: item.id,
        name: item.title,
        qty: item.quantity,
        price: Math.round(item.price * 100),
        sum: Math.round(item.subtotal * 100)
      }));

      const response = await fetch(
        'https://us-central1-kitschocolate-bc8f8.cloudfunctions.net/createMonobankPayment',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            amount,
            orderId,
            currency: 'UAH',
            webHookUrl:
              'https://us-central1-kitschocolate-bc8f8.cloudfunctions.net/monobankWebhook',
            redirectUrl: window.location.href,
            merchantPaymInfo: {
              reference: orderId,
              destination: 'Kits Chocolate Purchase',
              basketOrder
            }
          })
        }
      );

      const result = await response.json();

      if (result.success) {
        // Redirect to Monobank payment page
        push(result.redirectUrl);
        if (onSuccess) {
          onSuccess(result);
        }
      } else {
        throw new Error(result.error || 'Payment creation failed');
      }
    } catch (error) {
      console.error('Monobank payment error:', error);
      showToastifyMessage('Помилка створення платежу', 'error');
      if (onError) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
      handleCloseLoader(false);
    }
  };

  return (
    <Button
      {...Theme.styles.actionButton}
      mx="auto"
      width={250}
      mt={[20, 0]}
      type="submit"
      height={[40, 50]}
      disabled={isLoading}
      onClick={createMonobankPayment}
    >
      Оплатити через Monobank
    </Button>
  );
};

export default MonobankPayment;
