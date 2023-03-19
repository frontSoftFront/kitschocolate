import * as R from 'ramda';
// components
import ImageComponent from '../image';
// theme
import Theme from '../../theme';
// ui
import { Img, Box, Text, Flex, Button, RelativeBox } from '../../ui';
// ////////////////////////////////////////////////

const ItemComponent = ({
  px,
  item,
  handleEditItem,
  handleRemoveItem,
  handleGoToDetailPage,
  handleAddItemToBasket,
  itemType = 'chocolate',
  hideActionButton = false
}) => {
  const { id, price, title, imgUrl, cookingTime } = item;

  return (
    <Box cursor="pointer" px={R.or(px, 20)}>
      <RelativeBox width="100%" height={350}>
        <ImageComponent
          src={imgUrl}
          layout="fill"
          placeholder="blur"
          onClick={() => handleGoToDetailPage(id)}
        />
      </RelativeBox>
      <Box mx="auto" mt={20} width="90%">
        <Text
          fontWeight={600}
          textAlign="center"
          fontSize={[16, 16, 18]}
          color={Theme.colors.congoBrown}
          hoveredColor={Theme.colors.blue}
          onClick={() => handleGoToDetailPage(id)}
        >
          {title}
        </Text>
        {R.and(R.equals(itemType, 'chocolate'), R.not(hideActionButton)) && (
          <>
            <Text
              mt={10}
              p="5px"
              mx="auto"
              fontWeight="bold"
              width="max-content"
              background="#D2C8D1"
              fontSize={[16, 16, 18]}
              color={Theme.colors.congoBrown}
            >
              {price} грн
            </Text>
            <Button
              {...Theme.styles.actionButton}
              height={40}
              width="100%"
              m="20px auto 0 auto"
              onClick={() => handleAddItemToBasket(item)}
            >
              <Img mr="7px" width={15} height={15} src="./shopping-cart.svg" />
              Add to card
            </Button>
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
              background="#D2C8D1"
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
    </Box>
  );
};

export default ItemComponent;