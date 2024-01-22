import React from 'react';
import {Link, NavLink} from 'react-router-dom';

const Navbar=()=>{
    return (
        <nav>
            <div className="nav-wrapper">
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                </ul>
            </div>
        </nav>
    )

}

export default Navbar;