import { useEffect, useState } from "react";

const useMenus = () => {
   const [menus, setMenus] = useState([]);
   useEffect(() => {
      fetch("https://gentle-gorge-16507.herokuapp.com/menus")
         .then((res) => res.json())
         .then((data) => setMenus(data));
   }, []);

   return [menus];
};

export default useMenus;
