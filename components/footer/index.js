import React from 'react';
import Link from 'next/link';
// constants
import * as C from '../../constants';
// icons
import Icon from '../../icons';
// theme
import Theme from '../../theme';
// ui
import { Box, Img, Flex, Text, StyledLink } from '../../ui';
// feature footer
import { Nav, NavItem, StyledFooter } from './ui';
// //////////////////////////////////////////////////

const columns = [
  [
    {
      text: 'Home',
      link: C.ROUTE_HOME_PAGE
    },
    {
      text: 'Recipe',
      link: C.ROUTE_RECIPE_PAGE
    },
    {
      text: 'About',
      link: C.ROUTE_ABOUT_PAGE
    }
  ],
  [
    {
      text: 'Partnership',
      link: C.ROUTE_PARTNERSHIP_PAGE
    },
    {
      text: 'Shop',
      link: C.ROUTE_PATH_SHOP
    },
    {
      text: 'Q/A',
      link: C.ROUTE_QUESTIONS_ANSWERS_PAGE
    },
    {
      text: 'Delivery and Payment',
      link: C.ROUTE_PATH_DELIVERY_AND_PAYMENT
    }
  ]
];

const getNavItemStyles = {
  mb: 15,
  fontWeight: 500,
  display: 'block',
  maxWidth: [100, '100%'],
  color: Theme.colors.quincy,
  fontSize: [14, 13, 14, 16]
};

const Footer = ({ activeNavItem, handleGoToHomePage }) => {
  const getOpacity = link => (activeNavItem(link) ? 1 : 0.5);

  return (
    <StyledFooter mt={50} py={Theme.styles.spacing.paddingY}>
      <Icon
        iconName="logo"
        width="max-content"
        handleClick={handleGoToHomePage}
      />
      <Nav>
        <Text
          mb={15}
          width="100%"
          opacity={0.5}
          fontSize={[14, 13, 14, 16]}
          display={['block', 'none']}
          textAlign={['center', 'initial']}
        >
          Navigation
        </Text>
        {columns.map((col, colIndex) => (
          <Box key={colIndex}>
            {col.map(({ text, link }, index) => (
              <Link legacyBehavior href={link} key={index}>
                <NavItem {...getNavItemStyles} opacity={getOpacity(link)}>
                  {text}
                </NavItem>
              </Link>
            ))}
          </Box>
        ))}
      </Nav>
      <Box>
        <Text
          opacity={0.5}
          textAlign={['center', 'initial']}
          fontSize={[14, 13, 14, 16]}
        >
          Contact Us
        </Text>
        <Text
          py={15}
          opacity={0.5}
          fontSize={[14, 13, 14, 16]}
          color={Theme.colors.quincy}
        >
          +38 (067) 343 45 55
        </Text>
        <Text
          opacity={0.5}
          fontSize={[14, 13, 14, 16]}
          color={Theme.colors.quincy}
        >
          kit’s_chocolate@gmail.com
        </Text>
      </Box>
      <Box mt={[20, 20, 0, 0]}>
        <Flex mb={15} width={200} justifyContent="space-between">
          {C.ICON_GROUP_SOCIALS.map(({ icon, link }, index) => (
            <StyledLink key={index} href={link} target="_blank">
              <Icon iconName={icon} />
            </StyledLink>
          ))}
        </Flex>
        <Text
          opacity={0.5}
          textAlign="center"
          fontSize={[14, 13, 14, 16]}
          color={Theme.colors.quincy}
        >
          kit’schocolate.com © 2019
        </Text>
        <Flex mt={15} height={20} justifyContent="space-around">
          <Img height="100%" src="../../master-card.svg" />
          <Img height="100%" src="../../visa.svg" />
          <Img height="100%" src="../../apple-pay.svg" />
          <Img height="100%" src="../../google-pay.svg" />
        </Flex>
      </Box>
    </StyledFooter>
  );
};

export default Footer;
