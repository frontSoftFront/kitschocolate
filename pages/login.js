import { useState } from 'react';
// forms
import AuthForm from '../forms/auth-form';
// theme
import Theme from '../theme';
// ui
import { Box, Section, SectionTitle } from '../ui';
// ////////////////////////////////////////////////

const PartnershipPage = ({ router }) => (
  <Section
    width="100vw"
    height="100vh"
    display="flex"
    alignItems="center"
    flexDirection="column"
    justifyContent="center"
  >
    <SectionTitle
      {...Theme.styles.pageTitle}
      mb={20}
      fontSize={50}
      fontWeight={500}
      textAlign="center"
    >
      Log In
    </SectionTitle>
    <Box
      width="100%"
      maxWidth={500}
      border="1px solid"
      borderRadius="16px"
      p="0 20px 20px 20px"
      borderColor={Theme.colors.woodyBrown}
    >
      <AuthForm router={router} />
    </Box>
  </Section>
);

export default PartnershipPage;
