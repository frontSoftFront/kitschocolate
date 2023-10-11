import * as R from 'ramda';
import Link from 'next/link';
import { useState, useCallback } from 'react';
// lib
import { basketActions } from '../../lib/redux';
// components
import { BasketModal } from '../basket';
// helpers
import * as H from '../../helpers';
// hooks
import { useActions } from '../../hooks/use-actions';
import { useBasketActions } from '../../hooks/use-basket-actions';
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

const OpenBasket = ({ router, handleAddItemToBasket }) => {
  const {
    basketList,
    basketOpened,
    handleOpenBasket,
    handleCloseBasket
  } = useBasketActions();

  const renderBasketIcon = useCallback(
    () => (
      <Button
        width={250}
        height={40}
        fontWeight={500}
        border="1px solid"
        textTransform="uppercase"
        color={Theme.colors.congoBrown}
        background={Theme.colors.white}
        borderColor={Theme.colors.congoBrown}
        onClick={() => {
          handleOpenBasket();
          handleAddItemToBasket();
        }}
      >
        купити
      </Button>
    ),
    [handleOpenBasket]
  );

  return (
    <BasketModal
      router={router}
      basketList={basketList}
      basketOpened={basketOpened}
      renderComponent={renderBasketIcon}
      handleOpenBasket={handleOpenBasket}
      handleCloseBasket={handleCloseBasket}
    />
  );
};

const Ingredient = props => {
  const {
    id,
    type,
    title,
    router,
    quantity,
    unit = 'gr.',
    recipeQuantity,
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
            height={40}
            fontWeight={500}
            textTransform="uppercase"
            color={Theme.colors.white}
            background={Theme.colors.congoBrown}
            onClick={() => handleAddItemToBasket(props)}
          >
            додати в корзину
          </Button>
          <OpenBasket
            router={router}
            handleAddItemToBasket={() => handleAddItemToBasket(props)}
          />
        </Flex>
      )}
    </Box>
  );
};

const RecipeIngredients = props => {
  const { router, direction, ingredients, recipeQuantity } = props;

  const addItemToBasket = useActions(basketActions.addItemToBasket);

  const handleAddItemToBasket = ({ id, title, price, imgUrl }) => {
    H.showToastifyMessage('success');

    addItemToBasket({ id, title, price, imgUrl, quantity: 1 });
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
            router={router}
            recipeQuantity={recipeQuantity}
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
