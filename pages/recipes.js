import * as R from 'ramda';
// components
import Layout from '../components/layout';
import ItemComponent from '../components/item';
import PricesSlider from '../components/slider/prices-slider';
// theme
import Theme from '../theme';
// ui
import { Flex, Section, Grid, PageTitle } from '../ui';
// ////////////////////////////////////////////////

const makeSortedByOrderArrayFromObject = R.compose(
  R.sortBy(R.prop('order')),
  R.values
);

const Content = ({ router, recipes, chocolateList }) => {
  const handleGoToDetailPage = id => router.push(`recipes/${id}`);

  return (
    <Section pt={[30, 40, 50]}>
      <PageTitle mb={50} {...Theme.styles.pageTitle}>Рецепти</PageTitle>
      <Grid
        mt={50}
        gridGap="20px"
        gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      >
        {recipes.map((item, index) => (
          <ItemComponent
            px={0}
            key={index}
            item={item}
            itemType="recipe"
            imgSize={{ width: '100%', height: 350 }}
            handleGoToDetailPage={handleGoToDetailPage}
          />
        ))}
      </Grid>
    </Section>
  );
};

const RecipesPage = ({ router, firebaseData }) => {
  const chocolateList = R.pathOr({}, ['data', 'chocolates'], firebaseData);
  const recipes = R.compose(
    makeSortedByOrderArrayFromObject,
    R.pathOr({}, ['data', 'recipes'])
  )(firebaseData);

  return (
    <Layout
      title="Recipes"
      router={router}
      firebaseData={firebaseData}
      collections={['recipes', 'chocolates', 'ingredients']}
    >
      <Content
        router={router}
        recipes={recipes}
        chocolateList={chocolateList}
      />
    </Layout>
  );
};

export default RecipesPage;
