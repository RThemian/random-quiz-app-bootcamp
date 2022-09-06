import { useContext } from "react";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import {
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { DB, AUTH } from "./Firebase";

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

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("Auth context must be use inside AuthProvider");

  return context;
};

function AuthProvider({ children }) {
  const [profile, setProfile] = useState({
    email: "",
    displayName: "",
  });

  useEffect(
    () =>
      onAuthStateChanged(AUTH, async (user) => {
        //need to change "users" to my database collection
        console.log("USER1", user);
        if (user) {
          const userRef = doc(DB, "users", user.uid);

          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            console.log(
              "DOCSNAP",
              docSnap.data().email,
              docSnap.data().displayName
            );
            setProfile({
              email: docSnap.data().email,
              displayName: docSnap.data().displayName,
            });
            console.log("PROFILE", profile);
          }

          // setProfile(user);
          //return navigation("/quiz");
        } else {
          setProfile(null);
          // return navigation("/home");
        }
      }),
    []
  );

  const login = (email, password) =>
    signInWithEmailAndPassword(AUTH, email, password);

  //need to add new inputs on the register page to first params

  const register = (email, password, firstName, lastName) =>
    createUserWithEmailAndPassword(AUTH, email, password).then(async (res) => {
      const userRef = doc(collection(DB, "users"), res.user?.uid);
      await setDoc(userRef, {
        uid: res.user?.uid,
        email: email,
        displayName: `${firstName} ${lastName}`,
      });
      //must return true because there's a conditional being used in the register component
      // that can't be evaluated until true is returned
      return true;
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

export { AuthContext, AuthProvider, AUTH, useAuth };
