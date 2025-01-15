import React from 'react';
import { Link } from 'react-router-dom';  
import './navbar.css';

function Navbar() {
  return (
    <div className="nav">
      
      <div className="nav_logo">EVlution</div>

    
      <ul className="nav_menu">
      <li><Link to="/admin">Admin</Link></li> 
        <li><Link to="/">Home</Link></li> 
        <li><Link to="/explore">Explore</Link></li>  
        <li><Link to="/about">About</Link></li> 
        <li><Link to="/contact" className="nav_contact">Contact</Link></li>  
      </ul>
    </div>
  );
}

export default Navbar;
