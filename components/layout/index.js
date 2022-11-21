import React from 'react';
import * as R from 'ramda';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { useFirebaseConnect } from 'react-redux-firebase';
// components
import Header from '../header';
import Footer from '../footer';
// helpers
import * as H from '../../helpers';
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

const Layout = ({ title, router, children, collections, firebaseData }) => {
  const requested = R.pathOr({}, ['requested'], firebaseData);
  const collectionsToConnect = R.filter(
    item => R.not(R.path([item], requested)),
    R.or(collections, [])
  );
  const loading = H.isNotEmpty(collectionsToConnect);

  if (loading) {
    useFirebaseConnect(collectionsToConnect);

    return <Loader />;
  }

  const { push, route } = router;

  const activeNavItem = R.equals(route);
  const handleGoToHomePage = () => push('/');

  return (
    <PageWrapper mx="auto" px={[25, 25, 50, 75]}>
      <Head>
        <title>{R.or(title, 'kitschocolate')}</title>
      </Head>
      <Header
        router={router}
        firebaseData={firebaseData}
        activeNavItem={activeNavItem}
        handleGoToHomePage={handleGoToHomePage}
      />
      {children}
      <Footer
        activeNavItem={activeNavItem}
        handleGoToHomePage={handleGoToHomePage}
      />
      <ToastContainer />
    </PageWrapper>
  );
};

export default Layout;
