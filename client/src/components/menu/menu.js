import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import './menu.css';

const Menu = () => {
    return (
        <div className="navbar">
            <img src={logo} alt="Logo" className="logo" />
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
        </div>
    );
};

export default Menu;
