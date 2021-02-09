const setBasketList = basket => ({
  payload: basket,
  type: 'SET_BASKET'
});

const addItemToBasket = item => ({
  payload: item,
  type: 'ADD_ITEM_TO_BASKET',
});

export default { setBasketList, addItemToBasket };
