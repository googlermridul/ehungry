import React from "react";
import { useForm } from "react-hook-form";
import "./AddMenu.scss";

const AddMenu = () => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const onSubmit = (data) => {
      // const img = data.image[0];
      // const { name, price, description } = data;
      // const formData = new FormData();

      // formData.append("name", name);
      // formData.append("price", price);
      // formData.append("image", img);
      // formData.append("description", description);

      fetch(`https://gentle-gorge-16507.herokuapp.com/addMenu`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(data),
         // body: formData,
      })
         .then((res) => res.json())
         .then((result) => {
            if (result.insertedId) {
               alert("Menu added successfully");
               reset();
            }
         });
   };

   return (
      <div className="add-menu">
         <div className="container">
            <div className="row">
               <div className="col">
                  <div className="form-box">
                     <h4>add menu</h4>
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
                                 type="text"
                                 placeholder="Menu name"
                              />
                              {errors.name && (
                                 <span className="error">name is required</span>
                              )}
                           </div>
                           <div className="form-group col-12">
                              <input
                                 className="form-control"
                                 defaultValue=""
                                 {...register("price", { required: true })}
                                 type="number"
                                 placeholder="Price"
                              />
                              {errors.price && (
                                 <span className="error">
                                    price is required
                                 </span>
                              )}
                           </div>
                           <div className="form-group col-12">
                              <input
                                 className="form-control"
                                 defaultValue=""
                                 {...register("image", { required: true })}
                                 type="text"
                                 placeholder="Image URL"
                              />
                              {errors.image && (
                                 <span className="error">
                                    image url is required
                                 </span>
                              )}
                           </div>
                           {/* <div className="form-group col-12">
                              <input
                                 className="form-control "
                                 type="file"
                                 placeholder="Image URL"
                                 accept="image/*"
                                 {...register("image", { required: true })}
                              />
                              {errors.image && (
                                 <span className="error">
                                    image is required
                                 </span>
                              )}
                           </div> */}
                           <div className="form-group col-12">
                              <textarea
                                 cols="30"
                                 rows="10"
                                 className="form-control text-area"
                                 defaultValue=""
                                 {...register("description", {
                                    required: true,
                                 })}
                                 type="text"
                                 placeholder="Description"
                              />
                              {errors.description && (
                                 <span className="error">
                                    description is required
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

export default AddMenu;
