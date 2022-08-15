import React from 'react';
import './book.styles.css';
import {useNavigate} from 'react-router-dom';

const Book = (props) => {
    const navigate = useNavigate(); 
    const handleClick = () => navigate(`/books/${props.id}`)

    return(
    <div className='book-container' onClick={handleClick}>
        <img src={props.cover} alt={props.title}/>

        <span className='title-span'>{props.title}</span>
        <span className='authotr-span'>{props.author}</span>
        <span className='rating-span'>{props.rating}</span>
        <span className='price-span'>{props.price}₪</span>

    </div>
    )
};

export default Book;