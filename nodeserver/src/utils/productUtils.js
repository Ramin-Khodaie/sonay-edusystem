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