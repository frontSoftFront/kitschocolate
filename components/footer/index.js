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
      text: 'Головна',
      link: C.ROUTE_HOME_PAGE
    },
    {
      text: 'Рецепти',
      link: C.ROUTE_RECIPE_PAGE
    },
    {
      text: 'Про нас',
      link: C.ROUTE_ABOUT_PAGE
    }
  ],
  [
    {
      text: 'Корпоративна співпраця',
      link: C.ROUTE_PARTNERSHIP_PAGE
    },
    {
      text: 'Магазин',
      link: C.ROUTE_PATH_SHOP
    },
    {
      text: 'Q/A',
      link: C.ROUTE_QUESTIONS_ANSWERS_PAGE
    },
    {
      text: 'Доставка та Оплата',
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

const Footer = ({ route, activeNavItem, handleGoToHomePage }) => {
  const getOpacity = link => (activeNavItem(link) ? 1 : 0.7);

  return (
    <StyledFooter
      pb={50}
      px={[0, 25, 50, 75]}
      mt={['/', '/shop'].includes(route) ? 50 : Theme.styles.spacing.paddingY}
    >
      <Flex
        mx="auto"
        maxWidth={1440}
        flexWrap="wrap"
        borderTop="2px solid"
        justifyContent="space-between"
        borderColor={Theme.colors.quincy}
        flexDirection={['column', 'row']}
        pt={Theme.styles.spacing.paddingY}
        alignItems={['center', 'flex-start']}
      >
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
            fontSize={[14, 13, 14, 16]}
            textAlign={['center', 'initial']}
          >
            Контакти
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
      </Flex>
    </StyledFooter>
  );
};

export default Footer;
