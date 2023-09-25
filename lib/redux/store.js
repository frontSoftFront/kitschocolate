/* Core */
import { configureStore } from '@reduxjs/toolkit';
import { actionTypes } from 'react-redux-firebase';
/* Instruments */
import { reducer } from './rootReducer';
import { middleware } from './middleware';
// //////////////////////////////////////////////////

export const reduxStore = configureStore({
  reducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: [
      //     actionTypes.LOGIN,
      //     actionTypes.SET_PROFILE,
      //     actionTypes.LOGIN_ERROR
      //   ]
      // }
    }).concat(middleware);
  }
});
