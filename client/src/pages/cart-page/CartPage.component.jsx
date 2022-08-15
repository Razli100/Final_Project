import React, {useState} from "react";
import './cart-page.styles.css';
import {useNavigate} from 'react-router-dom';
import Loader from '../../components/shared/loader/Loader.component';

import {CartContext} from '../../contexts/Cart.context';
import {AuthContext} from '../../contexts/Auth.context';
import * as cartActions from '../../actions/cart-actions';

import CartItems from './cart-items/CartItems.componante';
import environments from "../../environments/environments";
import { useContext } from "react";
import { useEffect } from "react";

const API_URL = environments.API_URL;
const CartPage = () => {
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(true)
    
    const authContextValue = useContext(AuthContext);
    const cartContextValue = useContext(CartContext);

    const handleCheckout = async () => {
        try {
            const response = await fetch(`${API_URL}/cart/checkout`,{
                method: 'POST',
                headers: {
                    'Authorization' : authContextValue.userToken,
                },
            });

            if (!response.ok) {
                throw new Error();
        
            };

            const responseObj = await response.json();
            const msg = responseObj.message;
            alert(msg);

            cartContextValue.dispatchCart(cartActions.checkOutCartAction())
        } catch (error) {
            alert ('Something went wrong!');
            console.log(error)

        };
    };

    useEffect(() => {
        const getCart = async () => {
            try {
                const response = await fetch(`${API_URL}/cart`,{
                    headers: {
                        'Authorization' : authContextValue.userToken,
                    },
                });

                if (!response.ok) {
                    throw new Error();
                };

                const responseObj = await response.json();
                const cart = responseObj.data.cart;

                cartContextValue.dispatchCart(cartActions.createCartAction(cart.books))

                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);


            } catch (error) {
                console.log(error)
               navigate('*'); 
            }
        }

        const userToken = localStorage.getItem('user-token');

        if(!userToken) {
            navigate('/');
        
        return;
        };

        getCart();
        window.scrollTo(0,0)
    },[]);

    return isLoading ? (
        <Loader />
    ) : cartContextValue.cart.items.length === 0 ? (
        <main className="cart-page-0">
            <h2>Your Cart Is Empty</h2>
            <img src="data:image/png;base64,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" alt="" />
        </main>

    ) : ( <main className="cart-page">
        <CartItems />

    <div className="price-btn-div">
        <h4 className="price-header">{`Total Price: ₪${cartContextValue.cart.price.toFixed(2)}`}</h4>

        <button type="button" className="checkout-btn" onClick={handleCheckout}>
            Checkout
        </button>
    </div>
</main>)
      
};

export default CartPage;