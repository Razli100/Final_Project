import React, { useContext } from "react";
import './cart-item.styles.css';
import {AuthContext} from '../../../contexts/Auth.context';
import {CartContext} from '../../../contexts/Cart.context';
import environments from '../../../environments/environments';
import {removeItemCartAction} from '../../../actions/cart-actions';
    
const API_URL = environments.API_URL;

const CartItem = (props) => {
    const authContextValue = useContext(AuthContext);
    const cartContextValue = useContext(CartContext);

    const handleRemoveItem = async () => {
        const data = {bookID:props.id}

        try {
            const response = await fetch(`${API_URL}/cart`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': authContextValue.userToken,
                },
                body: JSON.stringify(data),
            });
            
            if(!response.ok){
                throw new Error();
            };

            cartContextValue.dispatchCart(removeItemCartAction(props.id, props.price))
        } catch (error) {
            alert("Somthing went wrong!")
        }
    }

    return(
        <div className="cart-item">
            <img src={props.cover} alt={props.title} />

            <div className="title-div" >
                <h2>{props.title}</h2>
            </div>
            <div className="book-data">
                <h4>{props.author}</h4>
                <h5>{props.format}</h5>
            </div>

            <div className="price-div">
                {`₪${props.price}`}
            </div>

            <button className="remove-btn" onClick={handleRemoveItem}>
            Remove 

            <div>🗑️</div>
            </button>
        </div>
    )
};

export default CartItem;