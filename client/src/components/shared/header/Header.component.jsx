import './header.styles.css';
import Sidebar from '../sidebar/Sidebar.component.jsx'
import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../contexts/Cart.context';

const Header = () => {

    const [sideBarClass, setSideBarClass] = useState('');
    const showSidebar = () => setSideBarClass('show')
    const hideSideBar = () => setSideBarClass('');
    const cartContextValue = useContext(CartContext)
    
    return(
        <div className='main-header'>
            <Link to={'/'}><h1>The CookBook</h1></Link>

             <div className='cart'>
             <Link to={'/cart'}><img src="https://img.icons8.com/dotty/80/ffffff/shopping-bag.png"/> </Link>
             Shoping <br /> Bag 
             <span className='cart-counter'>{cartContextValue.cart.items.length}</span>
            </div>

                <button className="hamburger-btn" onClick={showSidebar}>
                    <div className="hamurger-bar-l"></div>
                    <div className="hamurger-bar-m"></div>
                    <div className="hamurger-bar-s"></div>
                </button>


        
            <Sidebar className={sideBarClass} hideSideBar={hideSideBar} />

        </div>
    )
};

export default Header;
