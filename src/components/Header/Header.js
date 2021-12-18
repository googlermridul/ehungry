import React from 'react';
import { Link } from 'react-router-dom';
import hamburger from '../../images/menu2.png'
import './Header.scss'

const Header = () => {
   return (
      <nav className="navbar navbar-expand-md fixed-top">
         <div className="container">
            <Link className="link" to="/home">
               <h3 className="logo"><span>e</span>hungry</h3>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <img className="hamburger" src={hamburger} alt="" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
               <ul className="navbar-nav">
                  <li className="nav-item">
                     <Link className="link" to="/home">HOME</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="link" to="/menus">MENU</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="link" to="/about">ABOUT US</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="link" to="/contact">CONTACT</Link>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   );
};

export default Header;