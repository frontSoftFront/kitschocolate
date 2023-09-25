/* Core */
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
/* Instruments */
import { reduxStore } from './redux';
// firebase
import firebase from '../firebase/client-app';
// //////////////////////////////////////////////////

export const Providers = props => {
  const rrfConfig = {
    userProfile: 'users'
    // profileFactory: () => null,
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
  };

  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: reduxStore.dispatch
  };

  return (
    <Provider store={reduxStore}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        {props.children}
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};
