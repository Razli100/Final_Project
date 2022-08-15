import React, { useState, useEffect, useContext } from 'react';
import {useParams} from 'react-router-dom';
import Loader from '../../components/shared/loader/Loader.component.jsx';
import './book-page.styles.css';
import environments from '../../environments/environments.js';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth.context.jsx';
import { Link } from 'react-router-dom';


const API_URL = environments.API_URL;

const BookPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [book,setBook] = useState('');
    const params = useParams();
    const authContextValue = useContext(AuthContext);
    
    const handleAddBookToCart = async () => {
        if (authContextValue.userToken == null) {
            alert('Please Login In Order To Add Items To Your Cart')
            navigate('/users/login')
            return;
            
        };

        const data = {bookID: params.bookID};

        try {
            const response = await fetch (`${API_URL}/cart/add-to-cart`,{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : authContextValue.userToken,
                },
                body: JSON.stringify(data),
            });

            const responseObj = await response.json();
            const msg = responseObj.message;

            alert(msg);
            navigate('/cart')

        } catch (error) {
            alert('Something went wrong!')
        }
    }

    useEffect(() => {
        const bookID = params.bookID;
        
        const getBook = async () => {
            try {
                const response = await fetch(`${API_URL}/books/${bookID}`);

               
                if(!response.ok) {
                    throw new Error();
                }

                const responseObj = await response.json();
                const book = responseObj.data.book;
                console.log(book)

                setBook(book);
                
                
            } catch (error) {
                alert('Something went wrong')
                console.log(error);
            }
                    
                
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        getBook();
        window.scrollTo(0,0)
    }, []);

        return isLoading ? (

            <Loader />
    
        ) : ( 
            <div className='book-main-div'>
                <div className='book-div'>              
                    
                    <div className='img-div'>
                        <img src={book.cover} alt={book.title} />
                    </div>
                    
                    <div className='description-div'>

                        <div className='title-div'>
                        {book.title}<br />
                        </div>

                        <div className='tech-details-div'>
                            {book.rating} <br />
                            {book.format} <br />
                            {book.author} <br />
                        </div>
                        {book.description}
                    </div>
                    <div className='price-and-cart'>
                        <div className='price-div'>₪{book.price}
                            </div>
                        <div className='delivery-div'>
                        🚀 Free delivery worldwide 
                            </div>
                        <div className='delivery-days-div'>
                        🚚 Available. Expected delivery to Israel in 12-15 business days. 
                            </div>
                            <div className='delivery-in-stock-div'>
                        ✔️  In Stock 
                            </div>
                        <button type='button' onClick={handleAddBookToCart} className='add-to-cart-btn'>Add To Cart</button>        
                    </div>
                </div>

        </div>
        )};

            

export default BookPage;
