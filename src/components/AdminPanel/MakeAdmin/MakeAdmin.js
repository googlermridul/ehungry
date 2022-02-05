import React from "react";
import { useForm } from "react-hook-form";
import "./MakeAdmin.scss";

const MakeAdmin = () => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const onSubmit = (data) => {
      fetch(`https://gentle-gorge-16507.herokuapp.com/addUser/admin`, {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(data),
      })
         .then((res) => res.json())
         .then((result) => {
            if (result.modifiedCount) {
               alert("Admin added successfully");
               reset();
            }
         });
   };

   return (
      <div className="make-admin">
         <div className="container">
            <div className="row">
               <div className="col">
                  <div className="form-box">
                     <h4>make admin</h4>
                     <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mb-0 text-start"
                     >
                        <div className="row">
                           <div className="form-group col-12">
                              <input
                                 className="form-control"
                                 defaultValue=""
                                 {...register("email", { required: true })}
                                 type="text"
                                 placeholder="Email"
                              />
                              {errors.email && (
                                 <span className="error">
                                    email is required
                                 </span>
                              )}
                           </div>
                        </div>
                        <button type="submit" className="btn-black">
                           Submit
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default MakeAdmin;
