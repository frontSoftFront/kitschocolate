// components
import Layout from '../components/layout';
// theme
import Theme from '../theme';
// ui
// TODO: remove if don`t used
import { Box } from '../ui';
// ////////////////////////////////////////////////

const RecipePage = ({ router, firebaseData }) => (
  <Layout
    title="Recipe"
    router={router}
    firebaseData={firebaseData}
    collections={['chocolates']}
  >
    <Box mt={100}>Recipe Page</Box>
  </Layout>
);

export default RecipePage;
