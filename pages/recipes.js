import * as R from 'ramda';
// components
import Layout from '../components/layout';
import ItemComponent from '../components/item';
// theme
import Theme from '../theme';
// ui
import { Grid, Section, PageTitle } from '../ui';
// ////////////////////////////////////////////////

const makeSortedByOrderArrayFromObject = R.compose(
  R.sortBy(R.prop('order')),
  R.values
);

const Content = ({ router, recipes }) => {
  const handleGoToDetailPage = id => router.push(`recipes/${id}`);

  return (
    <Section pt={[30, 40, 50]}>
      <PageTitle mb={[30, 40, 50]} {...Theme.styles.pageTitle}>
        Рецепти
      </PageTitle>
      <Grid
        gridGap="20px"
        mt={[30, 40, 50]}
        gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      >
        {recipes.map((item, index) => (
          <ItemComponent
            px="0px"
            key={index}
            item={item}
            itemType="recipe"
            height="max-content"
            handleGoToDetailPage={handleGoToDetailPage}
          />
        ))}
      </Grid>
    </Section>
  );
};

const RecipesPage = ({ router, firebaseData }) => {
  const recipes = R.compose(
    makeSortedByOrderArrayFromObject,
    R.pathOr({}, ['data', 'recipes'])
  )(firebaseData);

  return (
    <Layout
      title="Recipes"
      router={router}
      collections={['recipes']}
      firebaseData={firebaseData}
    >
      <Content router={router} recipes={recipes} />
    </Layout>
  );
};

export default RecipesPage;
