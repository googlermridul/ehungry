import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const Shipping = (props) => {
   const { user } = useAuth();
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();
   const {
      cartOrders,
      setCartOrders,
      totalQuantity,
      setTotalQuantity,
      subTotal,
      setSubTotal,
      tax,
      setTax,
      handleDeleteAll,
   } = props;

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
         <div className="row">
            <div className="col">
               <div className="billing-box">
                  <form onSubmit={handleSubmit(onSubmit)} className="mb-0 row">
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
                                 <span className="error">name is required</span>
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
                                 <span className="error">city is required</span>
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
                                 Item(s) Subtotal <span> ${subTotal}</span>
                              </p>
                              <p>
                                 Tax(7%) <span> ${tax}</span>
                              </p>
                              <p>
                                 Amount Payable <span> ${subTotal + tax}</span>
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
      </>
   );
};

export default Shipping;
