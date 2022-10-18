import * as R from 'ramda';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useFirebase } from 'react-redux-firebase';
// actions
import actions from '../../store/actions';
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
    py={20}
    borderBottom="1px solid"
    justifyContent="space-between"
    borderColor={Theme.colors.transparentBlue}
  >
    <Flex>
      <Img height={100} src={imgUrl} />
      <Box ml={30} height="max-content">
        <Link href={`/shop/${id}`}>
          <StyledLink
            fontSize={17}
            fontWeight="bold"
            color={Theme.colors.blue}
            onClick={handleCloseBasket}
            hoveredColor={Theme.colors.congoBrown}
          >
            {title}
          </StyledLink>
        </Link>
        <Flex mt={10} height={50} alignItems="center">
          <Text fontSize={25} fontWeight={500}>
            ₴ {price}
          </Text>
        </Flex>
      </Box>
    </Flex>
    <Box>
      <Icon
        mb={10}
        ml="auto"
        width="20px"
        height="20px"
        iconName="trash"
        handleClick={() => handleRemoveItem(id)}
      />
      <Flex alignItems="center">
        <Flex mr={20}>
          <Input
            pl={10}
            disabled
            width={40}
            height={50}
            type="number"
            fontWeight={500}
            value={quantity}
            border="1px solid"
            borderColor={Theme.colors.lightBlue}
            onChange={event =>
              handleChangeQuantity({
                id,
                quantity: event.currentTarget.value
              })
            }
          />
          <Box width={30} height={50} background={Theme.colors.quincy}>
            <Flex
              height="50%"
              cursor="pointer"
              alignItems="center"
              justifyContent="center"
              onClick={() =>
                handleChangeQuantity({ id, quantity: R.inc(quantity) })
              }
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
          fontSize={25}
          maxWidth={110}
          fontWeight={500}
          textAlign="right"
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
  const setGlobalBasketList = useActions(actions.setBasketList);
  const [localBasket, setLocalBasket] = useState(basketList);
  const total = R.compose(
    R.sum,
    R.values,
    R.map(R.prop('subtotal'))
  )(localBasket);
  const handleRemoveItem = id => setLocalBasket(R.dissoc(id, localBasket));
  const handleChangeQuantity = ({ id, quantity }) => {
    if (R.lt(quantity, 1)) return;

    const item = R.prop(id, localBasket);
    const subtotal = R.multiply(quantity, item.price);
    const newItem = R.merge(item, { quantity, subtotal });
    const newLocalBasket = R.assocPath([id], newItem, localBasket);

    setLocalBasket(newLocalBasket);
  };
  const handleGoToOrder = async () => {
    const newDatabaseRouteRef = firebase
      .database()
      .ref()
      .child('orders')
      .push();
    const id = newDatabaseRouteRef.key;
    const date = new Date().toLocaleDateString();
    const data = { date, items: localBasket, status: 'PENDING' };
    await newDatabaseRouteRef.set(data).then(() => {
      router.push(`/checkout/${id}`);
      setLocalBasket({});
      handleCloseBasket();
    });
  };

  useEffect(() => {
    setGlobalBasketList(localBasket);
    if (H.isNilOrEmpty(localBasket)) handleCloseBasket();
  }, [localBasket]);

  return (
    <ModalWrapper>
      <Box
        p={30}
        width="90vw"
        maxWidth={1000}
        maxHeight="90vh"
        overflowY="auto"
        borderRadius="4px"
        background={Theme.colors.white}
        boxShadow="0 1px 3px rgb(0 0 0 / 30%)"
      >
        <Flex mb={20} alignItems="center" justifyContent="space-between">
          <Text fontSize={25}>Корзина</Text>
          <Icon
            width="25px"
            height="25px"
            iconName="close"
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
          mt={30}
          ml="auto"
          width="50%"
          borderRadius="4px"
          border="1px solid"
          borderColor={Theme.colors.lightBlue}
        >
          <Flex mb={20} alignItems="center" justifyContent="space-between">
            <Text fontSize={25} fontWeight="bold">
              Всього:
            </Text>
            <Text fontSize={30} fontWeight="bold">
              ₴ {total}
            </Text>
          </Flex>
          <Button
            {...Theme.styles.actionButton}
            mx="auto"
            height={50}
            width="100%"
            type="button"
            fontSize={16}
            fontWeight="bold"
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
