import * as R from 'ramda';
// components
import Icon from '../../icons';
// theme
import Theme from '../../theme';
// ui
import { Img, Box, Text, Flex, Button } from '../../ui';
// ////////////////////////////////////////////////

const ItemComponent = ({
  px,
  item,
  handleGoToDetailPage,
  handleAddItemToBasket,
  itemType = 'chocolate',
  imgSize = { height: '100%', width: '100%' }
}) => {
  const { id, price, title, imgUrl, cookingTime } = item;

  return (
    <Box cursor="pointer" px={R.or(px, 20)}>
      <Img
        src={imgUrl}
        {...imgSize}
        maxHeight={400}
        onClick={() => handleGoToDetailPage(id)}
      />
      <Box mx="auto" mt={40} width="90%">
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
        {R.equals(itemType, 'chocolate') && (
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
      </Box>
    </Box>
  );
};

export default ItemComponent;
