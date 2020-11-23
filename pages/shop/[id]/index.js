import React from 'react';
import * as R from 'ramda';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { isLoaded, useFirebaseConnect } from 'react-redux-firebase';
// components
import Layout from '../../../components/layout';
import OrderItem from '../../../components/order-item';
import OrderImage from '../../../components/order-image';
// theme
import Theme from '../../../theme';
// ui
import { Flex, Section, PageTitle } from '../../../ui';
// ////////////////////////////////////////////////

const ShopPage = () => {
  // TODO: check how order of collections affects data on useFirebaseConnect
  const {
    query: { id }
  } = useRouter();
  useFirebaseConnect(`chocolates/${id}`);
  const data = useSelector(state =>
    R.path(['firebase', 'data', 'chocolates', id], state)
  );
  if (R.not(isLoaded(data))) return <div>Loading...</div>;
  const { title, imageUrl } = data;
  const extraImages = [imageUrl, imageUrl, imageUrl, imageUrl];

  return (
    <Layout title={title}>
      <Section py={50}>
        <PageTitle
          fontSize={45}
          textAlign="center"
          fontFamily="Caveat"
          color={Theme.colors.congoBrown}
        >
          Магазин / {title}
        </PageTitle>
        <Flex mt={50} justifyContent="space-between">
          <OrderImage imageUrl={imageUrl} extraImages={extraImages} />
          <OrderItem orderItem={data} />
        </Flex>
      </Section>
    </Layout>
  );
};

export default ShopPage;
