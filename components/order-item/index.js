import * as R from 'ramda';
import Link from 'next/link';
import React, { useState } from 'react';
// constants
import * as C from '../../constants';
// icons
import Icon from '../../icons';
// theme
import Theme from '../../theme';
// ui
import {
  Box,
  Flex,
  Text,
  Button,
  Article,
  Section,
  ArticleTitle
} from '../../ui';
// //////////////////////////////////////////////////

const OrderItem = ({ orderItem }) => {
  const { title, weight, prices, description } = orderItem;
  const [activeSize, setActiveSize] = useState('small');
  const [totalPrice, setTotalPrice] = useState(R.path([activeSize], prices));
  const activeWeight = R.prop(activeSize, weight);
  const getActiveSizeBtnColor = btn =>
    R.equals(btn, activeSize) ? Theme.colors.mediumWood : Theme.colors.transparentBlue;

  return (
    <Section width="45%">
      <Article>
        <ArticleTitle fontSize={25}>{title}</ArticleTitle>
        <Text my={20} fontSize={14} opacity="0.54" lineHeight={1.54}>
          {description}
        </Text>
      </Article>
      <Box>
        <Flex>
          <Flex mr={40}>
            <Text color={Theme.colors.lightGrey}>Size:</Text>
            <Text ml="5px" fontWeight={500} color={Theme.colors.quincy}>
              {activeSize}
            </Text>
          </Flex>
          <Flex>
            <Text color={Theme.colors.lightGrey}>Weight:</Text>
            <Text ml="5px" fontWeight={500} color={Theme.colors.quincy}>
              {activeWeight} gr
            </Text>
          </Flex>
        </Flex>
        <Flex my={20}>
          <Button
            mr={20}
            width={90}
            height={20}
            border="1px solid"
            textTransform="uppercase"
            onClick={() => setActiveSize('small')}
            color={getActiveSizeBtnColor('small')}
            borderColor={getActiveSizeBtnColor('small')}
          >
            mini
          </Button>
          <Button
            ml={20}
            width={90}
            height={20}
            border="1px solid"
            textTransform="uppercase"
            color={getActiveSizeBtnColor('medium')}
            onClick={() => setActiveSize('medium')}
            borderColor={getActiveSizeBtnColor('medium')}
          >
            medium
          </Button>
        </Flex>
      </Box>
      <Flex
        py={20}
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor={Theme.colors.transparentBlue}
      >
        <Text fontSize={30}>₴ {totalPrice}</Text>
      </Flex>
      <Button onClick={() => console.log('say hi')}>Add to cart</Button>
    </Section>
  );
};

export default OrderItem;
