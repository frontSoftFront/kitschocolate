import is from 'is_js';
import React from 'react';
import * as R from 'ramda';
import { useSelector } from 'react-redux';
import { useFirebaseConnect } from 'react-redux-firebase';
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

const ShopPage = () => {
  // TODO: check how order of collections affects data on useFirebaseConnect
  useFirebaseConnect(['chocolates', 'shop']);
  const categories = useSelector(state =>
    R.path(['firebase', 'data', 'shop', 'categories'], state)
  );
  const chocolateList = useSelector(state =>
    R.path(['firebase', 'data', 'chocolates'], state)
  );
  const loading = is.any.null(categories, chocolateList);
  if (loading) return <div>Loading...</div>;

  const mappedCategories = R.compose(
    R.map(category => {
      const { chocolates } = category;
      const mappedChocolates = R.compose(
        R.map(({ id }) => R.path([id], chocolateList)),
        makeSortedByOrderArrayFromObject
      )(chocolates);
      return R.assoc('chocolates', mappedChocolates, category);
    }),
    makeSortedByOrderArrayFromObject
  )(categories);

  return (
    <Layout title="Shop">
      <Section py={50}>
        <PageTitle
          fontSize={45}
          textAlign="center"
          fontFamily="Caveat"
          color={Theme.colors.congoBrown}
        >
          Правдивий шоколад від какаобоба до плитки
        </PageTitle>
        {mappedCategories.map(({ order, title, chocolates }) => (
          <PricesSlider
            mt={50}
            key={order}
            list={chocolates}
            categoryTitle={title}
          />
        ))}
      </Section>
    </Layout>
  );
};

export default ShopPage;
