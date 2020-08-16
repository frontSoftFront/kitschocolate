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
import { Section, SectionTitle } from '../ui';
// ////////////////////////////////////////////////

const makeSortedByOrderArrayFromObject = R.compose(
  R.sortBy(R.prop('order')),
  R.values
);

const ShopPage = () => {
  useFirebaseConnect(['shop', 'chocolates']);
  const categories = useSelector(state =>
    R.path(['firebase', 'data', 'shop', 'categories'], state)
  );
  const chocolateList = useSelector(state =>
    R.path(['firebase', 'data', 'chocolates'], state)
  );
  const loading = R.and(R.isNil(categories), R.isNil(chocolateList));
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
      <Section py={75}>
        <SectionTitle
          fontSize={45}
          textAlign="center"
          color={Theme.colors.congoBrown}
        >
          Правдивий шоколад від какаобоба до плитки 
        </SectionTitle>
        {mappedCategories.map(({ order, title, chocolates }) => (
          <PricesSlider mt={75} key={order} title={title} list={chocolates} />
        ))}
      </Section>
    </Layout>
  );
};

export default ShopPage;
