import cartActionTypes from '../actions/cart-actions';

export const CART_INITIAL_STATE = {items: [], price:0}

const cartReducer = (state, action) => {
    switch (action.type) {
        case cartActionTypes.CREATE_CART: {
            const cartItems = action.payload.cartItems;

            let price = 0;
            for (let i=0; i < cartItems.length; i++){
                const cartItem = cartItems[i].bookID;

                price = price + cartItem.price;
            }

            console.log(cartItems.count)

            const updatedState = {items: cartItems, price:price};
            return updatedState;
        }
        case cartActionTypes.REMOVE_ITEM: {
            const itemID = action.payload.itemID;
            const itemPrice = action.payload.itemPrice;

            const updatedCartItems = [...state.items].filter((item)=>item.bookID._id !== itemID);
            const updatedPrice = state.price - itemPrice;

            const updatedState = {items:updatedCartItems, price:updatedPrice};

            return updatedState;
        };
        case cartActionTypes.CHECKOUT: {
            const updatedState = {items:[], price:0}
            return updatedState;
        };
        default:
            return state;
    }
};

export default cartReducer;