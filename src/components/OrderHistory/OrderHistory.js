import React, { useEffect, useState } from 'react';
import PageBanner from '../PageBanner/PageBanner';
import useAuth from '../../hooks/useAuth'
import './OrderHistory.scss'

const OrderHistory = () => {
   const { user } = useAuth();
   const [ orders, setOrders ] = useState([]);

   useEffect(() => {
      fetch(`https://radiant-river-46012.herokuapp.com/orders`)
      .then(res => res.json())
      .then(data => setOrders(data))
   }, [user])

   return (
      <>
         <PageBanner>
            <span>order history</span>
         </PageBanner>
         <div className="order-history">
            <div className="container">
               <div className="row">
                  <div className="col">
                     <div className="order-table">
                        <h4>ORDER HISTORY</h4>
                        <table className="table mb-0">
                           <thead>
                              <tr>
                                 <th scope="col">Order ID</th>
                                 <th scope="col">Order Date</th>
                                 <th scope="col">Amount</th>
                                 <th scope="col">Status</th>
                              </tr>
                           </thead>
                           <tbody>
                              {
                                 orders.map(order => (
                                    <tr key={order._id}>
                                       <td>{order._id}</td>
                                       <td>{order.date}</td>
                                       <td>${order.price}</td>
                                       <td>{order.status}</td>
                                    </tr>
                                 ))
                              }
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default OrderHistory;