// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Assuming you have a CSS file for styling

const Header = () => {
    return (
        <header className="header">
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/userLookups" className="nav-link">userLookups</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/airlineLookup" className="nav-link">airlineLookups</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/flightLookup" className="nav-link">flightLookups</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;