import React from 'react';
import Link from 'next/link';
// constants
import * as C from '../../constants';
// icons
import Icon from '../../icons';
// theme
import Theme from '../../theme';
// ui
import { Box, Flex, Text, StyledLink } from '../../ui';
// feature footer
import { Nav, NavItem } from './ui';
// //////////////////////////////////////////////////

const navItems = [
  {
    order: 1,
    title: 'Home',
    link: C.ROUTE_HOME_PAGE
  },
  {
    order: 3,
    title: 'About',
    link: C.ROUTE_ABOUT_PAGE
  },
  {
    order: 5,
    title: 'Shop',
    link: C.ROUTE_PATH_SHOP
  },
  {
    order: 2,
    title: 'Recipe',
    link: C.ROUTE_RECIPE_PAGE
  },
  {
    order: 4,
    title: 'Partnership',
    link: C.ROUTE_PARTNERSHIP_PAGE
  }
];

const Footer = ({ activeNavItem, handleGoToHomePage }) => (
  <footer>
    <Icon
      w={105}
      h={137}
      mx="auto"
      iconName="logo"
      handleClick={handleGoToHomePage}
    />
    <Flex
      py={50}
      mt={50}
      alignItems="center"
      borderTop="2px solid"
      flexDirection="column"
      borderColor={Theme.colors.quincy}
    >
      <Flex width="max-content">
        <Nav gridGap="10px 150px" gridTemplateColumns="1fr 1fr">
          {navItems.map(({ link, order, title }, index) => (
            <Link key={index} href={link}>
              <NavItem
                order={order}
                fontSize={18}
                fontWeight={500}
                color={Theme.colors.quincy}
                opacity={activeNavItem(link) ? 1 : 0.5}
              >
                {title}
              </NavItem>
            </Link>
          ))}
        </Nav>
        <Box ml={150}>
          <Text opacity={0.5} fontSize={18}>
            Contact Us
          </Text>
          <Text py={15} opacity={0.5} fontSize={18} color={Theme.colors.quincy}>
            +38 (067) 343 45 55
          </Text>
          <Text opacity={0.5} fontSize={18} color={Theme.colors.quincy}>
            kit’s_chocolate@gmail.com
          </Text>
        </Box>
      </Flex>
      <Flex my={50} width={200} justifyContent="space-between">
        {C.ICON_GROUP_SOCIALS.map(({ icon, link }, index) => (
          <StyledLink key={index} href={link} target="_blank">
            <Icon iconName={icon} />
          </StyledLink>
        ))}
      </Flex>
      <Text opacity={0.5} fontSize={18} color={Theme.colors.quincy}>
        kit’schocolate.com © 2019
      </Text>
    </Flex>
  </footer>
);

export default Footer;
