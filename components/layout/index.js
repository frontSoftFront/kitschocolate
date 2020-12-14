import React from 'react';
import * as R from 'ramda';
import Head from 'next/head';
// components
import Header from '../header';
import Footer from '../footer';
// ui
import { Img, Flex, PageWrapper } from '../../ui';
// //////////////////////////////////////////////////

const Loader = () => (
  <Flex
    width="100vw"
    height="100vh"
    alignItems="center"
    justifyContent="center"
  >
    <Img src="/loader.gif" />
  </Flex>
);

const Layout = ({ title, router, loading, children }) => {
  if (loading) return <Loader />;
  const { push, route } = router;
  const activeNavItem = R.equals(route);
  const handleGoToHomePage = () => push('/');

  return (
    <PageWrapper mx="auto" maxWidth={1400} px={[25, 25, 50, 75]}>
      <Head>
        <title>{title}</title>
      </Head>
      <Header
        activeNavItem={activeNavItem}
        handleGoToHomePage={handleGoToHomePage}
      />
      {children}
      <Footer
        activeNavItem={activeNavItem}
        handleGoToHomePage={handleGoToHomePage}
      />
    </PageWrapper>
  );
};

export default Layout;
