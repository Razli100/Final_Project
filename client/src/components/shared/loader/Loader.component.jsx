import React from 'react';
import './loader.styles.css';

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader"></div>
            <div className="loading-text">Hang Tight...</div>
        </div>
    );
};

export default Loader;