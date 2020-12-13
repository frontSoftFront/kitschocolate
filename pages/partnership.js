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

const PartnershipPage = ({ router }) => {
  useFirebaseConnect('partnership');
  const data = useSelector(state =>
    R.path(['firebase', 'data', 'partnership'], state)
  );
  const loading = R.isNil(data);

  return (
    <Layout router={router} loading={loading} title="Partnership">
      <Box mt={100}>Partnership Page</Box>
    </Layout>
  );
};

export default PartnershipPage;
