import React from 'react';
import homeBanner from '../../images/pizza-banner-1.png'
import './HomeBanner.scss'

const Home = () => {
   return (
      <div className="home-banner">
         <div className="home-bg">
            <div className="container">
               <div className="row justify-content-center align-items-md-center align-items-end">
                  <div className="col-md-6">
                     <div className="text-box">
                        <h1>QUALITY F<span>OO</span>DS</h1>
                        <p>HEALTHY FOOD FOR HEALTHY BODY</p>
                     </div>
                  </div>
                  <div className="col-md-6">
                     <img className="img-fluid" src={homeBanner} alt="" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;