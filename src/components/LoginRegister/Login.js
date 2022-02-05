import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import googleIcon from "../../images/google1.png";
import PageBanner from "../PageBanner/PageBanner";
import "./LoginRegister.scss";
import useAuth from "../../hooks/useAuth";

const Login = () => {
   const { user, handleGoogleSignIn, handleLoginUser, error, isLoading } =
      useAuth();
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const location = useLocation();
   const history = useHistory();

   const onSubmit = (data) => {
      handleLoginUser(data, location, history);
      console.log(data, location, history);
      reset();
   };

   const signInWithGoogle = () => {
      handleGoogleSignIn(location, history);
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
                     {error && <p className="failure-alert">{error}</p>}
                     {user?.email && (
                        <p className="success-alert">Logged in successfully</p>
                     )}
                     <div className="form-box">
                        <h4>login to ehungry</h4>
                        <button
                           onClick={signInWithGoogle}
                           className="btn-black google-btn shadow-sm"
                        >
                           <img src={googleIcon} alt="" /> Sign in With Google
                        </button>
                        <div className="divider">
                           <span>or Sign in with Email</span>
                        </div>
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
                                    {...register("password", {
                                       required: true,
                                    })}
                                    placeholder="password"
                                    type="password"
                                 />
                                 {errors.password && (
                                    <span className="error">
                                       password is required
                                    </span>
                                 )}
                              </div>
                           </div>
                           <button type="submit" className="btn-black">
                              login
                           </button>
                        </form>
                        <p className="switcher">
                           New user?{" "}
                           <Link className="link" to="/register">
                              Register
                           </Link>
                        </p>
                     </div>
                     {isLoading && (
                        <div className="text-center pre-loader">
                           <div className="spinner-border" role="status"></div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Login;
