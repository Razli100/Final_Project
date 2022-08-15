import React, {useState, useEffect} from 'react';
import Loader from "../../components/shared/loader/Loader.component.jsx";
import './home-page.styles.css'
import environments from '../../environments/environments.js';
import Book from '../../components/book/Book.componante';
import { Link } from 'react-router-dom';


const API_URL = environments.API_URL;


const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [books,setBooks] = useState([]);


        useEffect(() => {
            
            const getBooks = async () => {
                
                try {
                    const response = await fetch(`${API_URL}/books`);
                    
                                   console.log(response)
                    if(!response.ok) {
                        throw new Error();
         
                    }
                    const responseObj = await response.json();
                    const books = responseObj.data.books;
                    

                    setBooks(books);

                } catch (error) {
                    console.log(error)
                  alert('Something went wrong')

                }
            }
            getBooks();
            window.scrollTo(0,0)

            
            
            setTimeout(() => {
                setIsLoading(false);
            },1500);

        },[]);

        

        return isLoading ? (
            <Loader />
        ) : (        
        <main className="home-page">
            <div className="books-div">
                {books.map((book) => (
                   <Book
                   id = {book._id}
                   title = {book.title} 
                   author = {book.author}
                   cover = {book.cover}
                   rating = {book.rating}
                   price = {book.price}
                    /> 
                ))}
            </div>

            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
<div class="floating-container">
  <div class="floating-button">+</div>
  
  <div class="element-container">
  <span class="float-element">
  <a href="mailto:razli100@gmail.com" />
      <i class="material-icons">email
      
</i>

    </span>
    <a href="mailto:razli100@gmail.com"> 
    <span class="float-element tooltip-left">
      <i class="material-icons">phone
      </i>
    </span></a>
     
    
  </div>
</div>
        </main>
        );
};


export default HomePage;