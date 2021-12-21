import React from 'react';
import useMenus from '../../hooks/useMenus';
import Menu from '../Menu/Menu';
import PageBanner from '../PageBanner/PageBanner';
import './MenuPage.scss'

const MenuPage = () => {
   const [menus] = useMenus();

   return (
      <div className="menu-page">
         <PageBanner>
            <span>food menus</span>
         </PageBanner>
         <div className="container">
            <div className="row">
               {
                  menus.map(menu => <Menu
                     menu={menu}
                     key={menu._id}>
                        <span>buy now</span>
                     </Menu> )
               }
            </div>
         </div>
      </div>
   );
};

export default MenuPage;