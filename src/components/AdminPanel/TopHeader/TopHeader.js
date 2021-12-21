import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth'
import hamburger from '../../../images/menu2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import './TopHeader.scss'

const TopHeader = () => {
   const {logOut} = useAuth()

   return (
      <header className="top-header navbar sticky-top bg-dark flex-md-nowrap">
         
         <Link className="link logo col-md-3 col-lg-2 text-center" to="/home">
            <h3 className="logo"><span>e</span>hungry</h3>
         </Link>
         
         <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <img className="hamburger" src={hamburger} alt="" />
         </button>

         <div className="w-100">

         </div>
         <div className="navbar-nav d-none">
            <div className="nav-item m-0 text-nowrap">
               <button onClick={logOut} className="btn-orange">
                  <FontAwesomeIcon className="fa-icon" icon={faSignOutAlt} /> Logout
               </button>
            </div>
         </div>
    </header>
   );
};

export default TopHeader;