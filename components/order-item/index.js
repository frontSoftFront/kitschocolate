import * as R from 'ramda';
import { useState, useEffect, useMemo, useCallback } from 'react';
// lib
import { basketActions } from '../../lib/redux';
// helpers
import { setDebounce, showToastifyMessage } from '../../helpers';
// hooks
import { useActions } from '../../hooks/use-actions';
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

export const ChangeQuantity = ({ quantity, handleChangeQuantity }) => {
  const [value, setValue] = useState(quantity);

  const handleChange = newValue => {
    const validValue = R.or(R.isEmpty(newValue), R.lte(newValue, 0))
      ? 0
      : newValue;

    setValue(validValue);
    handleChangeQuantity(validValue);
  };

  return (
    <Flex ml={20}>
      <Input
        pl={10}
        width={40}
        type="number"
        value={value}
        fontWeight={500}
        border="1px solid"
        height={[40, 50, 60]}
        borderColor={Theme.colors.lightBlue}
        onChange={event => handleChange(event.target.value)}
      />
      <Box width={30} height={[40, 50, 60]} background={Theme.colors.quincy}>
        <Flex
          height="50%"
          cursor="pointer"
          alignItems="center"
          justifyContent="center"
          onClick={() => handleChange(R.inc(value))}
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
          onClick={() => handleChange(R.dec(value))}
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
  );
};

const OrderItem = ({ orderItem }) => {
  const { id, imgUrl, price, title, description } = orderItem;

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);

  const handleChangeQuantity = useCallback(
    value => {
      if (R.or(R.gt(value, 100), R.lt(value, 0))) return;

      setQuantity(value);
      setTotalPrice(R.multiply(price, value));
    },
    [price]
  );

  useEffect(() => {
    setQuantity(1);
    setTotalPrice(price);
  }, [orderItem]);

  const addItemToBasket = useActions(basketActions.addItemToBasket);

  const handleAddItemToBasket = useCallback(() => {
    if (R.equals(quantity, 0)) return;

    handleChangeQuantity(1);
    showToastifyMessage('success');
    addItemToBasket({ id, title, price, imgUrl, quantity });
  }, [id, title, price, imgUrl, quantity]);

  return (
    <Section
      my="auto"
      width={['100%', '100%', '45%']}
      mt={Theme.styles.spacing.paddingY}
    >
      <Article>
        <ArticleTitle fontWeight={500} fontSize={[18, 18, 20, 25]}>
          {title}
        </ArticleTitle>
        <Text
          my={[15, 20]}
          opacity="0.54"
          lineHeight={1.54}
          fontSize={[14, 16]}
        >
          {description}
        </Text>
      </Article>
      <Box>
        <Flex>
          <Flex mb={20} fontSize={[12, 14]}>
            <Text color={Theme.colors.lightGrey}>Вага:</Text>
            <Text ml="5px" fontWeight={500} color={Theme.colors.quincy}>
              100 gr
            </Text>
          </Flex>
        </Flex>
      </Box>
      <Flex
        py={[15, 20]}
        alignItems="center"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor={Theme.colors.transparentBlue}
      >
        <Text withEllipsis fontSize={[20, 30]} width={[70, 110]}>
          ₴ {totalPrice}
        </Text>
        <ChangeQuantity
          quantity={quantity}
          handleChangeQuantity={handleChangeQuantity}
        />
      </Flex>
      <Button
        {...Theme.styles.actionButton}
        mt={20}
        height={[40, 50]}
        width={[150, 170]}
        textTransform="uppercase"
        onClick={handleAddItemToBasket}
      >
        В корзину
      </Button>
    </Section>
  );
};

export default OrderItem;
