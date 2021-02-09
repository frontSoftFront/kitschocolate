import React from 'react';
import * as R from 'ramda';
import { useSelector } from 'react-redux';
// theme
import Theme from '../../theme';
// ui
import { Img, Box, Flex, Text, Section, SectionTitle } from '../../ui';
// //////////////////////////////////////////////////

const BasketSimple = props => {
  const basketList = useSelector(state => state.basket.basketList);
  if (R.isEmpty(basketList)) return null;

  return (
    <Box></Box>
  );
};

export default BasketSimple;
