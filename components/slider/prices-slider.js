import is from 'is_js';
import * as R from 'ramda';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import React, { useRef, useCallback } from 'react';
// actions
import actions from '../../store/actions';
// components
import Icon from '../../icons';
import ItemComponent from '../item';
// helpers
import { isNotNilAndNotEmpty, showToastifyMessage } from '../../helpers';
// hooks
import { useActions } from '../../hooks/use-actions';
// theme
import Theme from '../../theme';
// ui
import { Box, Text, Flex } from '../../ui';
// slider
import { priceSettings } from './settings';
// ////////////////////////////////////////////////

const makeSelectBasketList = createSelector(
  ({ basket }) => basket,
  ({ basketList }) => basketList
);

const PricesSlider = ({
  mt,
  list,
  router,
  favorite,
  categoryId,
  categoryTitle,
  handleEditItem,
  handleRemoveItem,
  hideActionButton,
  handleMarkAsFavoriteCategory
}) => {
  const { push } = router;

  const slider = useRef(null);
  const basketList = useSelector(makeSelectBasketList);

  const sliderSettings = R.assoc(
    'infinite',
    R.gt(R.length(4, list)),
    priceSettings
  );

  const [addItemToBasket, removeItemFromBasket] = useActions([
    actions.addItemToBasket,
    actions.removeItemFromBasket
  ]);

  const handleAddItemToBasket = useCallback(
    ({ id, title, price, imgUrl }) => {
      showToastifyMessage('success');
      addItemToBasket({ id, title, price, imgUrl, quantity: 1 });
    },
    [addItemToBasket]
  );

  const handleGoToDetailPage = id => {
    const swiped = R.path(
      ['current', 'innerSlider', 'state', 'animating'],
      slider
    );

    if (swiped) return;

    push(`/shop/${id}`);
  };

  return (
    <Box mt={mt}>
      {R.any(isNotNilAndNotEmpty, [
        categoryTitle,
        handleEditItem,
        handleRemoveItem,
        handleMarkAsFavoriteCategory
      ]) && (
        <Flex px={20} mb={20} alignItems="center">
          {categoryTitle && (
            <Text
              lineHeight={1.2}
              cursor="pointer"
              fontSize={[18, 20, 25]}
              textDecoration="underline"
              color={Theme.colors.quincy}
              onClick={() => push(`/category/${categoryId}`)}
            >
              {categoryTitle}
            </Text>
          )}
          {is.function(handleEditItem) && (
            <Icon
              ml={15}
              w={18}
              h={18}
              iconName="pencil"
              handleClick={() => handleEditItem()}
            />
          )}
          {is.function(handleRemoveItem) && (
            <Icon
              ml={15}
              width={18}
              height={18}
              iconName="trash"
              handleClick={handleRemoveItem}
            />
          )}
          {is.function(handleMarkAsFavoriteCategory) && (
            <Icon
              ml={15}
              width={18}
              height={18}
              iconName={favorite ? 'heartFilled' : 'heart'}
              handleClick={() => handleMarkAsFavoriteCategory(categoryId)}
            />
          )}
        </Flex>
      )}
      <Slider ref={slider} {...sliderSettings}>
        {list.map((item, index) => {
          if (R.isNil(item.id)) return <div />;

          return (
            <ItemComponent
              key={index}
              item={item}
              basketList={basketList}
              handleRemoveItem={handleRemoveItem}
              hideActionButton={hideActionButton}
              handleGoToDetailPage={handleGoToDetailPage}
              handleAddItemToBasket={handleAddItemToBasket}
              handleRemoveItemFromBasket={removeItemFromBasket}
              quantity={R.path([item.id, 'quantity'], basketList)}
            />
          );
        })}
      </Slider>
    </Box>
  );
};

export default PricesSlider;
