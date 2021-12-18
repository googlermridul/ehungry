import { useEffect, useState } from 'react';

const useMenus = () => {
   const [menus, setMenus] = useState([]);
   useEffect(() => {
      fetch('/fakeData/menu.json')
      .then(res => res.json())
      .then(data => setMenus(data))
   }, [])

   return [menus];
};

export default useMenus;