import React from 'react';
import * as R from 'ramda';
import { useSelector } from 'react-redux';
import { isLoaded, useFirebaseConnect } from 'react-redux-firebase';
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
        py={50}
        borderBottom="2px solid"
        borderColor={Theme.colors.quincy}
      >
        <PageTitle
          fontSize={45}
          textAlign="center"
          fontFamily="Caveat"
          color={Theme.colors.congoBrown}
        >
          Магазин / {title}
        </PageTitle>
        <Flex mt={50} justifyContent="space-between">
          <OrderImage extraImages={extraImages} />
          <OrderItem orderItem={data} />
        </Flex>
      </Section>
      <CustomerReviews />
    </>
  );
};

const ShopPage = ({ router }) => {
  // TODO: check how order of collections affects data on useFirebaseConnect
  const {
    query: { id }
  } = router;
  useFirebaseConnect(`chocolates/${id}`);
  const data = useSelector(state =>
    R.path(['firebase', 'data', 'chocolates', id], state)
  );

  return (
    <Layout
      router={router}
      title={R.path(['title'], data)}
      loading={R.not(isLoaded(data))}
    >
      <Content data={data} />
    </Layout>
  );
};

export default ShopPage;
