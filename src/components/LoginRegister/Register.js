import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import googleIcon from '../../images/google1.png'
import PageBanner from '../PageBanner/PageBanner';
import './LoginRegister.scss'

const Register = () => {
   const { user, handleGoogleSignIn, handleCreateUser, error, isLoading } = useAuth(); 
   const { register, handleSubmit, reset, formState: { errors } } = useForm();

   const location = useLocation();
   const history = useHistory();

   const onSubmit = data => {
      handleCreateUser(data, location, history);
      console.log(data, location, history);
      reset();
   };

   const signInWithGoogle = () => {
      handleGoogleSignIn(location, history)
   }

   return (
      <>
         <PageBanner>
            <span>register here</span>
         </PageBanner>
         <div className="login-section">
            <div className="container">
               <div className="row">
                  <div className="col">
                     { error && <p className="failure-alert">{error}</p> }
                     { user?.email && <p className="success-alert">Account created successfully</p> }
                     <div className="form-box">
                        <h4>Signup to ehungry</h4>
                        <button onClick={signInWithGoogle} className="btn-black google-btn shadow-sm"><img src={googleIcon} alt="" /> Sign up With Google</button>
                        <div className="divider">
                           <span>or Sign up with Email</span>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="mb-0 text-start">
                           <div className="row">
                              <div className="form-group col-12">
                                 <input className="form-control" type="name" defaultValue="" {...register("displayName", { required: true })} placeholder="Name" />
                                 {errors.displayName && <span className="error">name is required</span>}
                              </div>
                              <div className="form-group col-12">
                                 <input className="form-control" type="email" defaultValue="" {...register("email", { required: true })} placeholder="Email" />
                                 {errors.email && <span className="error">email is required</span>}
                              </div>
                              <div className="form-group col-12">
                                 <input className="form-control" type="password" defaultValue="" {...register("password", { required: true })} placeholder="password" />
                                 {errors.password && <span className="error">password is required</span>}
                              </div>
                           </div>
                           <button type="submit" className="btn-black">Register</button>
                        </form>
                        <p className="switcher">Already an user? <Link className="link" to="/login">Login</Link></p>
                     </div>
                     {
                        isLoading && 
                        <div className="text-center pre-loader">
                           <div className="spinner-border" role="status"></div>
                        </div>
                     }
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Register;



