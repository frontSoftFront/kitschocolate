import React from 'react';
// components
import Layout from '../components/layout';
// theme
import Theme from '../theme';
// ui
import { Box } from '../ui';
// ////////////////////////////////////////////////

const AboutPage = ({ router, firebaseData }) => (
  <Layout
    title="About"
    router={router}
    firebaseData={firebaseData}
    collections={['chocolates']}
  >
    <Box mt={100}>About Page</Box>
  </Layout>
);

export default AboutPage;
