import * as R from 'ramda';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded, useFirebaseConnect } from 'react-redux-firebase';
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
        py={50}
        borderBottom="2px solid"
        borderColor={Theme.colors.quincy}
      >
        <PageTitle {...Theme.styles.pageTitle}>Магазин / {title}</PageTitle>
        <Flex my={20} ml="auto" width="100" justifyContent="flex-end">
          <Icon w={40} h={40} iconName="arrow" handleClick={handlePrev} />
          <Icon
            w={40}
            h={40}
            ml={20}
            iconName="styledArrow"
            handleClick={handleNext}
          />
        </Flex>
        <AnimatedBox
          animationName={animationName}
          animationProps="0.6s cubic-bezier(.77,0.000,.175,1.000) both"
        >
          <Flex justifyContent="space-between">
            <OrderImage extraImages={orderItem.extraImages} />
            <OrderItem category orderItem={orderItem} />
          </Flex>
        </AnimatedBox>
      </Section>
      <CustomerReviews />
    </>
  );
};

const CategoryPage = ({ router }) => {
  // TODO: check how order of collections affects data on useFirebaseConnect
  const {
    query: { id }
  } = router;
  useFirebaseConnect(['chocolates', `shop/categories/${id}`]);
  const data = useSelector(state => R.path(['firebase', 'data'], state));
  const title = R.path(['shop', 'categories', id, 'title'], data);

  return (
    <Layout title={title} router={router} loading={R.not(isLoaded(data.shop))}>
      <Content data={data} title={title} categoryName={id} />
    </Layout>
  );
};

export default CategoryPage;
