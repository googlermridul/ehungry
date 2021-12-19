import { useState } from "react";
import initializeAuthentication from "../firebase/firebaseInitialize";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";

initializeAuthentication()

const useFirebase = () => {
   const [user, setUser] = useState({})
   const [error, setError] = useState('')
   const auth = getAuth();
   const googleProvider = new GoogleAuthProvider();


   // sign in with google
   const handleGoogleSignIn = () => {
      signInWithPopup(auth, googleProvider)
      .then(res => {
         setUser(res.user)
         console.log(res.user);
      })
      .catch(err => setError(err.message));
   }

   // log out
   const logOut = () => {
      signOut(auth)
      .then(() => {
         setUser({})
         console.log("logout successfully");
      })
      .catch(err => setError(err.message));
   }


   // create user with email and password
   const handleCreateUser = (data) => {
      createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(res => {
         setUser(res.user)
         updateProfile(auth.currentUser, {
            displayName: data.displayName
         })
         .then(() => {
            console.log("displayName updated successfully");
         })
         .catch(err => {
            console.log(err);
         });
         setError('')
      })
      .catch(err => {
         setError(err.message)
         console.log(err.message);
      });
   }

   // create user with email and password
   const handleLoginUser = (data) => {
      signInWithEmailAndPassword(auth, data.email, data.password)
      .then(res => {
         setUser(res.user)
         setError('')
      })
      .catch(err => {
         setError(err.message)
         console.log(err.message);
      });
   }
   

   return { user, setUser, error, handleGoogleSignIn, logOut, handleCreateUser, handleLoginUser }
}

export default useFirebase;