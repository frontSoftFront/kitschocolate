import * as R from 'ramda';
// components
import Layout from '../../../components/layout';
import OrderItem from '../../../components/order-item';
import OrderImage from '../../../components/order-image';
import CustomerReviews from '../../../components/customer-reviews';
// theme
import Theme from '../../../theme';
// ui
import { Flex, Section, PageTitle } from '../../../ui';
// ////////////////////////////////////////////////

const Content = ({ data }) => {
  const { title, extraImages } = data;

  return (
    <>
      <Section
        borderBottom="2px solid"
        borderColor={Theme.colors.quincy}
        py={Theme.styles.spacing.paddingY}
      >
        <PageTitle {...Theme.styles.pageTitle}>Магазин / {title}</PageTitle>
        <Flex
          flexWrap="wrap"
          justifyContent="space-between"
          mt={Theme.styles.spacing.paddingY}
        >
          <OrderImage extraImages={extraImages} />
          <OrderItem orderItem={data} />
        </Flex>
      </Section>
      <CustomerReviews />
    </>
  );
};

const ShopPage = ({ router, firebaseData }) => {
  const {
    query: { id }
  } = router;

  const data = R.path(['data', 'chocolates', id], firebaseData);

  return (
    <Layout
      router={router}
      firebaseData={firebaseData}
      collections={['chocolates']}
      title={R.path(['title'], data)}
    >
      <Content data={data} />
    </Layout>
  );
};

export default ShopPage;
