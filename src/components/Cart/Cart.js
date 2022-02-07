import React, { useEffect, useState } from "react";
import PageBanner from "../PageBanner/PageBanner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import useCartOrders from "../../hooks/useCartOrders";
import "./Cart.scss";
import Shipping from "../Shipping/Shipping";

const Cart = () => {
   const [cartOrders, setCartOrders] = useCartOrders();
   const [totalQuantity, setTotalQuantity] = useState(0);
   const [subTotal, setSubTotal] = useState(0);
   const [tax, setTax] = useState(0);

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
               <Shipping
                  cartOrders={cartOrders}
                  setCartOrders={setCartOrders}
                  totalQuantity={totalQuantity}
                  setTotalQuantity={setTotalQuantity}
                  subTotal={subTotal}
                  setSubTotal={setSubTotal}
                  tax={tax}
                  setTax={setTax}
                  handleDeleteAll={handleDeleteAll}
               ></Shipping>
            </div>
         </div>
      </>
   );
};

export default Cart;
