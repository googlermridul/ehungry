import React from 'react';
import { useHistory } from 'react-router-dom';
import './Menu.scss'

const Menu = (props) => {
   const {_id, image, name, description, price} = props.menu;
   const history = useHistory();

   const handleDetails = (id) => {
      const url = `/menu/${id}`;
      history.push(url)
   }
   
   return (
      <div className="col-sm-6 col-lg-4">
         <div onClick={() => handleDetails(_id)} className="menu-box">
            <div className="img-box">
               <img className="img-fluid" src={image} alt="" />
            </div>
            <div className="info">
               <h5 className="name">{name}</h5>
               <p>{description.slice(0, 80)}</p>
               {
                  props.children ? 
                  <span className="link">{props.children}</span> :
                  <h4 className="price">${price}</h4>
               }
            </div>
         </div>
      </div>

   );
};

export default Menu;