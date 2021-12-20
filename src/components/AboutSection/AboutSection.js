import React from 'react';
import about from '../../images/about2.png';
import './AboutSection.scss';

const AboutSection = () => {
   return (
      <div className="about-section">
         <div className="container">
            <div className="row align-items-end">
               <div className="col-md-6 pe-md-5">
                  <div className="header-text">
                     <span>Delicious Restaurant</span>
                     <h1>OUR SPECIALITY</h1>
                     <p>Sit amet, consectetur adipiscing elit quisque eget maximus velit, non eleifend libero curabitur dapibus mauris sed leo cursus aliquetcras suscipit. Sit amet, consectetur adipiscing elit quisque eget maximus velit, non eleifend libero curabitur</p>
                     <button className="btn-orange">view more</button>
                  </div>
               </div>
               <div className="col-md-6 ps-md-5">
                  <div className="img-box">
                     <img className="img-fluid" src={about} alt="" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AboutSection;