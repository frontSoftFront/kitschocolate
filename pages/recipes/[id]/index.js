import * as R from 'ramda';
import { useState } from 'react';
// components
import Layout from '../../../components/layout';
import ImagesSlider from '../../../components/slider/images-slider';
import RecipeDescription from '../../../components/recipe-description';
import RecipeIngredients from '../../../components/recipe-ingredients';
// theme
import Theme from '../../../theme';
// ui
import { Section, PageTitle } from '../../../ui';
// ////////////////////////////////////////////////

const Content = ({ router, recipe, recipes, chocolates }) => {
  const {
    title,
    imgUrl,
    direction,
    description,
    ingredients,
    ingredientIcons,
    recipeDirectionImages = []
  } = recipe;

  const [quantity, setQuantity] = useState(1);
  const [activeSize, setActiveSize] = useState('small');
  const handleChangeQuantity = value => {
    if (R.or(R.gt(value, 100), R.lt(value, 1))) return;
    setQuantity(value);
  };

  const mapIngredients = R.map(item => {
    const { id, type } = item;

    if (R.equals(type, 'recipe')) {
      return R.merge(item, R.pathOr({}, [id], recipes));
    }

    if (R.equals(type, 'chocolate')) {
      return R.merge(item, R.pathOr({}, [id], chocolates));
    }

    return item;
  });
  const mappedIngredients = mapIngredients(ingredients);

  return (
    <>
      <Section mx="auto" maxWidth={1200} py={Theme.styles.spacing.paddingY}>
        <PageTitle {...Theme.styles.pageTitle}>Рецепт / {title}</PageTitle>
        <RecipeDescription
          imgUrl={imgUrl}
          quantity={quantity}
          activeSize={activeSize}
          description={description}
          setActiveSize={setActiveSize}
          ingredientIcons={ingredientIcons}
          handleChangeQuantity={handleChangeQuantity}
        />
        <RecipeIngredients
          router={router}
          direction={direction}
          activeSize={activeSize}
          recipeQuantity={quantity}
          ingredients={mappedIngredients}
        />
      </Section>
      <ImagesSlider pb={50} list={recipeDirectionImages} />
    </>
  );
};

const makePageTitle = ({ router, firebaseData }) => {
  const {
    query: { id }
  } = router;

  const recipeTitle = R.path(['data', 'recipes', id, 'title'], firebaseData);

  return R.isNil(recipeTitle) ? 'Рецепт' : recipeTitle;
};

const ShopPage = () => (
  <Layout title={makePageTitle} collections={['recipes', 'chocolates']}>
    {({ router, firebaseData }) => {
      const {
        query: { id }
      } = router;

      const recipes = R.path(['data', 'recipes'], firebaseData);
      const recipe = R.path(['data', 'recipes', id], firebaseData);
      const chocolates = R.path(['data', 'chocolates'], firebaseData);

      return (
        <Content
          router={router}
          recipe={recipe}
          recipes={recipes}
          chocolates={chocolates}
        />
      );
    }}
  </Layout>
);

export default ShopPage;
