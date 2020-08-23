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
import { Flex, Section, Text, Article, Button, ArticleTitle } from '../../ui';
// //////////////////////////////////////////////////

const OrderItem = ({ orderItem }) => {
  const { title, weight, prices, description } = orderItem;

  return (
    <Section>
      <Article>
        <ArticleTitle>{title}</ArticleTitle>
        <Text>{description}</Text>
      </Article>
      <Flex></Flex>
      <Flex>
        <Button>MINI</Button>
        <Button>standart</Button>
      </Flex>
    </Section>
  );
};

export default OrderItem;
