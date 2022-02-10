import React from "react";
import { useHistory } from "react-router-dom";
import ContentLoader from "react-content-loader";
import "./Menu.scss";
import useMenus from "../../hooks/useMenus";

const Menu = (props) => {
   const { bgColor, fgColor } = props;
   const { _id, image, name, description, price } = props.menu;
   const [menus] = useMenus();
   const history = useHistory();

   const handleDetails = (id) => {
      const url = `/menu/${id}`;
      history.push(url);
   };

   return (
      <div className="col-sm-6 col-lg-4 text-center mx-auto">
         {menus.length ? (
            <div onClick={() => handleDetails(_id)} className="menu-box">
               <div className="img-box">
                  <img className="img-fluid" src={image} alt="" />
                  {/* <img
                     className="img-fluid"
                     src={`data:image/png;base64,${image}`}
                     alt=""
                  /> */}
               </div>
               <div className="info">
                  <h5 className="name">{name}</h5>
                  <p>{description.slice(0, 80)}</p>
                  {props.children ? (
                     <span className="link">{props.children}</span>
                  ) : (
                     <h4 className="price">${price}</h4>
                  )}
               </div>
            </div>
         ) : (
            <ContentLoader
               viewBox="0 0 440 382"
               backgroundColor={bgColor}
               foregroundColor={fgColor}
            >
               <circle cx="227" cy="100" r="100" />
               <rect x="150" y="220" rx="10" ry="10" width="150" height="20" />
               <rect x="100" y="260" rx="10" ry="10" width="250" height="20" />
               <rect x="175" y="300" rx="10" ry="10" width="100" height="20" />
            </ContentLoader>
         )}
      </div>
   );
};

export default Menu;
