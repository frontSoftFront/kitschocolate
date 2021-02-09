import * as R from 'ramda';
// //////////////////////////////////////////////////

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
    case 'ADD_ITEM_TO_BASKET': {
      const { basketList } = state;
      const { id } = payload;
      let newItem = payload;

      if (R.hasIn(id, basketList)) {
        const addedItem = R.path([id], basketList);
        const price = R.add(payload.price, addedItem.price);
        const quantity = R.add(payload.quantity, addedItem.quantity);

        newItem = R.merge(addedItem, { price, quantity });
      }

      return {
        ...state,
        basketList: R.assoc(id, newItem, basketList)
      };
    }
    default:
      return state;
  }
};

export default basket;
