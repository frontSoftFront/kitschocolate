import * as R from 'ramda';
import Link from 'next/link';
import React, { useState } from 'react';
// constants
import * as C from '../../constants';
// icons
import Icon from '../../icons';
// theme
import Theme from '../../theme';
// ui
import { Flex, Text, StyledLink } from '../../ui';
// feature header
import { Nav, NavItem } from './ui';
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

const languages = ['ua', 'ru', 'en'];

const Header = ({ activeNavItem, handleGoToHomePage }) => {
  const [activeLanguage, setActiveLanguage] = useState('ua');

  return (
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
        <Flex>
          <Flex>
            {languages.map((item, index) => (
              <Text
                mr={10}
                key={index}
                textTransform="uppercase"
                color={Theme.colors.quincy}
                onClick={() => setActiveLanguage(item)}
                opacity={R.equals(item, activeLanguage) ? 1 : 0.5}
              >
                {item}
              </Text>
            ))}
          </Flex>
          <Icon ml={50} iconName="basket" />
        </Flex>
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
};

export default Header;
