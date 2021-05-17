const setBasketList = payload => ({
  payload,
  type: 'SET_BASKET'
});

const addItemToBasket = payload => ({
  payload,
  type: 'ADD_ITEM_TO_BASKET'
});

export default { setBasketList, addItemToBasket };
