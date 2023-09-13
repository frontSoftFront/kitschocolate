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
import { Img, Flex, Box } from '../../ui';
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
    <>
      <Head>
        <title>{R.or(title, 'kitschocolate')}</title>
      </Head>
      <Header
        router={router}
        firebaseData={firebaseData}
        activeNavItem={activeNavItem}
        handleGoToHomePage={handleGoToHomePage}
      />
      <Box px={[25, 25, 50, 75]}>
        <Box mx="auto" maxWidth={1400}>
          {children}
        </Box>
      </Box>
      <Footer
        route={route}
        activeNavItem={activeNavItem}
        handleGoToHomePage={handleGoToHomePage}
      />
      <ToastContainer />
    </>
  );
};

export default Layout;
