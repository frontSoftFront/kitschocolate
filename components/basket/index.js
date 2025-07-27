import is from 'is_js';
import * as R from 'ramda';
import Link from 'next/link';
import { useFirebase } from 'react-redux-firebase';
import { useState, useEffect, useCallback } from 'react';
// lib
import { basketActions } from '../../lib/redux';
// components
import Portal from '../portal';
// helpers
import * as H from '../../helpers';
// hooks
import { useActions } from '../../hooks/use-actions';
// icons
import Icon from '../../icons';
// theme
import Theme from '../../theme';
// ui
import {
  Img,
  Box,
  Flex,
  Text,
  Input,
  Button,
  StyledLink,
  ModalWrapper
} from '../../ui';
// //////////////////////////////////////////////////

const BasketItem = ({
  id,
  title,
  price,
  imgUrl,
  subtotal,
  quantity,
  handleRemoveItem,
  handleCloseBasket,
  handleChangeQuantity
}) => (
  <Flex
    py={[15, 20]}
    borderBottom="1px solid"
    justifyContent="space-between"
    flexDirection={['column', 'row']}
    borderColor={Theme.colors.transparentBlue}
  >
    <Flex>
      <Img height={[60, 100]} src={imgUrl} />
      <Box ml={[15, 30]} height="max-content">
        <Link href={`/shop/${id}`}>
          <StyledLink
            fontWeight="bold"
            fontSize={[14, 17]}
            color={Theme.colors.blue}
            onClick={handleCloseBasket}
            hoveredColor={Theme.colors.congoBrown}
          >
            {title}
          </StyledLink>
        </Link>
        <Flex mt={10} height={[40, 50]} alignItems="center">
          <Text fontSize={[18, 25]} fontWeight={500}>
            ₴ {price}
          </Text>
        </Flex>
      </Box>
    </Flex>
    <Box>
      <Icon
        mb={10}
        ml="auto"
        iconName="trash"
        width={[17, 20]}
        height={[17, 20]}
        handleClick={() => handleRemoveItem(id)}
      />
      <Flex width="100%" alignItems="center" justifyContent="space-between">
        <Flex mr={[15, 20]}>
          <Input
            pl={10}
            disabled
            type="number"
            width={[30, 40]}
            fontWeight={500}
            height={[40, 50]}
            value={quantity}
            border="1px solid"
            borderColor={Theme.colors.lightBlue}
            onChange={event => {
              handleChangeQuantity({ id, quantity: event.currentTarget.value });
            }}
          />
          <Box
            width={[30, 40]}
            height={[40, 50]}
            background={Theme.colors.quincy}
          >
            <Flex
              height="50%"
              cursor="pointer"
              alignItems="center"
              justifyContent="center"
              onClick={() => {
                handleChangeQuantity({ id, quantity: R.inc(quantity) });
              }}
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
              onClick={() =>
                handleChangeQuantity({ id, quantity: R.dec(quantity) })
              }
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
        <Text
          width={110}
          withEllipsis
          maxWidth={110}
          fontWeight={500}
          textAlign="right"
          fontSize={[18, 25]}
          title={`₴ ${subtotal}`}
        >
          ₴ {subtotal}
        </Text>
      </Flex>
    </Box>
  </Flex>
);

const Basket = ({ router, basketList, handleCloseBasket }) => {
  const firebase = useFirebase();
  const setGlobalBasketList = useActions(basketActions.setBasket);

  const [localBasket, setLocalBasket] = useState(basketList);

  const total = R.compose(
    R.sum,
    R.values,
    R.map(R.prop('subtotal'))
  )(localBasket);

  const handleRemoveItem = id => setLocalBasket(R.dissoc(id, localBasket));

  const handleChangeQuantity = useCallback(
    ({ id, quantity }) => {
      if (R.lt(quantity, 1)) return;

      const item = R.prop(id, localBasket);
      const subtotal = R.multiply(quantity, item.price);
      const newItem = R.merge(item, { quantity, subtotal });
      const newLocalBasket = R.assocPath([id], newItem, localBasket);

      setLocalBasket(newLocalBasket);
    },
    [localBasket]
  );

  const handleGoToOrder = useCallback(async () => {
    const newDatabaseRouteRef = firebase
      .database()
      .ref()
      .child('orders')
      .push();

    const id = newDatabaseRouteRef.key;
    const createdDate = new Date().toLocaleString();
    const data = { createdDate, items: localBasket, status: 'PENDING' };

    await newDatabaseRouteRef.set(data).then(() => {
      router.push(`/checkout/${id}`);

      setLocalBasket({});
      handleCloseBasket();
    });
  }, [localBasket]);

  useEffect(() => {
    setGlobalBasketList(localBasket);

    if (H.isNilOrEmpty(localBasket)) handleCloseBasket();
  }, [localBasket]);

  return (
    <ModalWrapper>
      <Box
        p={[20, 30]}
        width="90vw"
        maxWidth={1000}
        maxHeight="90vh"
        overflowY="auto"
        borderRadius="4px"
        background={Theme.colors.white}
        boxShadow="0 1px 3px rgb(0 0 0 / 30%)"
      >
        <Flex mb={20} alignItems="center" justifyContent="space-between">
          <Text fontSize={[18, 25]}>Корзина</Text>
          <Icon
            width={[18, 25]}
            iconName="close"
            height={[18, 25]}
            handleClick={handleCloseBasket}
          />
        </Flex>
        {R.values(localBasket).map(item => (
          <BasketItem
            {...item}
            key={item.id}
            handleRemoveItem={handleRemoveItem}
            handleCloseBasket={handleCloseBasket}
            handleChangeQuantity={handleChangeQuantity}
          />
        ))}
        <Box
          p={20}
          ml="auto"
          mt={[20, 30]}
          borderRadius="4px"
          border="1px solid"
          width={['100%', '50%']}
          borderColor={Theme.colors.lightBlue}
        >
          <Flex mb={20} alignItems="center" justifyContent="space-between">
            <Text fontSize={[18, 25]} fontWeight="bold">
              Всього:
            </Text>
            <Text fontSize={[22, 30]} fontWeight="bold">
              ₴ {total}
            </Text>
          </Flex>
          <Button
            {...Theme.styles.actionButton}
            mx="auto"
            width="100%"
            type="button"
            height={[40, 50]}
            fontWeight="bold"
            fontSize={[14, 16]}
            onClick={handleGoToOrder}
          >
            Оформити замовлення
          </Button>
        </Box>
      </Box>
    </ModalWrapper>
  );
};

export default Basket;

export const BasketModal = props => {
  const {
    router,
    basketList,
    basketOpened,
    renderComponent,
    handleCloseBasket
  } = props;

  return (
    <>
      {is.function(renderComponent) ? renderComponent() : null}
      {basketOpened ? (
        <Portal selector="#modal">
          <Basket
            router={router}
            basketList={basketList}
            handleCloseBasket={handleCloseBasket}
          />
        </Portal>
      ) : null}
    </>
  );
};
