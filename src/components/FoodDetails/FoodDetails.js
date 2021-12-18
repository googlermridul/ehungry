import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useMenus from '../../hooks/useMenus';
import PageBanner from '../PageBanner/PageBanner';
import './FoodDetails.scss'

const FoodDetails = () => {
   const [menus] = useMenus();
   const [details, setDetails] = useState({});
   const {menuId} = useParams();

   useEffect(() => {
      if (menus.length) {
         const matchedData = menus.find(menu => menu.id == menuId);
         setDetails(matchedData);
      }
   }, [menus])

   const {image, name, description, price} = details;

   return (
      <div className="food-details">
         <PageBanner>
            <span>FOOD details</span>
         </PageBanner>
         <div className="container">
            <div className="row">
               <div className="col-lg-4 col-md-6">
                  <div className="img-box">
                     <img className="img-fluid" src={image} alt="" />
                  </div>
               </div>
               <div className="col-lg-2 d-none d-lg-block"></div>
               <div className="col-lg-6 col-md-6">
                  <div className="info">
                     <h3 className="name">{name}</h3>
                     <h4 className="price">${price}</h4>
                     <p>{description}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default FoodDetails;