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

const RecipePage = ({ router }) => {
  useFirebaseConnect('recipe');
  const data = useSelector(state =>
    R.path(['firebase', 'data', 'recipe'], state)
  );
  const loading = R.isNil(data);

  return (
    <Layout router={router} title="Recipe" loading={loading}>
      <Box mt={100}>Recipe Page</Box>
    </Layout>
  );
};

export default RecipePage;
