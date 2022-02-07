import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import useMenus from "../../hooks/useMenus";
import PageBanner from "../PageBanner/PageBanner";
import useAuth from "../../hooks/useAuth";
import "./FoodDetails.scss";

const FoodDetails = () => {
   const [menus] = useMenus();
   const history = useHistory();
   const [details, setDetails] = useState({});
   const [count, setCount] = useState(1);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();
   const { menuId } = useParams();
   const { user } = useAuth();

   useEffect(() => {
      if (menus.length) {
         const matchedData = menus.find((menu) => menu._id === menuId);
         setDetails(matchedData);
      }
   }, [menus]);

   const { image, name, description, price } = details;

   const onSubmit = (data) => {
      data.image = image;
      data.menu = name;
      data.price = price;
      data.email = user.email;

      if (user.email) {
         fetch(`https://gentle-gorge-16507.herokuapp.com/addCartOrder`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
         })
            .then((res) => res.json())
            .then((result) => {
               if (result.insertedId) {
                  history.push("/cart");
                  reset();
               }
            });
      } else {
         history.push("/login");
      }
   };

   const focusInput = () => {
      document.getElementById("quantityInput").focus();
   };

   return (
      <>
         <PageBanner>
            <span>food details</span>
         </PageBanner>
         <div className="food-details">
            <div className="container">
               <div className="row">
                  <div className="col-lg-5 col-md-6 mb-5 mb-md-0">
                     <div className="img-box">
                        <img className="img-fluid" src={image} alt="" />
                     </div>
                  </div>
                  <div className="col-lg-1 d-none d-lg-block"></div>
                  <div className="col-lg-6 col-md-6">
                     <div className="info">
                        <h3 className="name">{name}</h3>
                        <h4 className="price">${price}</h4>
                        <p>{description}</p>
                     </div>
                     <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mb-0 text-start"
                     >
                        <div className="row">
                           <div className="form-group col-12">
                              <h5>Choose your platter</h5>
                              <div className="platter-box">
                                 <input
                                    type="radio"
                                    className="btn-check"
                                    id="option1"
                                    value="Medium"
                                    {...register("platter", { required: true })}
                                 />
                                 <label
                                    className="btn btn-outline-primary"
                                    htmlFor="option1"
                                 >
                                    Medium
                                 </label>
                                 <input
                                    type="radio"
                                    className="btn-check"
                                    id="option2"
                                    value="Large"
                                    {...register("platter", { required: true })}
                                 />
                                 <label
                                    className="btn btn-outline-primary"
                                    htmlFor="option2"
                                 >
                                    Large
                                 </label>
                                 <input
                                    type="radio"
                                    className="btn-check"
                                    id="option3"
                                    value="Regular"
                                    {...register("platter", { required: true })}
                                 />
                                 <label
                                    className="btn btn-outline-primary"
                                    htmlFor="option3"
                                 >
                                    Regular
                                 </label>{" "}
                                 <br />
                                 {errors.platter && (
                                    <span className="error">
                                       select your platter
                                    </span>
                                 )}
                              </div>
                           </div>
                           <div className="form-group col-12">
                              <h5>quantity</h5>
                              <div className="quantity-box input-group">
                                 <span
                                    onClick={() =>
                                       count > 1 && setCount(count - 1)
                                    }
                                    className="btn-inc-dec"
                                 >
                                    <span onClick={focusInput}>-</span>
                                 </span>
                                 <input
                                    value={count}
                                    id="quantityInput"
                                    {...register("quantity", {
                                       required: true,
                                    })}
                                 />
                                 {errors.quantity && (
                                    <span className="error">
                                       select quantity
                                    </span>
                                 )}
                                 <span
                                    onClick={() => setCount(count + 1)}
                                    className="btn-inc-dec"
                                 >
                                    <span onClick={focusInput}>+</span>
                                 </span>
                              </div>
                           </div>
                        </div>
                        <button type="submit" className="btn-black">
                           Add to cart
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default FoodDetails;
