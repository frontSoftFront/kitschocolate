import * as R from 'ramda';
// //////////////////////////////////////////////////

const initialState = {
  total: 0,
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
      const { id, price } = payload;

      let newBasketList = payload;

      if (R.has(id, basketList)) {
        const quantity = R.add(
          payload.quantity,
          R.path([id, 'quantity'], basketList)
        );
        const subtotal = R.multiply(quantity, price);
        const newItem = R.merge(payload, { quantity, subtotal });
        newBasketList = R.assoc(id, newItem, basketList);
      } else {
        const subtotal = R.multiply(payload.quantity, price);
        const newItem = R.assoc('subtotal', subtotal, payload);
        newBasketList = R.assoc(id, newItem, basketList);
      }

      return { ...state, basketList: newBasketList };
    }
    case 'REMOVE_ITEM_FROM_BASKET': {
      const { basketList } = state;

      const { id, price } = payload;

      const quantity = R.path([id, 'quantity'], basketList);

      if (R.equals(quantity, 1)) {
        return { ...state, basketList: R.dissoc(id, basketList) };
      }

      const newItem = {
        ...R.prop(id, basketList),
        quantity: R.dec(quantity),
        subtotal: R.multiply(R.dec(quantity), price)
      };

      return { ...state, basketList: R.assoc(id, newItem, basketList) };
    }
    default:
      return state;
  }
};

export default basket;
