import * as R from 'ramda';
import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// components
import Portal from '../portal';
import Basket from '../basket';
// constants
import * as C from '../../constants';
// helpers
import * as H from '../../helpers';
// icons
import Icon from '../../icons';
// theme
import Theme from '../../theme';
// ui
import { Flex, StyledLink } from '../../ui';
// feature header
import { Nav, NavItem, BasketCount } from './ui';
// //////////////////////////////////////////////////

const navItems = [
  {
    title: 'Home',
    link: C.ROUTE_HOME_PAGE
  },
  {
    title: 'About',
    link: C.ROUTE_ABOUT_PAGE
  },
  {
    title: 'Shop',
    link: C.ROUTE_PATH_SHOP
  },
  {
    title: 'Recipe',
    link: C.ROUTE_RECIPE_PAGE
  },
  {
    title: 'Partnership',
    link: C.ROUTE_PARTNERSHIP_PAGE
  }
];

const BasketIcon = ({ router }) => {
  const [basketOpened, setBasketOpened] = useState(false);
  const handleCloseBasket = () => setBasketOpened(false);
  const basketList = useSelector(state => state.basket.basketList);
  const handleOpenBasket = () => {
    if (H.isNotNilAndNotEmpty(basketList)) setBasketOpened(true);
  };
  let count = R.compose(
    R.sum,
    R.map(R.prop('quantity')),
    R.values
  )(basketList);
  if (R.gt(count, 100)) count = 100;

  return (
    <>
      <Flex>
        <Icon iconName="basket" handleClick={handleOpenBasket} />
        {R.gt(count, 0) && <BasketCount>{count}</BasketCount>}
      </Flex>
      {basketOpened && (
        <Portal selector="#basket">
          <Basket
            router={router}
            basketList={basketList}
            handleCloseBasket={handleCloseBasket}
          />
        </Portal>
      )}
    </>
  );
};

const Header = ({ router, activeNavItem, handleGoToHomePage }) => (
  <header>
    <Flex
      py={15}
      alignItems="center"
      borderBottom="1px solid"
      justifyContent="space-between"
      borderColor={Theme.colors.lighterGrey}
    >
      <Icon iconName="logo" handleClick={handleGoToHomePage} />
      <Flex>
        {C.ICON_GROUP_SOCIALS.map(({ icon, link }, index) => (
          <StyledLink mr={30} key={index} href={link} target="_blank">
            <Icon iconName={icon} />
          </StyledLink>
        ))}
      </Flex>
      <BasketIcon router={router} />
    </Flex>
    <Nav
      mt={40}
      mx="auto"
      width={750}
      maxWidth="90%"
      justifyContent="space-between"
    >
      {navItems.map(({ link, title }, index) => (
        <Link key={index} href={link}>
          <NavItem
            fontSize={[14, 14, 16]}
            textTransform="uppercase"
            active={activeNavItem(link)}
          >
            {title}
          </NavItem>
        </Link>
      ))}
    </Nav>
  </header>
);

export default Header;
