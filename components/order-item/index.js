import * as R from 'ramda';
import styled from 'styled-components';
import React, { useState } from 'react';
// theme
import Theme from '../../theme';
// ui
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Article,
  Section,
  ArticleTitle
} from '../../ui';
// //////////////////////////////////////////////////

const OrderItem = ({ orderItem }) => {
  const { title, weight, prices, description } = orderItem;
  const [quantity, setQuantity] = useState(1);
  const [activeSize, setActiveSize] = useState('small');
  const initialPrice = R.path([activeSize], prices);
  const [totalPrice, setTotalPrice] = useState(initialPrice);
  const activeWeight = R.prop(activeSize, weight);
  const handleChangeQuantity = value => {
    if (R.or(R.gt(value, 100), R.lt(value, 0))) return;
    setQuantity(value);
    setTotalPrice(R.multiply(initialPrice, value));
  };
  const getActiveSizeBtnColor = btn =>
    R.equals(btn, activeSize)
      ? Theme.colors.mediumWood
      : Theme.colors.transparentBlue;

  return (
    <Section width="45%" my="auto">
      <Article>
        <ArticleTitle fontSize={25} fontWeight={500}>
          {title}
        </ArticleTitle>
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
        alignItems="center"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor={Theme.colors.transparentBlue}
      >
        <Text fontSize={30} width={110}>
          ₴ {totalPrice}
        </Text>
        <Flex ml={20}>
          <Input
            pl={10}
            width={40}
            height={60}
            type="number"
            fontWeight={500}
            value={quantity}
            border="1px solid"
            borderColor={Theme.colors.lightBlue}
            onChange={event => handleChangeQuantity(event.currentTarget.value)}
          />
          <Box width={30} height={60} background={Theme.colors.quincy}>
            <Flex
              height="50%"
              cursor="pointer"
              alignItems="center"
              justifyContent="center"
              onClick={() => handleChangeQuantity(R.inc(quantity))}
            >
              <Box
                width="0px"
                height="0px"
                borderBottom="5px solid white"
                borderLeft="5px solid transparent"
                borderRight="5px solid transparent"
              />
            </Flex>
            <Flex
              height="50%"
              cursor="pointer"
              alignItems="center"
              justifyContent="center"
              onClick={() => handleChangeQuantity(R.dec(quantity))}
            >
              <Box
                width="0px"
                height="0px"
                borderTop="5px solid white"
                borderLeft="5px solid transparent"
                borderRight="5px solid transparent"
              />
            </Flex>
          </Box>
        </Flex>
      </Flex>
      <Button
        mt={20}
        width={170}
        height={50}
        fontSize={14}
        fontWeight={500}
        textTransform="uppercase"
        color={Theme.colors.white}
        background={Theme.colors.mediumWood}
      >
        Add to cart
      </Button>
    </Section>
  );
};

export default OrderItem;
