import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useMenus from "../../hooks/useMenus";
import Menu from "../Menu/Menu";
import "./MenuSection.scss";

const MenuSection = () => {
   const [menus] = useMenus();
   const history = useHistory();

   const handleClick = () => {
      history.push("/menus");
   };

   return (
      <div className="menu-section">
         <div className="container">
            <div className="header-text">
               <span>Fresh From Ehungry</span>
               <h1>OUR SPECIAL MENU</h1>
            </div>
            <div className="row">
               {menus.slice(0, 6).map((menu) => (
                  <Menu
                     menu={menu}
                     key={menu._id}
                     bgColor="#222222"
                     fgColor="#444444"
                  ></Menu>
               ))}
            </div>
            <div className="bottom">
               <button onClick={handleClick} className="btn-orange">
                  view more
               </button>
            </div>
         </div>
      </div>
   );
};

export default MenuSection;
