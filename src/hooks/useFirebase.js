import { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import initializeAuthentication from "../firebase/firebaseInitialize";
import { useEffect } from "react";

initializeAuthentication()

const useFirebase = () => {
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [user, setUser] = useState({})
   const [error, setError] = useState('')
   const [isLoading, setIsLoading] = useState(true)
   const [admin, setAdmin] = useState(null);
   const auth = getAuth();
   const googleProvider = new GoogleAuthProvider();

   // get email, password and name
   const getEmail = e => setEmail(e.target.value);
   const getPassword = e => setPassword(e.target.value);
   const getName = e => setName(e.target.value);

   // create account with email and password
   const signUpWithEmail = () => {
      if (password.length < 6) {
         setError('Password should be at least 6 characters')
      }
      return createUserWithEmailAndPassword(auth, email, password)
   }

   // sign in with email and password
   const signInWithEmail = () => {
      return signInWithEmailAndPassword(auth, email, password)
   }

   // sign in with google
   const signInWithGoogle = () => {
      return signInWithPopup(auth, googleProvider)
   }

   // update user name to firebase
   const updateUserName = () => {
      return updateProfile(auth.currentUser, {
         displayName: name
      })
   }

   useEffect(() => {
      fetch(`https://immense-hamlet-59638.herokuapp.com/users/${user.email}`)
      .then(res => res.json())
      .then(data => setAdmin(data.admin))
   }, [user.email])

   // sign out
   const logOut = () => {
      setIsLoading(true)
      signOut(auth)
      .then(() => {
         setUser({})
      })
      .finally(() => setIsLoading(false))
      .catch(err => {
         setError(err.message);
      });
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

   return {getName, user, setUser, admin, error, setError, isLoading, setIsLoading, getEmail, getPassword, signInWithGoogle, signInWithEmail, signUpWithEmail, logOut, updateUserName}
}

export default useFirebase;      