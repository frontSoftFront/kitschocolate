import * as R from 'ramda';
// components
import Layout from '../../../components/layout';
// forms
import OrderForm from '../../../forms/order-form';
// theme
import Theme from '../../../theme';
// ui
import { Section, PageTitle } from '../../../ui';
// ////////////////////////////////////////////////

const CheckoutPage = ({ router, firebaseData }) => {
  const id = R.path(['query', 'id'], router);

  return (
    <Layout
      router={router}
      firebaseData={firebaseData}
      title="Оформлення замовлення"
      collections={['chocolates', `orders/${id}`]}
    >
      <Section py={50} maxWidth={1100}>
        <PageTitle {...Theme.styles.pageTitle} mb={50}>
          Оформлення замовлення
        </PageTitle>
        <OrderForm
          orderId={id}
          order={R.path(['data', 'orders', id], firebaseData)}
        />
      </Section>
    </Layout>
  );
};

export default CheckoutPage;
