export const addItems = data => ({
  type: 'CARTS_ADD_ITEM',
  payload: data,
});

export const setOrders = data => ({
  type: 'SET_CARTS_ITEM',
  payload: data,
});

export const deleteAllItems = () => ({
  type: 'CARTS_DELETE_ALL_ITEMS',
  payload: [],
});
