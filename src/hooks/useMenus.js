import { useEffect, useState } from 'react';

const useMenus = () => {
   const [menus, setMenus] = useState([]);
   useEffect(() => {
      fetch('https://radiant-river-46012.herokuapp.com/menus')
      .then(res => res.json())
      .then(data => setMenus(data))
   }, [])

   return [menus];
};

export default useMenus;