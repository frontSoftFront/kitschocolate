import React from 'react';
// components
import Layout from '../components/layout';
// store
import { wrapper } from '../store';
// ////////////////////////////////////////////////

const HomePage = props => {
  return <Layout>This is Home Page</Layout>;
};

export const getStaticProps = wrapper.getStaticProps();

export default HomePage;
