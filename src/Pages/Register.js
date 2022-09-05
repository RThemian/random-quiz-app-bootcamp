import React, { useState, useContext } from "react";
//import { QuizContext } from "../Context/QuizContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import { auth, ColRef, Database } from "../Context/firebase";
import useAuth from "../Context/useAuth";
import { useNavigate } from "react-router-dom";

//enable registration using auth
/*
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
*/
const Register = () => {
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { user, setUser, register } = useAuth();

  let navigate = useNavigate();

  const handleRegister = async () => {
    const response = await register(
      registerEmail,
      registerPassword,
      firstName,
      lastName
    );
    if (response) {
      navigate("/quiz");
    }
  };

  // const register = async () => {
  //   //need to route to Home page for login after successful register

  //   try {
  //     const user = await createUserWithEmailAndPassword(
  //       auth,
  //       registerEmail,
  //       registerPassword
  //     );
  //     setRegisterEmail("");
  //     setRegisterPassword("");
  //     console.log(user);

  //     let path = "/";
  //     navigate(path);
  //   } catch (error) {
  //     //invalid email
  //     console.log(error.message);
  //   }
  // };

  return (
    <div>
      <h1>Register YOUR EMAIL</h1>

      <h3>Register User</h3>
      <input
        placeholder="Email..."
        value={registerEmail}
        onChange={(event) => setRegisterEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password..."
        value={registerPassword}
        onChange={(event) => setRegisterPassword(event.target.value)}
      />
      <div>
        <input
          placeholder="First Name"
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </div>

      <button onClick={handleRegister}>Create User</button>
      {/*
      {user.email && <h2> New user created: {user.email}</h2>}
  */}
    </div>
  );
};

export default Register;
