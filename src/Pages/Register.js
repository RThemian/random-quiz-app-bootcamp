import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, ColRef, Database } from "../Context/firebase";

//enable registration using auth

const Register = () => {
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [user, setUser] = useState({});

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setRegisterEmail("");
      setRegisterPassword("");
      console.log(user);
    } catch (error) {
      //invalid email
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Register YOUR EMAIL</h1>
      <div>
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
        <button onClick={register}>Create User</button>
      </div>
      {user.email && <h2> New user created: {user.email}</h2>}
    </div>
  );
};

export default Register;
