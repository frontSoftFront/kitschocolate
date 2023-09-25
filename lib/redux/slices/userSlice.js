import { createSlice, createSelector } from '@reduxjs/toolkit';
// //////////////////////////////////////////////////

const initialState = {
  uid: null
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUID: (state, { payload }) => {
      state.uid = payload;
    }
  }
});

const { setUID } = userSlice.actions;

export const userActions = { setUID };

export const makeSelectUID = createSelector(
  ({ user }) => user,
  ({ uid }) => uid
);
