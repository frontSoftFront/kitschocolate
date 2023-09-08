const setBasketList = payload => ({
  payload,
  type: 'SET_BASKET'
});

const addItemToBasket = payload => ({
  payload,
  type: 'ADD_ITEM_TO_BASKET'
});

const removeItemFromBasket = payload => ({
  payload,
  type: 'REMOVE_ITEM_FROM_BASKET'
});

export default { setBasketList, addItemToBasket, removeItemFromBasket };
