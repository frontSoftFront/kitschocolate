import * as R from 'ramda';
// components
import Layout from '../components/layout';
import PricesSlider from '../components/slider/prices-slider';
// theme
import Theme from '../theme';
// ui
import { Section, PageTitle } from '../ui';
// ////////////////////////////////////////////////

const makeSortedByOrderArrayFromObject = R.compose(
  R.sortBy(R.prop('order')),
  R.values
);

const Content = ({ router, categories, chocolateList }) => {
  const mappedCategories = R.compose(
    R.map(category => {
      const { chocolates } = category;

      const mappedChocolates = R.map(
        id => R.path([id], chocolateList),
        chocolates
      );

      return R.assoc('chocolates', mappedChocolates, category);
    }),
    makeSortedByOrderArrayFromObject
  )(categories);

  return (
    <Section py={Theme.styles.spacing.paddingY}>
      <PageTitle {...Theme.styles.pageTitle}>
        Істинний шоколад, народжений з бобів какао <br />Шоколад, яким він повинен бути
      </PageTitle>
      {mappedCategories.map(
        ({ id, title, chocolates, categoryName }, index) => (
          <PricesSlider
            key={index}
            categoryId={id}
            router={router}
            list={chocolates}
            categoryTitle={title}
            categoryName={categoryName}
            mt={R.equals(index, 0) ? Theme.styles.spacing.paddingY : 50}
          />
        )
      )}
    </Section>
  );
};

const ShopPage = ({ router, firebaseData }) => {
  const chocolateList = R.pathOr({}, ['data', 'chocolates'], firebaseData);
  const categories = R.pathOr({}, ['data', 'shop', 'categories'], firebaseData);

  return (
    <Layout
      title="Shop"
      router={router}
      firebaseData={firebaseData}
      collections={['shop', 'chocolates']}
    >
      <Content
        router={router}
        categories={categories}
        chocolateList={chocolateList}
      />
    </Layout>
  );
};

export default ShopPage;
