import React from 'react';
import Head from 'next/head';
import { useStore } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { createFirestoreInstance } from 'redux-firestore'; // If you need it
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
    userProfile: 'users'
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
  };
  const rrfProps = {
    firebase,
    config: rrfConfig,
    createFirestoreInstance, // If you need it
    dispatch: store.dispatch
  };
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Caveat&family=Montserrat:wght@300;400;500&display=swap"
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
