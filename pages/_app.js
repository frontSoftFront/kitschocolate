import React from 'react';
import Head from 'next/head';
import { useStore } from 'react-redux';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
// firebase
import firebase from '../firebase/client-app';
// store
import { wrapper } from '../store';
// ui
import GlobalStyles from '../ui/global-styles';
// //////////////////////////////////////////////////

const WrappedApp = ({ Component, pageProps }) => {
  const store = useStore();
  const rrfConfig = {
    userProfile: 'users',
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
  };
  const rrfProps = {
    firebase,
    config: rrfConfig,
    createFirestoreInstance,
    dispatch: store.dispatch
  };
  return (
    <>
      <Head>
        <title>title</title>
        <meta charSet="utf-8" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Caveat&family=Montserrat&display=swap"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <GlobalStyles />
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Component {...pageProps} />
      </ReactReduxFirebaseProvider>
    </>
  );
};

export default wrapper.withRedux(WrappedApp);
