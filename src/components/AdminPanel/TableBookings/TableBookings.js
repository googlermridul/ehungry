import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const TableBookings = () => {
   const [bookings, setBookings] = useState([]);

   useEffect(() => {
      fetch("https://gentle-gorge-16507.herokuapp.com/bookings")
         .then((res) => res.json())
         .then((data) => setBookings(data));
   }, [bookings]);

   const handleUpdate = (id) => {
      fetch(`https://gentle-gorge-16507.herokuapp.com/bookings/${id}`, {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(bookings),
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
         fetch(`https://gentle-gorge-16507.herokuapp.com/deleteBooking/${id}`, {
            method: "DELETE",
         })
            .then((res) => res.json())
            .then((data) => {
               if (data.deletedCount) {
                  const remaining = bookings.filter((menu) => menu._id !== id);
                  setBookings(remaining);
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
                     <h4>manage table bookings</h4>
                     <table className="table mb-0">
                        <thead>
                           <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Phone</th>
                              <th scope="col">Order Date</th>
                              <th scope="col">Person</th>
                              <th scope="col">Status</th>
                              <th scope="col">Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {bookings.map((order) => (
                              <tr key={order._id}>
                                 <td>
                                    <p>{order.name}</p>
                                 </td>
                                 <td>
                                    <p>{order.phone}</p>
                                 </td>
                                 <td>
                                    <p>{order.date}</p>
                                 </td>
                                 <td>
                                    <p>{order.person}</p>
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
                                             Approve
                                          </button>
                                       ) : (
                                          <button
                                             className="btn-black action delivered"
                                             disabled
                                          >
                                             Approved
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
                           {bookings.length === 0 && (
                              <tr>
                                 <td colSpan="6">
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
   );
};

export default TableBookings;
