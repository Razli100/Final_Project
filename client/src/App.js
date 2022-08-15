import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Footer from './components/shared/footer/Footer.component';
import Header from './components/shared/header/Header.component';
import HomePage from './pages/home-page/HomePage.component.jsx';
import Loader from './components/shared/loader/Loader.component';
import BookPage from './pages/book-page/BookPage.component';
import PageNotFound from './pages/page-not-found/PageNotFound.component';
import SignUpPage from './pages/signup-page/SignupPage.component';
import LoginPage from './pages/login-page/LoginPage.component';
import AuthContextProvider from './contexts/Auth.context';
import CartContextProvider from './contexts/Cart.context';
import CartPage from './pages/cart-page/CartPage.component.jsx';

function App() {
  return (
  <BrowserRouter>
    <AuthContextProvider>
      <CartContextProvider>
          <Header />
            <Routes>
              <Route path='' element={<HomePage />}/>
              <Route path='/books/:bookID' element={<BookPage />}/>
              <Route path='*' element={<PageNotFound />} />
              <Route path='/users/signup' element={<SignUpPage />} />
              <Route path='/users/login' element={<LoginPage />} />
              <Route path='/cart' element={<CartPage />} />
            </Routes>
          <Footer />
      </CartContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
  );
}

export default App;
