import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './PageBanner.scss'

const PageBanner = (props) => {
   const { user, logOut } = useAuth()
   
   return (
      <div className="page-banner">
         <div className="page-header-text">
            <h2>{props.children}</h2>
            {
               user.email && 
               <div>
                  <p>{user.displayName}</p>
                  <button onClick={logOut} className="btn-black">Logout</button>
               </div>
            }
            {/* <p>
               <Link className="link" to="/">Home</Link>
               <Link className="link" to="/">Menu</Link>
            </p> */}
         </div>
      </div>
   );
};

export default PageBanner;