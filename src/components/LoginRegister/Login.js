import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import googleIcon from '../../images/google1.png'
import PageBanner from '../PageBanner/PageBanner';
import './LoginRegister.scss'
import useAuth from '../../hooks/useAuth';

const Login = () => {
   const { handleGoogleSignIn, handleLoginUser, error } = useAuth(); 
   const { register, handleSubmit, reset, formState: { errors } } = useForm();
   
   const onSubmit = data => {
      handleLoginUser(data);
      console.log(data);
      // reset();
   };

   return (
      <>
         <PageBanner>
            <span>login here</span>
         </PageBanner>
         <div className="login-section">
            <div className="container">
               <div className="row">
                  <div className="col">
                     <div className="form-box">
                        <h3>login to ehungry</h3>
                        <button onClick={handleGoogleSignIn} className="btn-black google-btn shadow-sm"><img src={googleIcon} alt="" /> Sign in With Google</button>
                        <div className="divider">
                           <span>or Sign in with Email</span>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="mb-0 text-start">
                           <div className="row">
                              <div className="form-group col-12">
                                 <input className="form-control" defaultValue="" {...register("email", { required: true })} placeholder="Email" />
                                 {errors.email && <span className="error">email is required</span>}
                              </div>
                              <div className="form-group col-12">
                                 <input className="form-control" defaultValue="" {...register("password", { required: true })} placeholder="password" />
                                 {errors.password && <span className="error">password is required</span>}
                              </div>
                           </div>
                           <button type="submit" className="btn-black">login</button>
                        </form>
                        <div className="">
                           <p className="firebase-error">{error}</p>
                           <p className="switcher">New user? <Link className="link" to="/register">Register</Link></p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Login;