import React from 'react';
import Services from '../Services/Services';
import HomeBanner from '../HomeBanner/HomeBanner';
import MenuSection from '../MenuSection/MenuSection';
import Reservation from '../Reservation/Reservation';

const Main = () => {
   return (
      <>
         <HomeBanner />
         <Services />
         <MenuSection />
         <Reservation />
      </>
   );
};

export default Main;