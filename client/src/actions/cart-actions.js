const cartActionTypes = {
    CREATE_CART: 'CREATE_CART',
    REMOVE_ITEM: 'REMOVE_ITEM',
    CHECKOUT:'CHECKOUT',
};

export const createCartAction = (cartItems) =>({
    type: cartActionTypes.CREATE_CART,
    payload: {
        cartItems: cartItems,
    },
});

export const removeItemCartAction = (itemID, itemPrice) =>({
    type: cartActionTypes.REMOVE_ITEM,
    payload:{
        itemID:itemID,
        itemPrice:itemPrice,
    },
});

export const checkOutCartAction = () =>({
    type: cartActionTypes.CHECKOUT,
    payload:{},
});

export default cartActionTypes;