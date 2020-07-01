const initialState = {
  basketList: {}
};

const basket = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_BASKET':
      return {
        ...state,
        basketList: payload
      };
    default:
      return state;
  }
};

export default basket;
