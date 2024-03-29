import * as R from 'ramda';
import { useRouter } from 'next/router';
// components
import Layout from '../../../components/layout';
// forms
import OrderForm from '../../../forms/order-form';
// theme
import Theme from '../../../theme';
// ui
import { Section, PageTitle } from '../../../ui';
// ////////////////////////////////////////////////

const CheckoutPage = () => {
  const router = useRouter();

  const id = R.path(['query', 'id'], router);

  return (
    <Layout
      title="Оформлення замовлення"
      collections={['chocolates', `orders/${id}`]}
    >
      {({ firebaseData, handleOpenLoader, handleCloseLoader }) => (
        <Section maxWidth={1100} py={Theme.styles.spacing.paddingY}>
          <PageTitle
            {...Theme.styles.pageTitle}
            mb={Theme.styles.spacing.paddingY}
          >
            Оформлення замовлення
          </PageTitle>
          <OrderForm
            orderId={id}
            handleOpenLoader={handleOpenLoader}
            handleCloseLoader={handleCloseLoader}
            order={R.path(['data', 'orders', id], firebaseData)}
          />
        </Section>
      )}
    </Layout>
  );
};

export default CheckoutPage;
