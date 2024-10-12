import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Menu: React.FC = () => {
    return (
        <nav className="menu">
            <ul>
                <li><Link to="/">Home</Link></li> {/* Link to Home */}
                <li><Link to="/pages/LeetCodePage">LeetCode</Link></li> {/* Link to LeetCodePage */}
                <li><Link to="/about">About</Link></li> {/* Link to About (if implemented) */}
            </ul>
        </nav>
    );
};

export default Menu;