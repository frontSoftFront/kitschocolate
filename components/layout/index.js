import React from 'react';
import * as R from 'ramda';
import Head from 'next/head';
import { useRouter } from 'next/router';
// components
import Header from '../header';
import Footer from '../footer';
// ui
import { PageWrapper } from '../../ui';
// //////////////////////////////////////////////////

const Layout = ({ title, children }) => {
  const { push, route } = useRouter();
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
