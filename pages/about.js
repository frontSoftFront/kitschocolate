import React from 'react';
import * as R from 'ramda';
import { useSelector } from 'react-redux';
import { useFirebaseConnect } from 'react-redux-firebase';
// components
import Layout from '../components/layout';
// theme
import Theme from '../theme';
// ui
import { Box } from '../ui';
// ////////////////////////////////////////////////

const AboutPage = ({ router }) => {
  useFirebaseConnect('about');
  const data = useSelector(state =>
    R.path(['firebase', 'data', 'about'], state)
  );
  const loading = R.isNil(data);

  return (
    <Layout title="About" router={router} loading={loading}>
      <Box mt={100}>About Page</Box>
    </Layout>
  );
};

export default AboutPage;
