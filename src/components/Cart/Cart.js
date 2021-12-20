import React from 'react';
import PageBanner from '../PageBanner/PageBanner';
import food from '../../images/menu/menu-4.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './Cart.scss'
import { useForm } from 'react-hook-form';

const Cart = () => {
   const { register, handleSubmit, formState: { errors } } = useForm();
   const onSubmit = data => {
      console.log(data);
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
                                 <th scope="col">Product</th>
                                 <th scope="col">Product Name</th>
                                 <th scope="col">Price</th>
                                 <th scope="col">Quantity</th>
                                 <th scope="col">Sub Total</th>
                                 <th scope="col">Action</th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td>
                                    <img className="img-fluid" src={food} alt="" />
                                 </td>
                                 <td><p>margherita pizza</p></td>
                                 <td><p>$15.50</p></td>
                                 <td><p>2</p></td>
                                 <td><p>$15.50</p></td>
                                 <td>
                                    <p><button className="btn-black delete">
                                       <FontAwesomeIcon icon={faTrashAlt} className="fa-icon" />
                                    </button></p>
                                 </td>
                              </tr>
                              <tr>
                                 <td>
                                    <img className="img-fluid" src={food} alt="" />
                                 </td>
                                 <td><p>margherita pizza</p></td>
                                 <td><p>$15.50</p></td>
                                 <td><p>2</p></td>
                                 <td><p>$15.50</p></td>
                                 <td>
                                    <p><button className="btn-black delete">
                                       <FontAwesomeIcon icon={faTrashAlt} className="fa-icon" />
                                    </button></p>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col">
                     <div className="billing-box">
                        <form onSubmit={handleSubmit(onSubmit)} className="mb-0 row">
                           <div className="col-md-8 pe-md-5">
                              <h4>BILLING DETAILS</h4>
                              <div className="row">
                                 <div className="form-group col-12">
                                    <input className="form-control" defaultValue="" {...register("name", { required: true })} placeholder="Name" />
                                    {errors.name && <span className="error">name is required</span>}
                                 </div>
                                 <div className="form-group col-12">
                                    <input className="form-control" defaultValue="" {...register("email", { required: true })} placeholder="Email" />
                                    {errors.email && <span className="error">email is required</span>}
                                 </div>
                                 <div className="form-group col-12">
                                    <input className="form-control" defaultValue="" {...register("phone", { required: true })} placeholder="Phone" />
                                    {errors.phone && <span className="error">phone is required</span>}
                                 </div>
                                 <div className="form-group col-12">
                                    <input className="form-control" defaultValue="" {...register("country", { required: true })} placeholder="Country" />
                                    {errors.country && <span className="error">country is required</span>}
                                 </div>
                                 <div className="form-group col-12">
                                    <input className="form-control" defaultValue="" {...register("city", { required: true })} placeholder="City" />
                                    {errors.city && <span className="error">city is required</span>}
                                 </div>
                                 <div className="form-group col-12">
                                    <input className="form-control" defaultValue="" {...register("zipcode", { required: true })} placeholder="Zip Code" />
                                    {errors.zipcode && <span className="error">zipcode is required</span>}
                                 </div>
                                 <div className="form-group col-12 mb-0">
                                    <input className="form-control" defaultValue="" {...register("address", { required: true })} placeholder="Street address" />
                                    {errors.address && <span className="error">address is required</span>}
                                 </div>
                              </div>
                           </div>
                           <div className="col-md-4 ps-md-5 mt-5 mt-md-0">
                              <div className="order-box">
                                 <h4>your order</h4>
                                 <div className="list">
                                    <p>Total Item <span> 4</span></p>
                                    <p>Item(s) Subtotal <span>	$71.00</span></p>
                                    <p>Shipping <span> $0</span></p>
                                    <p>Amount Payable <span> $71.00</span></p>
                                 </div>
                                 <button type="submit" className="btn-black">Place order</button>
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