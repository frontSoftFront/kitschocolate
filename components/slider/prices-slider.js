import is from 'is_js';
import * as R from 'ramda';
import Slider from 'react-slick';
import React, { useRef } from 'react';
// actions
import actions from '../../store/actions';
// components
import Icon from '../../icons';
import ItemComponent from '../item';
// helpers
import { showToastifyMessage } from '../../helpers';
// hooks
import { useActions } from '../../hooks/use-actions';
// theme
import Theme from '../../theme';
// ui
import { Box, Text, Flex } from '../../ui';
// slider
import { priceSettings } from './settings';
// ////////////////////////////////////////////////

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
  const sliderSettings = R.assoc(
    'infinite',
    R.gt(R.length(4, list)),
    priceSettings
  );
  const addItemToBasket = useActions(actions.addItemToBasket);
  const handleAddItemToBasket = ({ id, title, price, imgUrl }) => {
    showToastifyMessage('success');
    addItemToBasket({ id, title, price, imgUrl, quantity: 1 });
  };
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
      <Slider ref={slider} {...sliderSettings}>
        {list.map((item, index) => {
          if (R.isNil(item.id)) return <div />;

          return (
            <ItemComponent
              key={index}
              item={item}
              hideActionButton={hideActionButton}
              handleGoToDetailPage={handleGoToDetailPage}
              handleAddItemToBasket={handleAddItemToBasket}
            />
          );
        })}
      </Slider>
    </Box>
  );
};

export default PricesSlider;
