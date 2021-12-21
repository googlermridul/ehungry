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
                     <p>Ehungry is a restaurant site. With this you can order the food of your choice online. Ehungry is a restaurant site. With this you can order the food of your choice online. Ehungry is a restaurant site. With this you can order the food of your choice online.</p>
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