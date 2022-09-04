import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

//need to replace with environment variables before uploading to github

const firebaseConfig = {
  apiKey: "AIzaSyCfhbEcdv7q6k3rSbIUn_it2_yfy3tBAAQ",
  authDomain: "triviarandomapp.firebaseapp.com",
  projectId: "triviarandomapp",
  storageBucket: "triviarandomapp.appspot.com",
  messagingSenderId: "560167259113",
  appId: "1:560167259113:web:cce1d8a9608dc11e0b9978",
  measurementId: "G-S444D9LWLB",
};
/*
const firebaseConfig = {


  apiKey: process.env.REACT_APP_APIKEY, 
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID, 
  measurementId: process.env.REACT_APP_MEASUREMENTID

}
  */

//console.log(process.env)

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const Database = getFirestore();
// Initialize Cloud Firestore and get a reference to the service

//initialize services

export const ColRef = collection(Database, "Scores");

//let scores = [];
getDocs(ColRef)
  .then((snapshot) => {
    console.log(snapshot.docs);
    let scores = [];
    snapshot.docs.forEach((doc) => {
      scores.push({ ...doc.data(), id: doc.id });
    });
    console.log(scores);
  })
  .catch((error) => {
    console.log(error.message);
  });

export const auth = getAuth(app);
