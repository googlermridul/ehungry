import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ManageUsers = () => {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      fetch("https://gentle-gorge-16507.herokuapp.com/users")
         .then((res) => res.json())
         .then((data) => setUsers(data));
   }, []);

   const handleDelete = (id) => {
      const proceed = window.confirm("Are you sure you want to delete");
      if (proceed) {
         fetch(`https://gentle-gorge-16507.herokuapp.com/deleteUser/${id}`, {
            method: "DELETE",
         })
            .then((res) => res.json())
            .then((data) => {
               if (data.deletedCount) {
                  const remaining = users.filter((menu) => menu._id !== id);
                  setUsers(remaining);
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
                     <h4>manage all users</h4>
                     <table className="table mb-0">
                        <thead>
                           <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Email</th>
                              <th scope="col">Role</th>
                              <th scope="col">Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {users.map((user) => (
                              <tr key={user._id}>
                                 <td>
                                    <p>{user.displayName}</p>
                                 </td>
                                 <td>
                                    <p>{user.email}</p>
                                 </td>
                                 <td>
                                    <p>
                                       {user.role === undefined
                                          ? "User"
                                          : "Admin"}
                                    </p>
                                 </td>
                                 <td>
                                    <p>
                                       <button
                                          onClick={() => handleDelete(user._id)}
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
                           {users.length === 0 && (
                              <tr>
                                 <td colSpan="6">
                                    <p className="mb-0">No user found!</p>
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

export default ManageUsers;
