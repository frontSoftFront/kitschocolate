import is from 'is_js';
import * as R from 'ramda';
import { useState } from 'react';
import { css } from 'styled-components';
// components
import ImageComponent from '../image';
// theme
import Theme from '../../theme';
// ui
import { Img, Box, Text, Flex, Button } from '../../ui';
// ////////////////////////////////////////////////

const ItemComponent = ({
  px,
  item,
  quantity,
  renderActions,
  handleEditItem,
  handleRemoveItem,
  handleGoToDetailPage,
  handleAddItemToBasket,
  itemType = 'chocolate',
  hideActionButton = false,
  handleRemoveItemFromBasket,
  height = [410, 410, 470, 520]
}) => {
  const { id, price, title, imgUrl, cookingTime, extraImages = [] } = item;

  const [activeImage, setActiveImage] = useState(imgUrl);

  const handleMouseOver = () =>
    R.last(extraImages)
      ? setActiveImage(R.last(extraImages))
      : setActiveImage(imgUrl);

  return (
    <Flex
      pb="5px"
      height={height}
      px={R.or(px, 20)}
      flexDirection="column"
      justifyContent="space-between"
    >
      <div>
        <ImageComponent
          fill
          src={activeImage}
          placeholder="blur"
          onFocus={handleMouseOver}
          onMouseOver={handleMouseOver}
          onClick={() => handleGoToDetailPage(id)}
          onMouseLeave={() => setActiveImage(imgUrl)}
          wrapperStyles={{
            mx: 'auto',
            cursor: 'pointer',
            width: ['80%', '100%'],
            height: [250, 250, 300, 350]
          }}
        />
        <Text
          mt={20}
          title={title}
          cursor="pointer"
          fontWeight={600}
          overflow="hidden"
          textAlign="center"
          display="-webkit-box"
          fontSize={[16, 16, 18]}
          color={Theme.colors.congoBrown}
          hoveredColor={Theme.colors.blue}
          onClick={() => handleGoToDetailPage(id)}
          css={css`
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          `}
        >
          {title}
        </Text>
      </div>
      <Box mx="auto" width="90%">
        {R.and(R.equals(itemType, 'chocolate'), R.not(hideActionButton)) && (
          <>
            {price ? (
              <Text
                p="5px"
                mt={10}
                mx="auto"
                fontWeight="bold"
                width="max-content"
                fontSize={[16, 16, 18]}
                color={Theme.colors.congoBrown}
              >
                {price} грн
              </Text>
            ) : null}
            {R.isNil(quantity) && (
              <Button
                {...Theme.styles.actionButton}
                height={40}
                width="100%"
                m="20px auto 0 auto"
                hoverTransform="scale(1.1)"
                onClick={() => handleAddItemToBasket(item)}
              >
                <Img
                  mr="7px"
                  width={15}
                  height={15}
                  src="./shopping-cart.svg"
                />
                В корзину
              </Button>
            )}
            {quantity && (
              <Flex
                {...Theme.styles.actionButton}
                height={40}
                width="100%"
                alignItems="center"
                m="20px auto 0 auto"
                justifyContent="space-between"
              >
                <Button
                  p={10}
                  ml={10}
                  color="white"
                  fontSize={16}
                  onClick={() => handleRemoveItemFromBasket(item)}
                >
                  -
                </Button>
                <Box>{quantity} шт.</Box>
                <Button
                  p={10}
                  mr={10}
                  color="white"
                  fontSize={16}
                  onClick={() => handleAddItemToBasket(item)}
                >
                  +
                </Button>
              </Flex>
            )}
          </>
        )}
        {R.equals(itemType, 'recipe') && (
          <Flex
            p="6px"
            mt={10}
            mx="auto"
            color="white"
            borderRadius="2px"
            width="max-content"
            alignItems="center"
            background={Theme.colors.mediumWood}
          >
            <Img mr="5px" width={15} height={15} src="./clock.svg" />
            {cookingTime} хв
          </Flex>
        )}
        {is.function(renderActions) ? renderActions(item) : null}
        {R.equals(itemType, 'configurable') && (
          <>
            <Flex mt={20} justifyContent="space-between">
              <Button
                {...Theme.styles.actionButton}
                height={40}
                width="45%"
                onClick={() => handleEditItem(item)}
              >
                Edit
              </Button>
              <Button
                {...Theme.styles.actionButton}
                height={40}
                width="45%"
                onClick={() => handleRemoveItem(item)}
              >
                Remove
              </Button>
            </Flex>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default ItemComponent;
