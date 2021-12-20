import React from 'react';
import PageBanner from '../PageBanner/PageBanner';
import './NotFound.scss'

const NotFound = () => {
   return (
      <>
         <PageBanner>
            <span>page not found</span>
         </PageBanner>
         <div className="not-found">
            <div className="container">
               <div className="row">
                  <div className="col">
                     <h1>404</h1>
                     <h3>Page not found</h3>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default NotFound;