import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

//need to replace with environment variables before uploading to github

/*

    const REACT_APP_APIKEY = 'AIzaSyCfhbEcdv7q6k3rSbIUn_it2_yfy3tBAAQ'
    const REACT_APP_AUTHDOMAIN = 'triviarandomapp.firebaseapp.com'
    const REACT_APP_PROJECTID = 'triviarandomapp'
    const REACT_APP_STORAGEBUCKET = 'triviarandomapp.appspot.com'
    const REACT_APP_MESSAGINGSENDERID = '560167259113'
    const REACT_APP_APPID = '1:560167259113:web:cce1d8a9608dc11e0b9978'
    const REACT_APP_MEASUREMENTID =  'G-S444D9LWLB'
    */

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
  };

  console.log(process.env)
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
console.log(process.env)

// Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);


  export const auth = getAuth(app);