import React from 'react';
import Link from 'next/link';
// constants
import * as C from '../../constants';
// icons
import Icon from '../../icons';
// theme
import Theme from '../../theme';
// ui
import { Img, Box, Flex, Text, Section, SectionTitle } from '../../ui';
// //////////////////////////////////////////////////

const CustomerReviews = () => (
  <Flex
    flexWrap="wrap"
    justifyContent="space-between"
    py={Theme.styles.spacing.paddingY}
  >
    <Section
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      width={['100%', '45%']}
    >
      <Box
        p="15px 30px"
        borderLeft="4px solid"
        borderRight="4px solid"
        borderColor={Theme.colors.mediumWood}
      >
        <Text fontWeight="500">Testimonials</Text>
      </Box>
      <SectionTitle
        mt={15}
        fontWeight={500}
        fontSize={[18, 25]}
        // fontFamily="Montserrat"
        color="rgba(0, 0, 0, 0.87)"
      >
        WHAT PEOPLE SAYS
      </SectionTitle>
      <Img my={[15, 20, 25]} width={60} height={60} src="/profile.png" />
      <Text
        fontSize={14}
        lineHeight={1.67}
        textAlign="center"
        color="rgba(0, 0, 0, 0.87)"
      >
        When you ask creative people how they did something, they feel a little
        guilty because they didn’t really do it, they just saw something
      </Text>
      <Text
        mb={[15, 0]}
        mt={[15, 20, 25]}
        fontSize={[16, 20]}
        color={Theme.colors.mediumWood}
      >
        Eugene Goodwin
      </Text>
    </Section>
    <Img width={['100%', '45%']} src="/comment-chocolate.png" />
  </Flex>
);

export default CustomerReviews;
