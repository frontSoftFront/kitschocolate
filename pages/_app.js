import * as R from 'ramda';
import Head from 'next/head';
import 'react-toggle/style.css';
import { useRouter } from 'next/router';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-dropzone-uploader/dist/styles.css';
import { useStore, useSelector } from 'react-redux';
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
  const router = useRouter();
  const rrfConfig = {
    userProfile: 'users'
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
  };

  const rrfProps = {
    firebase,
    config: rrfConfig,
    createFirestoreInstance,
    dispatch: store.dispatch
  };
  const firebaseData = useSelector(
    R.compose(
      R.pick(['data', 'requested']),
      R.pathOr({}, ['firebase'])
    )
  );

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&family=Caveat&family=Montserrat:wght@300;400;500&display=swap"
        /> */}
      </Head>
      <GlobalStyles />
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Component {...pageProps} router={router} firebaseData={firebaseData} />
      </ReactReduxFirebaseProvider>
    </>
  );
};

export default wrapper.withRedux(WrappedApp);
