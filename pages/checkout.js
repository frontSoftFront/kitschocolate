// components
import Layout from '../components/layout';
// forms
import OrderForm from '../forms/order-form';
// theme
import Theme from '../theme';
// ui
import { Section, PageTitle } from '../ui';
// ////////////////////////////////////////////////

const OrderPage = ({ router }) => (
  <Layout router={router} loading={false} title="Оформлення замовлення">
    <Section py={50} maxWidth={1100}>
      <PageTitle {...Theme.styles.pageTitle} mb={50}>
        Оформлення замовлення
      </PageTitle>
      <OrderForm />
    </Section>
  </Layout>
);

export default OrderPage;
