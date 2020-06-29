import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
// reducer
import rootReducer from './reducer';
/// ///////////////////////////////////////////////

const bindMiddleware = middleware => {
  if (
    typeof window !== 'undefined' &&
    process &&
    process.env &&
    process.env.NODE_ENV === 'development'
  ) {
    return composeWithDevTools(applyMiddleware(logger));
  }
  return applyMiddleware();
};

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload // apply delta from hydration
    };
    if (state.basket) nextState.basket = state.basket; // preserve count value on client side navigation
    return nextState;
  }
  return rootReducer(state, action);
};

const initialStore = () => {
  return createStore(reducer, bindMiddleware());
};

export const wrapper = createWrapper(initialStore);
