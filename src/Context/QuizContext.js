import PropTypes from "prop-types";
import { createContext, useEffect, useReducer, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useNavigate } from "react-router-dom";
//import { FIREBASE_API } from "../config";

// ----------------------------------------------------------------------

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

const AUTH = getAuth(firebaseApp);

const DB = getFirestore(firebaseApp);

const storage = getStorage(firebaseApp);

// with the 3 functions login, register, logout we use use AuthContext
const AuthContext = createContext({
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

// ----------------------------------------------------------------------
// a node is the same as an element
//propTypes declaring the type of prop that is going to come with the component
//expect the children prop and that will be stored

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const navigation = useNavigate();

  useEffect(
    () =>
      onAuthStateChanged(AUTH, async (user) => {
        //need to change "users" to my database collection

        if (user) {
          const userRef = doc(DB, "users", user.uid);

          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            setProfile(docSnap.data());
          }

          // setProfile(user);
          return navigation("/play");
        } else {
          setProfile(null);
          return navigation("/home");
        }
      }),
    []
  );

  const login = (email, password) =>
    signInWithEmailAndPassword(AUTH, email, password);

  //need to add new inputs on the register page to first params

  const register = (email, password, firstName, lastName, otherParams) =>
    createUserWithEmailAndPassword(AUTH, email, password).then(async (res) => {
      const userRef = doc(collection(DB, "users"), res.user?.uid);
      await setDoc(userRef, {
        uid: res.user?.uid,
        email,
        displayName: `${firstName} ${lastName}`,
      });
    });

  const logout = () => {
    setProfile((prev) => (prev = null));
    signOut(AUTH);
  };

  return (
    <AuthContext.Provider
      value={{
        user: {
          id: profile?.user?.uid,
          email: profile?.user?.email,
          displayName: profile?.user?.displayName || profile?.displayName,
        },
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider, DB, storage, AUTH };
