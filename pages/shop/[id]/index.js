import React from 'react';
import * as R from 'ramda';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { isLoaded, useFirebaseConnect } from 'react-redux-firebase';
// components
import Layout from '../../../components/layout';
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
  const { title } = data;

  return <Layout title={title}>say hi</Layout>;
};

export default ShopPage;
