import { useEffect, useState } from "react";
import initializeAuthentication from "../firebase/firebaseInitialize";
import {
   getAuth,
   signInWithPopup,
   GoogleAuthProvider,
   signOut,
   createUserWithEmailAndPassword,
   updateProfile,
   signInWithEmailAndPassword,
   onAuthStateChanged,
} from "firebase/auth";

initializeAuthentication();

const useFirebase = () => {
   const [user, setUser] = useState({});
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(true);
   const [admin, setAdmin] = useState(null);
   const auth = getAuth();
   const googleProvider = new GoogleAuthProvider();

   // sign in with google
   const handleGoogleSignIn = (location, history) => {
      setIsLoading(true);
      signInWithPopup(auth, googleProvider)
         .then((res) => {
            setUser(res.user);
            const name = res.user.displayName;
            const email = res.user.email;
            saveUser(email, name, "PUT");
            const destination = location?.state?.from || "/";
            history.replace(destination);
         })
         .finally(() => setIsLoading(false))
         .catch((err) => setError(err.message));
   };

   // create user with email and password
   const handleCreateUser = (data, location, history) => {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, data.email, data.password)
         .then((res) => {
            setUser(res.user);
            saveUser(data.email, data.displayName, "POST");
            updateProfile(auth.currentUser, {
               displayName: data.displayName,
            })
               .then(() => {
                  console.log("displayName updated successfully");
               })
               .catch((err) => {
                  console.log(err);
               });
            setError("");
            const destination = location?.state?.from || "/";
            history.replace(destination);
         })
         .finally(() => setIsLoading(false))
         .catch((err) => {
            setError(err.message);
            console.log(err.message);
         });
   };

   // create user with email and password
   const handleLoginUser = (data, location, history) => {
      setIsLoading(true);
      signInWithEmailAndPassword(auth, data.email, data.password)
         .then((res) => {
            setUser(res.user);
            setError("");
            const destination = location?.state?.from || "/";
            history.replace(destination);
         })
         .finally(() => setIsLoading(false))
         .catch((err) => {
            setError(err.message);
            console.log(err.message);
         });
   };

   // log out
   const logOut = () => {
      setIsLoading(true);
      signOut(auth)
         .then(() => {
            setUser({});
            console.log("logout successfully");
         })
         .finally(() => setIsLoading(false))
         .catch((err) => setError(err.message));
   };

   // user state change
   useEffect(() => {
      onAuthStateChanged(auth, (user) => {
         if (user) {
            setUser(user);
         } else {
            setUser({});
         }
         setIsLoading(false);
      });
   }, [auth]);

   // save user to database
   const saveUser = (email, displayName, method) => {
      const user = { email, displayName };
      fetch("https://gentle-gorge-16507.herokuapp.com/addUser", {
         method: method,
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(user),
      }).then();
   };

   useEffect(() => {
      fetch(`https://gentle-gorge-16507.herokuapp.com/users/${user.email}`)
         .then((res) => res.json())
         .then((data) => setAdmin(data.admin));
   }, [user.email]);

   return {
      user,
      setUser,
      error,
      handleGoogleSignIn,
      logOut,
      handleCreateUser,
      handleLoginUser,
      isLoading,
      admin,
   };
};

export default useFirebase;
