import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import googleIcon from '../../images/google1.png'
import PageBanner from '../PageBanner/PageBanner';
import './LoginRegister.scss'

const Register = () => {
   const { register, handleSubmit, reset, formState: { errors } } = useForm();
   const onSubmit = data => {
      console.log(data);
   };

   const handleGoogleSignIn = () => {}

   return (
      <>
         <PageBanner>
            <span>register here</span>
         </PageBanner>
         <div className="login-section">
            <div className="container">
               <div className="row">
                  <div className="col">
                     <div className="form-box">
                        <h3>signin to ehungry</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="mb-0 text-start">
                           <div className="row">
                              <div className="form-group col-12">
                                 <input className="form-control shadow-" defaultValue="" {...register("name", { required: true })} placeholder="Name" />
                                 {errors.name && <span className="error">name is required</span>}
                              </div>
                              <div className="form-group col-12">
                                 <input className="form-control" defaultValue="" {...register("email", { required: true })} placeholder="Email" />
                                 {errors.email && <span className="error">email is required</span>}
                              </div>
                              <div className="form-group col-12">
                                 <input className="form-control" defaultValue="" {...register("password", { required: true })} placeholder="password" />
                                 {errors.password && <span className="error">password is required</span>}
                              </div>
                           </div>
                           <button type="submit" className="btn-orange">login</button>
                        </form>
                        <hr />
                        <div className="text-center">
                           {/* <p className="firebase-error">{error}</p> */}
                           <button onClick={handleGoogleSignIn} className="btn-black google-btn shadow-sm"><img src={googleIcon} alt="" /> Login With Google</button>
                           <p className="switcher">Already an user? <Link className="link" to="/login">Login</Link></p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Register;