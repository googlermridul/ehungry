import React from 'react';
import Services from '../Services/Services';
import HomeBanner from '../HomeBanner/HomeBanner';
import MenuSection from '../MenuSection/MenuSection';
import Footer from '../Footer/Footer';
import Reservation from '../Reservation/Reservation';

const Main = () => {
   return (
      <>
         <HomeBanner />
         <Services />
         <MenuSection />
         <Reservation />
         <Footer />
      </>
   );
};

export default Main;