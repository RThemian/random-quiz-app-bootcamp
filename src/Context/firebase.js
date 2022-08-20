import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

//need to replace with environment variables before uploading to github

const firebaseConfig = {
    apiKey: "AIzaSyCfhbEcdv7q6k3rSbIUn_it2_yfy3tBAAQ",
    authDomain: "triviarandomapp.firebaseapp.com",
    projectId: "triviarandomapp",
    storageBucket: "triviarandomapp.appspot.com",
    messagingSenderId: "560167259113",
    appId: "1:560167259113:web:cce1d8a9608dc11e0b9978",
    measurementId: "G-S444D9LWLB"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);


  export const auth = getAuth(app);