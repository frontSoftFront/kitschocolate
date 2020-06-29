import { combineReducers } from 'redux';
// import { firestoreReducer } from 'redux-firestore'; // If you need it
import { firebaseReducer } from 'react-redux-firebase';
// components
import basket from './basket';
// //////////////////////////////////////////////////

const rootReducer = combineReducers({
  basket,
  firebase: firebaseReducer
  // firestore: firestoreReducer If you need it
});

export default rootReducer;
