import React from 'react';
// components
import Layout from '../components/layout';
// theme
import Theme from '../theme';
// ui
// TODO: remove if don`t used
import { Box } from '../ui';
// ////////////////////////////////////////////////

const PartnershipPage = ({ router, firebaseData }) => (
  <Layout
    router={router}
    title="Partnership"
    firebaseData={firebaseData}
    collections={['chocolates']}
  >
    <Box mt={100}>Partnership Page</Box>
  </Layout>
);

export default PartnershipPage;
