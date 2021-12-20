import React from 'react';
import './PageBanner.scss'

const PageBanner = (props) => {
   
   return (
      <div className="page-banner">
         <div className="overlay">
            <div className="page-header-text">
               <h3>{props.children}</h3>
            </div>
         </div>
      </div>
   );
};

export default PageBanner;