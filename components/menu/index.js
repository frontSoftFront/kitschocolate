import * as R from 'ramda';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFirebaseConnect } from 'react-redux-firebase';
// components
import Portal from '../portal';
import Basket from '../basket';
// constants
import * as C from '../../constants';
// helpers
import * as H from '../../helpers';
// hooks
import { useWindowSize } from '../../hooks/use-window-size';
// icons
import Icon from '../../icons';
// theme
import Theme from '../../theme';
// ui
import { Box, Text, Flex, StyledLink, AnimatedBox } from '../../ui';
// menu
import { MenuWrapper } from './ui';
// //////////////////////////////////////////////////

const Categories = ({ categories, handleClick, categoryTitle }) => (
  <>
    <Text
      py={10}
      fontSize={16}
      textTransform="uppercase"
      color={Theme.colors.lightSlateGrey}
    >
      {categoryTitle}
    </Text>
    {categories.map(({ id, title, categoryName }, index) => (
      <Flex key={index} alignItems="center" justifyContent="space-between">
        <Text
          py={10}
          fontSize={14}
          fontWeight={600}
          color={Theme.colors.quincy}
          onClick={() => handleClick({ id, categoryName })}
        >
          {title}
        </Text>
        <Icon iconName="arrowRight" />
      </Flex>
    ))}
  </>
);

const Navigation = ({
  handleToggleMenu,
  navTitle = 'Навігація',
  navItems = C.NAV_ITEMS
}) => (
  <nav>
    <Text
      py={10}
      fontSize={16}
      textTransform="uppercase"
      color={Theme.colors.lightSlateGrey}
    >
      {navTitle}
    </Text>
    {navItems.map(({ id, link, title }, index) => {
      const href = H.isNotNilAndNotEmpty(id)
        ? { query: { id }, pathname: '/shop/[id]' }
        : link;

      return (
        <Link
          passHref
          key={index}
          href={href}
          onClick={() => H.isNotNilAndNotEmpty(id) && handleToggleMenu()}
        >
          <StyledLink
            py={10}
            fontSize={14}
            display="flex"
            fontWeight={600}
            alignItems="center"
            color={Theme.colors.quincy}
            justifyContent="space-between"
            onClick={() => H.isNotNilAndNotEmpty(id) && handleToggleMenu()}
          >
            {title}
            <Icon iconName="arrowRight" />
          </StyledLink>
        </Link>
      );
    })}
  </nav>
);

const SubCategory = props => {
  const {
    router,
    navItems,
    navTitle,
    setActiveCategory,
    handleToggleMenu
  } = props;

  return (
    <>
      <Flex alignItems="center">
        <Icon iconName="arrowLeft" />
        <Text
          py={10}
          ml={10}
          fontSize={14}
          fontWeight={600}
          color={Theme.colors.quincy}
          onClick={() => setActiveCategory(null)}
        >
          Назад
        </Text>
      </Flex>
      <Navigation
        router={router}
        navItems={navItems}
        navTitle={navTitle}
        handleToggleMenu={handleToggleMenu}
      />
    </>
  );
};

const Menu = props => {
  const { data, animationName, handleToggleMenu } = props;

  const [activeCategory, setActiveCategory] = useState(null);
  const categories = R.pathOr({}, ['shop', 'categories'], data);
  const categoriesArr = R.compose(
    R.sortBy(R.prop('order')),
    R.values
  )(categories);
  const activeCategoryChocolates = R.pick(
    R.pathOr([], [activeCategory, 'chocolates'], categories),
    R.pathOr({}, ['chocolates'], data)
  );

  const handleSetActiveCategory = ({ categoryName }) =>
    setActiveCategory(categoryName);

  return (
    <MenuWrapper>
      <AnimatedBox
        p={15}
        top={84}
        left={0}
        width="80vw"
        position="fixed"
        height="calc(100vh - 84px)"
        animationName={animationName}
        background={Theme.colors.white}
        boxShadow="0 0 13px 0 rgb(0 0 0 / 20%)"
        animationProps="0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"
      >
        {R.isNil(activeCategory) && (
          <>
            <Categories
              categories={categoriesArr}
              categoryTitle="Каталог товарів"
              handleClick={handleSetActiveCategory}
            />
            <Navigation />
          </>
        )}
        {H.isNotNilAndNotEmpty(activeCategory) && (
          <SubCategory
            handleToggleMenu={handleToggleMenu}
            setActiveCategory={setActiveCategory}
            navItems={R.values(activeCategoryChocolates)}
            navTitle={R.path([activeCategory, 'title'], categories)}
          />
        )}
      </AnimatedBox>
    </MenuWrapper>
  );
};

export default Menu;
