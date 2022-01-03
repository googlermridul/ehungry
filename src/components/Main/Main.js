import React from "react";
import Services from "../Services/Services";
import HomeBanner from "../HomeBanner/HomeBanner";
import MenuSection from "../MenuSection/MenuSection";
import Reservation from "../Reservation/Reservation";
import AboutSection from "../AboutSection/AboutSection";

const Main = () => {
   return (
      <>
         <HomeBanner />
         <Services />
         <Reservation />
         <MenuSection />
         <AboutSection />
      </>
   );
};

export default Main;
