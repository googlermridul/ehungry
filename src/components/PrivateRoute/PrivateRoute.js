import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({children, ...rest}) => {
   const { user, isLoading } = useAuth()
   if (isLoading) {
      return (
         <div className="text-center home-pre-loader">
            <div className="spinner-border" role="status"></div>
         </div>
      )
   }
   return (
      <Route
         {...rest}
         render={({ location }) =>
            user.email ? (
               children
            ) : (
               <Redirect
                  to={{
                     pathname: "/login",
                     state: { from: location }
                  }}
               />
            )
         }
      />
   );
};

export default PrivateRoute;