import './footer.styles.css';
import React from 'react';
import pngwing from '../../../assets/pngwing.png'
import fb from '../../../assets/fb.png';
import github from '../../../assets/github.png';
import {Link} from 'react-router-dom';


const Footer = () => {
    return(
        <div className='main-footer'>
            <h3>Developed By Yaniv Razli</h3>
            <div className='social-div'>
            <Link to={{pathname: "https://www.google.com"}} target="_blank"><img className='social-img' src={pngwing}></img> </Link>
                <img className='social-img' src={fb}></img>
                <img className='social-img' src={github}></img>
            </div>

        </div>
    )
};

export default Footer;
