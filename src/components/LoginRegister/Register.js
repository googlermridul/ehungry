import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import googleIcon from '../../images/google1.png'
import PageBanner from '../PageBanner/PageBanner';
import './LoginRegister.scss'

const Register = () => {
   const { handleGoogleSignIn, handleCreateUser, error } = useAuth(); 
   const { register, handleSubmit, reset, formState: { errors } } = useForm();

   const onSubmit = data => {
      handleCreateUser(data);
      console.log(data);
      // reset();
   };


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
                        <h3>Signup to ehungry</h3>
                        <button onClick={handleGoogleSignIn} className="btn-black google-btn shadow-sm"><img src={googleIcon} alt="" /> Sign up With Google</button>
                        <div className="divider">
                           <span>or Sign up with Email</span>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="mb-0 text-start">
                           <div className="row">
                              <div className="form-group col-12">
                                 <input className="form-control" defaultValue="chumki" {...register("displayName", { required: true })} placeholder="Name" />
                                 {errors.displayName && <span className="error">name is required</span>}
                              </div>
                              <div className="form-group col-12">
                                 <input className="form-control" defaultValue="chumki@gmail.com" {...register("email", { required: true })} placeholder="Email" />
                                 {errors.email && <span className="error">email is required</span>}
                              </div>
                              <div className="form-group col-12">
                                 <input className="form-control" defaultValue="asdfasdf" {...register("password", { required: true })} placeholder="password" />
                                 {errors.password && <span className="error">password is required</span>}
                              </div>
                           </div>
                           <button type="submit" className="btn-black">login</button>
                        </form>
                        <div className="">
                           <p className="firebase-error">{error}</p>
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