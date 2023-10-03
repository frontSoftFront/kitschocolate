import is from 'is_js';
import * as R from 'ramda';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useState, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import { createSelector } from '@reduxjs/toolkit';
import { useFirebaseConnect } from 'react-redux-firebase';
// components
import Header from '../header';
import Footer from '../footer';
import Loader from '../loader';
// helpers
import * as H from '../../helpers';
// ui
import { Img, Flex, Box } from '../../ui';
// //////////////////////////////////////////////////

const makeSelectFirebaseData = createSelector(
  R.propOr({}, 'firebase'),
  R.propOr({}, 'data')
);

const makeSelectRequestedCollections = createSelector(
  R.propOr({}, 'firebase'),
  R.propOr({}, 'requested')
);

const makeSelectUserAuthorized = createSelector(
  R.propOr({}, 'firebase'),
  R.pathOr(false, ['auth', 'uid'])
);

const Glimmer = () => (
  <Flex
    width="100vw"
    height="100vh"
    alignItems="center"
    justifyContent="center"
  >
    <Img src="/loader.gif" />
  </Flex>
);

const Layout = ({ children, collections, title = 'kitschocolate' }) => {
  const [loading, setLoading] = useState(false);

  const data = useSelector(makeSelectFirebaseData);
  const userAuthorized = useSelector(makeSelectUserAuthorized);
  const requestedCollections = useSelector(makeSelectRequestedCollections);

  const router = useRouter();

  const { push, route } = router;

  const handleNavigate = useCallback(
    to => {
      if (R.equals(route, to)) {
        window.scrollTo({ top: 0, left: 0 });

        return;
      }

      push(to);
    },
    [route]
  );

  const handleOpenLoader = useCallback(() => {
    setLoading(true);

    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  }, []);

  const handleCloseLoader = useCallback(() => {
    setLoading(false);

    document.getElementsByTagName('body')[0].style.overflow = 'initial';
  }, []);

  const collectionsToConnect = R.filter(item => {
    const collectionName = R.pathOr(item, ['path'], item);

    return R.not(R.path([collectionName], requestedCollections));
  }, R.or(collections, []));

  console.log(collections, collectionsToConnect);

  useFirebaseConnect(collectionsToConnect);

  if (H.isNotEmpty(collectionsToConnect)) return <Glimmer />;

  if (R.and(R.equals(route, '/constructor'), R.not(userAuthorized))) {
    push('/login');
  }

  const activeNavItem = R.equals(route);

  const firebaseData = { data };

  return (
    <>
      <Head>
        <title>
          {is.function(title) ? title({ router, firebaseData }) : title}
        </title>
      </Head>
      <Header
        router={router}
        firebaseData={firebaseData}
        activeNavItem={activeNavItem}
        handleNavigate={handleNavigate}
        userAuthorized={userAuthorized}
        handleGoToHomePage={() => handleNavigate('/')}
      />
      <Box px={[25, 25, 50, 75]}>
        <Box mx="auto" maxWidth={1400}>
          {is.function(children)
            ? children({
                router,
                firebaseData,
                handleOpenLoader,
                handleCloseLoader
              })
            : children}
        </Box>
      </Box>
      <Footer
        route={route}
        activeNavItem={activeNavItem}
        handleNavigate={handleNavigate}
        handleGoToHomePage={() => handleNavigate('/')}
      />
      <ToastContainer />
      {loading ? <Loader /> : null}
    </>
  );
};

export default Layout;
