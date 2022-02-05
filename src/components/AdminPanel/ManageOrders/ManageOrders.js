import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./ManageOrders.scss";

const ManageOrders = () => {
   const [orders, setOrders] = useState([]);

   useEffect(() => {
      fetch("https://gentle-gorge-16507.herokuapp.com/orders")
         .then((res) => res.json())
         .then((data) => setOrders(data));
   }, [orders]);

   const handleUpdate = (id) => {
      fetch(`https://gentle-gorge-16507.herokuapp.com/orders/${id}`, {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(orders),
      })
         .then((res) => res.json())
         .then((data) => {
            if (data.modifiedCount > 0) {
               alert("Approved successfully");
            }
         });
   };

   const handleDelete = (id) => {
      const proceed = window.confirm("Are you sure you want to delete");
      if (proceed) {
         fetch(`https://gentle-gorge-16507.herokuapp.com/deleteOrder/${id}`, {
            method: "DELETE",
         })
            .then((res) => res.json())
            .then((data) => {
               if (data.deletedCount) {
                  const remaining = orders.filter((menu) => menu._id !== id);
                  setOrders(remaining);
               }
            });
      }
   };

   return (
      <div className="manage-menus manage-orders">
         <div className="container">
            <div className="row">
               <div className="col">
                  <div className="menu-table">
                     <h4>manage food orders</h4>
                     <table className="table mb-0">
                        <thead>
                           <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Order Date</th>
                              <th scope="col">Quantity</th>
                              <th scope="col">Amount</th>
                              <th scope="col">Status</th>
                              <th scope="col">Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {orders.map((order) => (
                              <tr key={order._id}>
                                 <td>
                                    <p>{order.name}</p>
                                 </td>
                                 <td>
                                    <p>{order.date}</p>
                                 </td>
                                 <td>
                                    <p>{order.quantity}</p>
                                 </td>
                                 <td>
                                    <p>${order.price}</p>
                                 </td>
                                 <td>
                                    <p>
                                       {order.status === "Pending" ? (
                                          <button
                                             onClick={() =>
                                                handleUpdate(order._id)
                                             }
                                             className="btn-black action"
                                          >
                                             Make Delivery
                                          </button>
                                       ) : (
                                          <button
                                             className="btn-black action delivered"
                                             disabled
                                          >
                                             Delivered
                                          </button>
                                       )}
                                    </p>
                                 </td>
                                 <td>
                                    <p>
                                       <button
                                          onClick={() =>
                                             handleDelete(order._id)
                                          }
                                          className="btn-black delete"
                                       >
                                          <FontAwesomeIcon
                                             icon={faTrashAlt}
                                             className="fa-icon"
                                          />
                                       </button>
                                    </p>
                                 </td>
                              </tr>
                           ))}
                           {orders.length === 0 && (
                              <tr>
                                 <td colSpan="6">
                                    <p className="mb-0">No orders yet!</p>
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
   );
};

export default ManageOrders;
