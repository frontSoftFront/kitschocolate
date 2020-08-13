import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
// components
import basket from './basket';
// //////////////////////////////////////////////////

const rootReducer = combineReducers({
  basket,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer;
