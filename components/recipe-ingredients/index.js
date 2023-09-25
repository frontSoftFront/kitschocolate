import * as R from 'ramda';
import Link from 'next/link';
import { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
// lib
import { basketActions } from '../../lib/redux';
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
  Box,
  Flex,
  Text,
  Button,
  Article,
  Section,
  StyledLink,
  ArticleTitle
} from '../../ui';
// //////////////////////////////////////////////////

const Ingredient = props => {
  const {
    id,
    type,
    title,
    quantity,
    unit = 'gr.',
    recipeQuantity,
    handleGoToOrder,
    handleAddItemToBasket
  } = props;

  const [opened, setOpened] = useState(false);

  let href = null;
  const ingredientTypeChocolate = R.equals(type, 'chocolate');

  if (R.equals(type, 'recipe')) href = `/recipes/${id}`;

  if (ingredientTypeChocolate) href = `/shop/${id}`;

  const makeIngredientText = R.includes(type, ['recipe', 'chocolate'])
    ? `${R.multiply(quantity, recipeQuantity)} ${unit}.`
    : `${R.multiply(quantity, recipeQuantity)} ${unit}. ${title}`;

  return (
    <Box
      overflowY="hidden"
      maxHeight={opened ? 200 : 51}
      transition="all 0.5s ease-out"
    >
      <Flex
        py={15}
        fontSize={16}
        alignItems="center"
        borderBottom="1px solid"
        color={Theme.colors.woodyBrown}
        borderColor={Theme.colors.lightBlue}
      >
        {makeIngredientText}
        {H.isNotNilAndNotEmpty(href) && (
          <Link href={href} target="_blank" passHref>
            <StyledLink
              ml="5px"
              fontSize={16}
              textDecoration="underline"
              color={Theme.colors.woodyBrown}
              hoveredColor={Theme.colors.blue}
            >
              {title}
            </StyledLink>
          </Link>
        )}
        {ingredientTypeChocolate && (
          <Icon
            ml="auto"
            handleClick={() => setOpened(R.not)}
            iconName={opened ? 'arrowUp' : 'arrowDown'}
          />
        )}
      </Flex>
      {ingredientTypeChocolate && (
        <Flex py={20}>
          <Button
            mr={50}
            width={250}
            height={60}
            fontWeight={500}
            textTransform="uppercase"
            color={Theme.colors.white}
            background={Theme.colors.congoBrown}
            onClick={() => handleAddItemToBasket(props)}
          >
            додати в корзину
          </Button>
          <Button
            width={250}
            height={60}
            fontWeight={500}
            border="1px solid"
            textTransform="uppercase"
            color={Theme.colors.congoBrown}
            background={Theme.colors.white}
            borderColor={Theme.colors.congoBrown}
            onClick={() => handleGoToOrder(props)}
          >
            купити
          </Button>
        </Flex>
      )}
    </Box>
  );
};

const RecipeIngredients = props => {
  const { router, direction, ingredients, recipeQuantity } = props;

  const firebase = useFirebase();
  const addItemToBasket = useActions(basketActions.addItemToBasket);
  const handleAddItemToBasket = ({ id, title, price, imgUrl }) => {
    H.showToastifyMessage('success');
    addItemToBasket({ id, title, price, imgUrl, quantity: 1 });
  };
  const handleGoToOrder = async ({ id, title, price, imgUrl }) => {
    const newDatabaseRouteRef = firebase
      .database()
      .ref()
      .child('orders')
      .push();
    const orderId = newDatabaseRouteRef.key;
    const order = {
      [id]: { id, title, price, imgUrl, quantity: 1 }
    };
    await newDatabaseRouteRef
      .set(order)
      .then(() => router.push(`/checkout/${orderId}`));
  };

  return (
    <Section
      display="flex"
      flexWrap="wrap"
      justifyContent={['center', 'center', 'space-between']}
    >
      <Article
        width={['100%', '100%%', '45%']}
        mt={Theme.styles.spacing.paddingY}
      >
        <ArticleTitle
          fontWeight={500}
          fontSize={[18, 20, 25]}
          textAlign={['center', 'center', 'left']}
        >
          Ingredients
        </ArticleTitle>
        {ingredients.map((item, index) => (
          <Ingredient
            {...item}
            key={index}
            recipeQuantity={recipeQuantity}
            handleGoToOrder={handleGoToOrder}
            handleAddItemToBasket={handleAddItemToBasket}
          />
        ))}
      </Article>
      <Article
        color={Theme.colors.woodyBrown}
        width={['100%', '100%%', '45%']}
        mt={Theme.styles.spacing.paddingY}
      >
        <ArticleTitle
          fontWeight={500}
          fontSize={[18, 20, 25]}
          textAlign={['center', 'center', 'left']}
        >
          Direction
        </ArticleTitle>
        {direction.map((item, index) => (
          <Text mt={10} key={index} wordBreak="break-all">
            {R.inc(index)} {item}
          </Text>
        ))}
      </Article>
    </Section>
  );
};

export default RecipeIngredients;
