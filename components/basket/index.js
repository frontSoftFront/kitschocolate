import React from 'react';
import { useSelector } from 'react-redux';
// theme
import Theme from '../../theme';
// ui
import { Img, Box, Flex, Text, Section, SectionTitle } from '../../ui';
// //////////////////////////////////////////////////

const BasketSimple = ({ basketList }) => {
  return <div>simple basketList</div>;
};

const Basket = ({ basketList }) => {
  return <div>Basket</div>;
};

const BasketComponent = props => {
  const { opened, basketList } = useSelector(state => state.basket);

  if (simple) {
    return <BasketSimple basketList={basketList} />;
  }

  return <Basket basketList={} />;
};

export default BasketComponent;
