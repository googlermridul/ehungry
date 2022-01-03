import React, { useEffect, useState } from "react";
import PageBanner from "../PageBanner/PageBanner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import "./Cart.scss";

const Cart = () => {
   const { user } = useAuth();
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();
   const [cartOrders, setCartOrders] = useState([]);
   const [totalQuantity, setTotalQuantity] = useState(0);
   const [subTotal, setSubTotal] = useState(0);
   const [tax, setTax] = useState(0);

   useEffect(() => {
      fetch(`https://gentle-gorge-16507.herokuapp.com/cartOrders/${user.email}`)
         .then((res) => res.json())
         .then((data) => setCartOrders(data));
   }, [user]);

   useEffect(() => {
      if (cartOrders.length) {
         const price = cartOrders.reduce(
            (prev, order) =>
               prev + parseInt(order.price) * parseInt(order.quantity),
            0
         );
         const quantity = cartOrders.reduce(
            (prev, order) => prev + parseInt(order.quantity),
            0
         );
         const tax = price * 0.07;
         setSubTotal(price);
         setTotalQuantity(quantity);
         setTax(Math.round(tax));
      }
   }, [cartOrders]);

   const handleDelete = (id) => {
      const proceed = window.confirm("Are you sure you want to delete");
      if (proceed) {
         fetch(
            `https://gentle-gorge-16507.herokuapp.com/deleteCartOrder/${id}`,
            {
               method: "DELETE",
            }
         )
            .then((res) => res.json())
            .then((data) => {
               if (data.deletedCount) {
                  const remaining = cartOrders.filter(
                     (order) => order._id !== id
                  );
                  setCartOrders(remaining);
                  setSubTotal(0);
                  setTotalQuantity(0);
                  setTax(0);
               }
            });
      }
   };

   const handleDeleteAll = (email) => {
      fetch(
         `https://gentle-gorge-16507.herokuapp.com/deleteAllCartOrder/${email}`,
         {
            method: "DELETE",
         }
      )
         .then((res) => res.json())
         .then((data) => {
            if (data.deletedCount) {
               const remaining = cartOrders.filter(
                  (order) => order.email !== email
               );
               setCartOrders(remaining);
            }
         });
   };

   const onSubmit = (data) => {
      data.status = "Pending";
      data.date = new Date().toDateString();
      data.price = subTotal + tax;
      data.quantity = totalQuantity;

      if (cartOrders.length) {
         fetch(`https://gentle-gorge-16507.herokuapp.com/addOrder`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
         })
            .then((res) => res.json())
            .then((result) => {
               if (result.insertedId && cartOrders.length) {
                  alert("Ordered successfully");
                  reset();
                  setCartOrders([]);
                  setSubTotal(0);
                  setTotalQuantity(0);
                  setTax(0);
                  handleDeleteAll(user.email);
               }
            });
      } else {
         alert("Please add some food in your cart!");
      }
   };

   return (
      <>
         <PageBanner>
            <span>cart</span>
         </PageBanner>
         <div className="cart">
            <div className="container">
               <div className="row">
                  <div className="col">
                     <h4>Food cart</h4>
                     <div className="cart-table">
                        <table className="table mb-0">
                           <thead>
                              <tr>
                                 <th scope="col">Item</th>
                                 <th scope="col">Item name</th>
                                 <th scope="col">Price</th>
                                 <th scope="col">Quantity</th>
                                 <th scope="col">Sub Total</th>
                                 <th scope="col">Action</th>
                              </tr>
                           </thead>
                           <tbody>
                              {cartOrders.map((order) => (
                                 <tr key={order._id}>
                                    <td>
                                       <img
                                          className="img-fluid"
                                          src={order.image}
                                          alt=""
                                       />
                                    </td>
                                    <td>
                                       <p>{order.menu}</p>
                                    </td>
                                    <td>
                                       <p>${order.price}</p>
                                    </td>
                                    <td>
                                       <p>{order.quantity}</p>
                                    </td>
                                    <td>
                                       <p>${order.price * order.quantity}</p>
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
                              {cartOrders.length === 0 && (
                                 <tr>
                                    <td colSpan="6">
                                       <p>Your cart is empty!</p>
                                    </td>
                                 </tr>
                              )}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col">
                     <div className="billing-box">
                        <form
                           onSubmit={handleSubmit(onSubmit)}
                           className="mb-0 row"
                        >
                           <div className="col-md-8 pe-md-5">
                              <h4>BILLING DETAILS</h4>
                              <div className="row">
                                 <div className="form-group col-12">
                                    <input
                                       className="form-control"
                                       defaultValue={user?.displayName}
                                       {...register("name", { required: true })}
                                       type="text"
                                       placeholder="Name"
                                    />
                                    {errors.name && (
                                       <span className="error">
                                          name is required
                                       </span>
                                    )}
                                 </div>
                                 <div className="form-group col-12">
                                    <input
                                       className="form-control"
                                       defaultValue={user?.email}
                                       {...register("email", {
                                          required: true,
                                       })}
                                       type="email"
                                       placeholder="Email"
                                    />
                                    {errors.email && (
                                       <span className="error">
                                          email is required
                                       </span>
                                    )}
                                 </div>
                                 <div className="form-group col-12">
                                    <input
                                       className="form-control"
                                       defaultValue=""
                                       {...register("phone", {
                                          required: true,
                                       })}
                                       type="number"
                                       placeholder="Phone"
                                    />
                                    {errors.phone && (
                                       <span className="error">
                                          phone is required
                                       </span>
                                    )}
                                 </div>
                                 <div className="form-group col-12">
                                    <input
                                       className="form-control"
                                       defaultValue=""
                                       {...register("country", {
                                          required: true,
                                       })}
                                       type="text"
                                       placeholder="Country"
                                    />
                                    {errors.country && (
                                       <span className="error">
                                          country is required
                                       </span>
                                    )}
                                 </div>
                                 <div className="form-group col-12">
                                    <input
                                       className="form-control"
                                       defaultValue=""
                                       {...register("city", { required: true })}
                                       type="text"
                                       placeholder="City"
                                    />
                                    {errors.city && (
                                       <span className="error">
                                          city is required
                                       </span>
                                    )}
                                 </div>
                                 <div className="form-group col-12">
                                    <input
                                       className="form-control"
                                       defaultValue=""
                                       {...register("zipcode", {
                                          required: true,
                                       })}
                                       type="number"
                                       placeholder="Zip Code"
                                    />
                                    {errors.zipcode && (
                                       <span className="error">
                                          zipcode is required
                                       </span>
                                    )}
                                 </div>
                                 <div className="form-group col-12 mb-0">
                                    <input
                                       className="form-control"
                                       defaultValue=""
                                       {...register("address", {
                                          required: true,
                                       })}
                                       type="text"
                                       placeholder="Street address"
                                    />
                                    {errors.address && (
                                       <span className="error">
                                          address is required
                                       </span>
                                    )}
                                 </div>
                              </div>
                           </div>
                           <div className="col-md-4 ps-md-5 mt-5 mt-md-0">
                              <div className="order-box">
                                 <h4>your order</h4>
                                 <div className="list">
                                    <p>
                                       Total Item <span> {totalQuantity}</span>
                                    </p>
                                    <p>
                                       Item(s) Subtotal{" "}
                                       <span> ${subTotal}</span>
                                    </p>
                                    <p>
                                       Tax(7%) <span> ${tax}</span>
                                    </p>
                                    <p>
                                       Amount Payable{" "}
                                       <span> ${subTotal + tax}</span>
                                    </p>
                                 </div>
                                 <button type="submit" className="btn-black">
                                    Place order
                                 </button>
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Cart;
