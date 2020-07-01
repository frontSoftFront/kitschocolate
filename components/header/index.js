import React from 'react';
// icons
import * as I from '../../icons';
// ui
import { Box, Nav, Flex, StyledLink } from '../../ui';
// //////////////////////////////////////////////////

const socials = [I.facebook, I.instagram, I.ln, I.youTube];

const Header = props => (
  <header>
    <Flex
      alignItems="center"
      borderBottom="1px solid"
      borderColor="#dadada"
      justifyContent="space-between"
    >
      <Box>{I.logo()}</Box>
      <Flex>
        {socials.map((item, index) => (
          <Box mr={30} key={index}>
            {item()}
          </Box>
        ))}
      </Flex>
      <Box>{I.basket()}</Box>
    </Flex>
  </header>
);

export default Header;
