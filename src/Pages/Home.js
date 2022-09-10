import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, signInWithEmailAndPassword } from "firebase/auth";
import { AUTH } from "../Context/firebase";
import { useAuth } from "../Context/Authentication";

const Home = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { user } = useAuth();

  const login = async (AUTH, loginEmail, loginPassword) => {
    try {
      const loggedInUser = await signInWithEmailAndPassword(
        AUTH,
        loginEmail,
        loginPassword
      );
      console.log("loginEmail: ", loginEmail);
      console.log("loginPassword: ", loginPassword);
      console.log("FUCKING LOOOK AT ITTTTTTT vvvvv");
      console.log("loggedInUser.user:", loggedInUser.user);
      setLoginEmail("");
      setLoginPassword("");
    } catch (error) {
      //invalid email
      console.log(error.message);
    }
  };

  const handleLogin = async (AUTH, loginEmail, loginPassword) => {
    navigate("/quiz");
    const response = await login(AUTH, loginEmail, loginPassword);
    console.log("response", response);
    if (response) {
      navigate("/quiz");
    }
  };

  const logout = async () => {
    try {
      await signOut(AUTH);
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
        <form onSubmit={handleLogin}>
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
          <button onClick={handleLogin}>Login</button>
        </form>
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
        {user !== null ? (
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
