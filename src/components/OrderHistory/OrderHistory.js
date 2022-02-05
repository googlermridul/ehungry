import React, { useEffect, useState } from "react";
import PageBanner from "../PageBanner/PageBanner";
import useAuth from "../../hooks/useAuth";
import "./OrderHistory.scss";

const OrderHistory = () => {
   const { user } = useAuth();
   const [orders, setOrders] = useState([]);
   const [bookings, setBookings] = useState([]);

   useEffect(() => {
      fetch(`https://gentle-gorge-16507.herokuapp.com/orders/${user.email}`)
         .then((res) => res.json())
         .then((data) => setOrders(data));
   }, [user]);

   useEffect(() => {
      fetch(`https://gentle-gorge-16507.herokuapp.com/bookings/${user.email}`)
         .then((res) => res.json())
         .then((data) => setBookings(data));
   }, [user]);

   return (
      <>
         <PageBanner>
            <span>order history</span>
         </PageBanner>
         <div className="order-history">
            <div className="container">
               <div className="row">
                  <div className="col">
                     <h4>ORDER HISTORY</h4>
                     <div className="order-table">
                        <table className="table mb-0">
                           <thead>
                              <tr>
                                 <th scope="col">Order ID</th>
                                 <th scope="col">Item</th>
                                 <th scope="col">Order Date</th>
                                 <th scope="col">Amount</th>
                                 <th scope="col">Status</th>
                              </tr>
                           </thead>
                           <tbody>
                              {orders.map((order) => (
                                 <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td></td>
                                    <td>{order.date}</td>
                                    <td>${order.price}</td>
                                    <td>{order.status}</td>
                                 </tr>
                              ))}
                              {orders.length === 0 && (
                                 <tr>
                                    <td colSpan="5">
                                       <p className="mb-0">No orders yet!</p>
                                    </td>
                                 </tr>
                              )}
                           </tbody>
                        </table>
                     </div>

                     <h4>table bookings</h4>
                     <div className="order-table">
                        <table className="table mb-0">
                           <thead>
                              <tr>
                                 <th scope="col">Order ID</th>
                                 <th scope="col">Order Date</th>
                                 <th scope="col">Person</th>
                                 <th scope="col">Status</th>
                              </tr>
                           </thead>
                           <tbody>
                              {bookings.map((booking) => (
                                 <tr key={booking._id}>
                                    <td>{booking._id}</td>
                                    <td>{booking.date}</td>
                                    <td>{booking.person}</td>
                                    <td>{booking.status}</td>
                                 </tr>
                              ))}
                              {bookings.length === 0 && (
                                 <tr>
                                    <td colSpan="4">
                                       <p className="mb-0">No bookings yet!</p>
                                    </td>
                                 </tr>
                              )}
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
