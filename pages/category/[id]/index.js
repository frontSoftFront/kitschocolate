import * as R from 'ramda';
import { useState } from 'react';
// components
import Layout from '../../../components/layout';
import OrderItem from '../../../components/order-item';
import OrderImage from '../../../components/order-image';
import CustomerReviews from '../../../components/customer-reviews';
// icons
import Icon from '../../../icons';
// theme
import Theme from '../../../theme';
// ui
import { Flex, Section, PageTitle, AnimatedBox } from '../../../ui';
// ////////////////////////////////////////////////

const Content = ({ data, title, categoryName }) => {
  const { shop, chocolates } = data;
  const categoryChocolatesPath = ['categories', categoryName, 'chocolates'];
  const category = R.compose(
    R.map(id => R.path([id], chocolates)),
    R.sortBy(R.prop('order')),
    R.values,
    R.path(categoryChocolatesPath)
  )(shop);
  const [index, setIndex] = useState(0);
  const [animationName, setAnimationName] = useState('default');
  const orderItem = R.path([index], category);
  const categoryChocolatesListLength = R.compose(
    R.length,
    R.values,
    R.path(categoryChocolatesPath)
  )(shop);
  const handleNext = event => {
    event.preventDefault();
    let nextIndex = R.inc(index);
    if (R.equals(nextIndex, categoryChocolatesListLength)) {
      nextIndex = 0;
    }
    setAnimationName('fade-out');
    setTimeout(() => {
      setAnimationName('fade-in');
      setIndex(nextIndex);
    }, 600);
  };
  const handlePrev = event => {
    event.preventDefault();
    let prevIndex = R.dec(index);
    if (R.equals(index, 0)) {
      prevIndex = R.dec(categoryChocolatesListLength);
    }
    setAnimationName('fade-out');
    setTimeout(() => {
      setAnimationName('fade-in');
      setIndex(prevIndex);
    }, 600);
  };

  return (
    <>
      <Section
        // borderBottom="2px solid"
        // borderColor={Theme.colors.quincy}
        py={Theme.styles.spacing.paddingY}
      >
        <PageTitle {...Theme.styles.pageTitle}>Магазин / {title}</PageTitle>
        <Flex my={20} ml="auto" width="100%" justifyContent="flex-end">
          <Icon
            w="100%"
            h="100%"
            iconName="arrow"
            width={[30, 35, 40]}
            height={[30, 35, 40]}
            handleClick={handlePrev}
          />
          <Icon
            ml={20}
            w="100%"
            h="100%"
            width={[30, 35, 40]}
            height={[30, 35, 40]}
            iconName="styledArrow"
            handleClick={handleNext}
          />
        </Flex>
        <AnimatedBox
          animationName={animationName}
          animationProps="0.6s cubic-bezier(.77,0.000,.175,1.000) both"
        >
          <Flex flexWrap="wrap" justifyContent="space-around">
            <OrderImage extraImages={orderItem.extraImages} />
            <OrderItem category orderItem={orderItem} />
          </Flex>
        </AnimatedBox>
      </Section>
      {/* <CustomerReviews /> */}
    </>
  );
};

const makePageTitle = ({ router, firebaseData }) => {
  const {
    query: { id }
  } = router;

  const category = R.path(
    ['data', 'shop', 'categories', id, 'title'],
    firebaseData
  );

  return R.isNil(category) ? 'Магазин' : `Магазин / ${category}`;
};

const CategoryPage = () => (
  <Layout title={makePageTitle} collections={['shop', 'chocolates']}>
    {({ router, firebaseData }) => {
      const {
        query: { id }
      } = router;

      const data = R.path(['data'], firebaseData);
      const category = R.path(['shop', 'categories', id, 'title'], data);

      return <Content data={data} title={category} categoryName={id} />;
    }}
  </Layout>
);

export default CategoryPage;
