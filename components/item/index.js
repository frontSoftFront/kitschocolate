import * as R from 'ramda';
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
  handleEditItem,
  handleRemoveItem,
  handleGoToDetailPage,
  handleAddItemToBasket,
  itemType = 'chocolate',
  hideActionButton = false,
  handleRemoveItemFromBasket,
  height = [410, 410, 470, 520]
}) => {
  const { id, price, title, imgUrl, cookingTime } = item;

  return (
    <Flex
      height={height}
      px={R.or(px, 20)}
      flexDirection="column"
      justifyContent="space-between"
    >
      <div>
        <ImageComponent
          fill
          src={imgUrl}
          placeholder="blur"
          onClick={() => handleGoToDetailPage(id)}
          wrapperStyles={{
            mx: 'auto',
            cursor: 'pointer',
            width: ['80%', '100%'],
            height: [250, 250, 300, 350]
          }}
        />
        <Text
          mt={20}
          cursor="pointer"
          fontWeight={600}
          textAlign="center"
          fontSize={[16, 16, 18]}
          color={Theme.colors.congoBrown}
          hoveredColor={Theme.colors.blue}
          onClick={() => handleGoToDetailPage(id)}
        >
          {title}
        </Text>
      </div>
      <Box mx="auto" width="90%">
        {R.and(R.equals(itemType, 'chocolate'), R.not(hideActionButton)) && (
          <>
            <Text
              mt={10}
              p="5px"
              mx="auto"
              fontWeight="bold"
              width="max-content"
              fontSize={[16, 16, 18]}
              color={Theme.colors.congoBrown}
            >
              {price} грн
            </Text>
            {R.isNil(quantity) && (
              <Button
                {...Theme.styles.actionButton}
                height={40}
                width="100%"
                m="20px auto 0 auto"
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
                  ml={10}
                  p={10}
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
        {R.equals(itemType, 'configurable') && (
          <>
            <Text
              mt={10}
              p="5px"
              mx="auto"
              fontWeight="bold"
              width="max-content"
              fontSize={[16, 16, 18]}
              color={Theme.colors.congoBrown}
            >
              {price} грн
            </Text>
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
