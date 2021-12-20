import React from 'react';
import { Link } from 'react-router-dom';
import './PageBanner.scss'

const PageBanner = (props) => {
   
   return (
      <div className="page-banner">
         <div className="page-header-text">
            <h2>{props.children}</h2>
            <p>
               <Link className="link" to="/">Home</Link>
               <Link className="link" to="/">Menu</Link>
            </p>
         </div>
      </div>
   );
};

export default PageBanner;