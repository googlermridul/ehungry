import { useEffect, useState } from 'react';

const useMenus = () => {
   const [menus, setMenus] = useState([]);
   useEffect(() => {
      fetch('http://localhost:5000/menus')
      .then(res => res.json())
      .then(data => setMenus(data))
   }, [])

   return [menus];
};

export default useMenus;