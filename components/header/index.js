import * as R from 'ramda';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
// components
import Portal from '../portal';
// constants
import * as C from '../../constants';
// icons
import Icon from '../../icons';
// theme
import Theme from '../../theme';
// ui
import { Box, Flex, StyledLink } from '../../ui';
// feature header
import { Nav, Counter, NavItem } from './ui';
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

const Basket = () => {
  const [open, setOpen] = useState(false);
  const basketList = useSelector(state => state.basket.basketList);
  if (R.isEmpty(basketList)) {
    return (
      <Box ml={50} width={51}>
        <Icon w={27} h={27} iconName="basket" />
      </Box>
    );
  }

  let basketCount = R.compose(
    R.sum,
    R.values,
    R.map(R.prop('quantity'))
  )(basketList);

  if (R.gt(basketCount, 100)) basketCount = 100;

  return (
    <>
      <Flex ml={50} onClick={() => setOpen(true)}>
        <Icon w={27} h={27} iconName="basket" />
        <Counter>{basketCount}</Counter>
      </Flex>
      {
        open && <Portal selector="#modal"><div className='modal-wrapper'>sss</div></Portal>
      }
    </>
  );
};

const Header = ({ activeNavItem, handleGoToHomePage }) => (
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
      <Basket />
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
