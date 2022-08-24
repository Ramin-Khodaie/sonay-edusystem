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

  export const RemoveOneItem = (cartitems, itemToRemove) => {
    const existing = cartitems.find((item) => item.id === itemToAdd.id);
  
    if (existing.quantity === 1) {
      return cartitems.filter((item) => item.id !== itemToRemove);
    }
    if (existing) {
      return cartitems.map((item) =>
        cartitems.id === itemToRemove.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
  };
  
  export const DeleteCartitem = (cartitems, itemToDelete) => {
    if (!itemToDelete) {
      return null;
    }
    return cartitems.filter((item) => item.id !== itemToDelete.id);
  };