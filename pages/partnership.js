import React from 'react';
import * as R from 'ramda';
import { useSelector } from 'react-redux';
import { useFirebaseConnect } from 'react-redux-firebase';
// components
import Layout from '../components/layout';
// theme
import Theme from '../theme';
// ui
// TODO: remove if don`t used
import {
  Img,
  Box,
  Flex,
  Text,
  Button,
  Section,
  Article,
  PageTitle,
  SectionTitle,
  ArticleTitle
} from '../ui';
// ////////////////////////////////////////////////

const PartnershipPage = () => {
  useFirebaseConnect('partnership');
  const data = useSelector(state =>
    R.path(['firebase', 'data', 'partnership'], state)
  );
  const loading = R.isNil(data);
  if (loading) return <div>Loading...</div>;

  return (
    <Layout title="Partnership">
      <Box mt={100}>Partnership Page</Box>
    </Layout>
  );
};

export default PartnershipPage;
