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
  const quantity = R.propOr('gr', 'quantity', weight);

  return (
    <Section>
      <Article>
        <ArticleTitle>{title}</ArticleTitle>
        <Text>{description}</Text>
      </Article>
      <Box>
        <Flex>
          <Text>Size: {activeSize}</Text>
          <Text>
            Weight: {activeWeight} {quantity}
          </Text>
        </Flex>
        <Flex>
          <Button onClick={() => setActiveSize('small')}>MINI</Button>
          <Button onClick={() => setActiveSize('medium')}>STANDART</Button>
        </Flex>
      </Box>
      <Flex
        py={20}
        borderTop="3px solid"
        borderBottom="3px solid"
        borderColor={Theme.colors.transparentBlue}
      >
        <Text>$ {totalPrice}</Text>
      </Flex>
      <Button onClick={() => console.log('say hi')}>Add to cart</Button>
    </Section>
  );
};

export default OrderItem;
