import React, { useState, useEffect } from "react";
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

const Home = () => {
  const [loginEmail, setLoginEmail] = useState("");

  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      setLoginEmail("");
      setLoginPassword("");
    } catch (error) {
      //invalid email
      console.log(error.message);
    }
  };

  useEffect(() => {
    try {
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [user]);

  //signOut function is slowing down site for some reason

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  let navigate = useNavigate();

  const handleRegisterEmail = () => {
    navigate("/register");
  };

  //if user exists, then navigate to quiz and start game

  //when logged in button to go to quiz or see old scores now that user is logged in

  function startQuiz() {
    navigate("/quiz");
  }

  //link successful login && route to logged in and see scores

  return (
    <>
      <div>
        <h1>QUIZ APP</h1>
        <h3>By Tomas Paul Cservenak</h3>
      </div>
      <div>
        <h3>Login</h3>
        <input
          placeholder="Email..."
          value={loginEmail}
          onChange={(event) => setLoginEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password..."
          value={loginPassword}
          onChange={(event) => setLoginPassword(event.target.value)}
        />
        <button onClick={login}>Login</button>

        <h2>
          {" "}
          Welcome {user?.displayName} {user?.email}
        </h2>
        {user ? (
          <>
            <button onClick={logout}>Sign out</button>{" "}
            <button onClick={startQuiz}>Start Quiz</button>{" "}
            <button>See Past Scores</button>
          </>
        ) : (
          ""
        )}

        {/* REMOVE REGISTER BUTTON when logged in */}
        {!user ? (
          <h3>
            If not registered, click{" "}
            <button onClick={handleRegisterEmail}>here</button>
          </h3>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Home;
