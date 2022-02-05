import React, { useState } from "react";
import { useForm } from "react-hook-form";
import phone from "../../images/phone-call.png";
import "./Reservation.scss";

const Reservation = () => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();
   const [error, setError] = useState("");

   const onSubmit = (data) => {
      data.status = "Pending";

      fetch(`https://gentle-gorge-16507.herokuapp.com/addBooking`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(data),
      })
         .then((res) => res.json())
         .then((result) => {
            if (result.insertedId) {
               setError("Table booked successfully");
               reset();
            } else {
               setError("Something went wrong! Try again");
            }
         });
      console.log(data);
   };

   return (
      <div className="reservation-section">
         <div className="container">
            <div className="row align-items-center">
               <div className="col-md-6 pe-md-5">
                  <div className="header-text">
                     <span>Reserve your table</span>
                     <h1>BOOK ONLINE</h1>
                     <p>
                        Ehungry is a restaurant site. With this you can order
                        the food of your choice online. Ehungry is a restaurant
                        site. With this you can order the food of your choice
                        online. Ehungry is a restaurant site. With this you can
                        order the food of your choice online.
                     </p>
                     <h3>
                        <img className="img-fluid" src={phone} alt="" />
                        +91 123 456 789 0
                     </h3>
                  </div>
               </div>
               <div className="col-md-6 ps-md-5">
                  <div className="form-box">
                     <h3>Book a table</h3>
                     <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mb-0 text-start"
                     >
                        <div className="row">
                           <div className="form-group col-12">
                              <input
                                 className="form-control"
                                 defaultValue=""
                                 {...register("name", { required: true })}
                                 placeholder="Name"
                                 type="text"
                              />
                              {errors.name && (
                                 <span className="error">name is required</span>
                              )}
                           </div>
                           <div className="form-group col-12">
                              <input
                                 className="form-control"
                                 defaultValue=""
                                 {...register("email", { required: true })}
                                 placeholder="Email"
                                 type="email"
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
                                 {...register("phone", { required: true })}
                                 placeholder="Phone"
                                 type="number"
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
                                 {...register("person", { required: true })}
                                 placeholder="How many person?"
                                 type="number"
                              />
                              {errors.person && (
                                 <span className="error">
                                    person is required
                                 </span>
                              )}
                           </div>
                           <div className="form-group col-12">
                              <input
                                 className="form-control date"
                                 defaultValue=""
                                 {...register("date", { required: true })}
                                 placeholder="Date"
                                 type="date"
                              />
                              {errors.date && (
                                 <span className="error">date is required</span>
                              )}
                           </div>
                           <div className="col-12">
                              {error && (
                                 <p className="success-alert">{error}</p>
                              )}
                           </div>
                        </div>
                        <button type="submit" className="btn-black">
                           Book Now
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Reservation;
