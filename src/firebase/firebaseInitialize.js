import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";

const initializeAuthentication = () => {
   initializeApp(firebaseConfig);
}

export default initializeAuthentication;