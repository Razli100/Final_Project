import './cart-items.styles.css';
import React, { useContext } from 'react';

import {CartContext} from '../../../contexts/Cart.context';

import CartItem from '../cart-item/CartItem.component';

const CartItems = () => {
    const cartContextValue = useContext(CartContext);

    return (
        <div className='cart-items'>
            {cartContextValue.cart.items.map((cartItem) => (
                <CartItem 
                key = {cartItem.bookID._id}
                id = {cartItem.bookID._id}
                cover = {cartItem.bookID.cover}
                title = {cartItem.bookID.title}
                author = {cartItem.bookID.author}
                format = {cartItem.bookID.format}
                rating = {cartItem.bookID.rating}
                price = {cartItem.bookID.price}
                />
            ))}
        </div>
    );
};

export default CartItems;