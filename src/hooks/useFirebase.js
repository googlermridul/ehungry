import { useEffect, useState } from "react";
import initializeAuthentication from "../firebase/firebaseInitialize";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

initializeAuthentication()

const useFirebase = () => {
   const [user, setUser] = useState({})
   const [error, setError] = useState('')
   const [isLoading, setIsLoading] = useState(true);
   const auth = getAuth();
   const googleProvider = new GoogleAuthProvider();


   // sign in with google
   const handleGoogleSignIn = (location, history) => {
      setIsLoading(true)
      signInWithPopup(auth, googleProvider)
      .then(res => {
         setUser(res.user)
         console.log(res.user);
         const destination = location?.state?.from || '/';
         history.replace(destination);
      })
      .finally(() => setIsLoading(false))
      .catch(err => setError(err.message));
   }


   // create user with email and password
   const handleCreateUser = (data, location, history) => {
      setIsLoading(true)
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
         const destination = location?.state?.from || '/';
         history.replace(destination);
      })
      .finally(() => setIsLoading(false))
      .catch(err => {
         setError(err.message)
         console.log(err.message);
      });
   }

   // create user with email and password
   const handleLoginUser = (data, location, history) => {
      setIsLoading(true)
      signInWithEmailAndPassword(auth, data.email, data.password)
      .then(res => {
         setUser(res.user)
         setError('')
         const destination = location?.state?.from || '/';
         history.replace(destination);
      })
      .finally(() => setIsLoading(false))
      .catch(err => {
         setError(err.message)
         console.log(err.message);
      });
   }

   
   // log out
   const logOut = () => {
      setIsLoading(true)
      signOut(auth)
      .then(() => {
         setUser({})
         console.log("logout successfully");
      })
      .finally(() => setIsLoading(false))
      .catch(err => setError(err.message));
   }

   
   // user state change
   useEffect(() => {
      onAuthStateChanged(auth, (user) => {
         if (user) {
            setUser(user)
         }
         else {
            setUser({})
         }
         setIsLoading(false)
      });
   }, [auth])
   

   return { user, setUser, error, handleGoogleSignIn, logOut, handleCreateUser, handleLoginUser, isLoading }
}

export default useFirebase;