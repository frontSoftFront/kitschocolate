import is from 'is_js';
import * as R from 'ramda';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import { useRef, useId, useState, useEffect, useCallback } from 'react';
// lib
import { basketActions, makeSelectBasket } from '../../lib/redux';
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

const PricesSlider = props => {
  const {
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
  } = props;

  // TODO: remove after testing
  // const [visible, setVisible] = useState(true);

  // useEffect(() => {
  //   setVisible(false);
  //   setVisible(true);
  // }, [router]);

  const { push } = router;

  const itemId = useId();

  const slider = useRef(null);

  const { basketList } = useSelector(makeSelectBasket);

  const sliderSettings = R.assoc(
    'infinite',
    R.gt(R.length(4, list)),
    priceSettings
  );

  const [addItemToBasket, removeItemFromBasket] = useActions([
    basketActions.addItemToBasket,
    basketActions.removeItemFromBasket
  ]);

  const handleAddItemToBasket = useCallback(
    ({ id, title, price, imgUrl }) => {
      showToastifyMessage('success');
      addItemToBasket({ id, title, price, imgUrl, quantity: 1 });
    },
    [addItemToBasket]
  );

  const swiped = R.path(
    ['current', 'innerSlider', 'state', 'animating'],
    slider
  );

  const handleGoToDetailPage = useCallback(
    id => {
      if (swiped) return;

      push(`/shop/${id}`);
    },
    [swiped]
  );

  // const containerHeight = R.path(
  //   ['current', 'innerSlider', 'list', 'clientHeight'],
  //   slider
  // );

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
      {/* TODO: remove after testing */}
      {/* {visible ? (
        <Slider ref={slider} {...sliderSettings}>
          {list.map((item, index) => {
            if (R.isNil(item.id)) return <div key={index} />;

            return (
              <ItemComponent
                item={item}
                basketList={basketList}
                key={`${itemId}.${index}`}
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
      ) : null} */}
      <Slider ref={slider} {...sliderSettings}>
        {list.map((item, index) => {
          if (R.isNil(item.id)) return <div key={index} />;

          return (
            <ItemComponent
              item={item}
              basketList={basketList}
              // height={containerHeight}
              key={`${itemId}.${index}`}
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
