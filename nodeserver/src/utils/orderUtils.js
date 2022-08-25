export const AddToCart = (cartitems, itemToAdd) => {
  const existing = cartitems.find((item) => item.id === itemToAdd.id);
  if (existing) {
    return cartitems.map((item) =>
      item.id === itemToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartitems, { ...itemToAdd, quantity: 1 }];
};

export const RemoveOneItem = (cartitems, itemToRemoveId) => {

  const existing = cartitems.find((item) => item.id === itemToRemoveId);

  if (existing.quantity === 1) {
    return cartitems.filter((item) => item.id !== itemToRemoveId);
  }
  if (existing) {
    return cartitems.map((item) =>
      cartitems.id === itemToRemoveId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }
};

export const DeleteCartitem = (cartitems, itemToDeleteID) => {
  if (!itemToDeleteID) {
    return null;
  }
  return cartitems.filter((item) => item.id !== itemToDeleteID);
};