import * as R from 'ramda';
import { useRouter } from 'next/router';
// components
import Layout from '../../../components/layout';
// forms
import OrderForm from '../../../forms/order-form';
// theme
import Theme from '../../../theme';
// ui
import { Button, Section, PageTitle } from '../../../ui';
// ////////////////////////////////////////////////

const AcceptedOrder = ({ paymentStatus }) => {
  const { push } = useRouter();

  return (
    <Section maxWidth={1100} pt={Theme.styles.spacing.paddingY}>
      <PageTitle {...Theme.styles.pageTitle} mb={Theme.styles.spacing.paddingY}>
        Замовлення прийнято
      </PageTitle>
      <Button
        {...Theme.styles.actionButton}
        height={40}
        width={150}
        mx="auto"
        onClick={() => push('/')}
      >
        На головну
      </Button>
    </Section>
  );
};

const CheckoutPage = () => {
  const router = useRouter();

  const id = R.path(['query', 'id'], router);

  return (
    <Layout
      title="Оформлення замовлення"
      collections={['chocolates', `orders/${id}`]}
    >
      {({ firebaseData, handleOpenLoader, handleCloseLoader }) =>
        R.pathEq(['data', 'orders', id, 'status'], 'ACCEPTED', firebaseData) ? (
          <AcceptedOrder
            paymentStatus={R.path(
              ['data', 'orders', id, 'paymentStatus'],
              firebaseData
            )}
          />
        ) : (
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
