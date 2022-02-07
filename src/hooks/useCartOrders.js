import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useCartOrders = () => {
   const { user } = useAuth();
   const [cartOrders, setCartOrders] = useState([]);

   useEffect(() => {
      fetch(`https://gentle-gorge-16507.herokuapp.com/cartOrders/${user.email}`)
         .then((res) => res.json())
         .then((data) => setCartOrders(data));
   }, [user]);

   return [cartOrders, setCartOrders];
};

export default useCartOrders;
