import { firebaseReducer } from 'react-redux-firebase';
// slices
import { userSlice, basketSlice } from './slices';
// //////////////////////////////////////////////////

export const reducer = {
  user: userSlice.reducer,
  firebase: firebaseReducer,
  basket: basketSlice.reducer
};
