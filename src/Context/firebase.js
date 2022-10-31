import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCfhbEcdv7q6k3rSbIUn_it2_yfy3tBAAQ",
  authDomain: "triviarandomapp.firebaseapp.com",
  projectId: "triviarandomapp",
  storageBucket: "triviarandomapp.appspot.com",
  messagingSenderId: "560167259113",
  appId: "1:560167259113:web:cce1d8a9608dc11e0b9978",
  measurementId: "G-S444D9LWLB",
};

const firebaseApp = initializeApp(firebaseConfig);

const DB = getFirestore(firebaseApp);

const storage = getStorage(firebaseApp);

const AUTH = getAuth(firebaseApp);

export { DB, storage, AUTH, firebaseApp };
