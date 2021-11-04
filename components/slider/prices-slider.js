import * as R from 'ramda';
import Slider from 'react-slick';
import React, { useRef } from 'react';
// actions
import actions from '../../store/actions';
// components
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

const PricesSlider = ({ mt, list, router, categoryName, categoryTitle }) => {
  const { push } = router;

  const slider = useRef(null);
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
      <Flex px={20} mb={20} alignItems="center" justifyContent="space-between">
        {categoryTitle && (
          <Text
            lineHeight={1.2}
            cursor="pointer"
            fontSize={[18, 20, 25]}
            textDecoration="underline"
            color={Theme.colors.quincy}
            onClick={() => push(`/category/${categoryName}`)}
          >
            {categoryTitle}
          </Text>
        )}
      </Flex>
      <Slider ref={slider} {...priceSettings}>
        {list.map((item, index) => {
          if (R.isNil(item.id)) return <div />;

          return (
            <ItemComponent
              key={index}
              item={item}
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
