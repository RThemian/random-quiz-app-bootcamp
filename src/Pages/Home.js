import React from "react";
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

const Home = () => {
  const [loginEmail, setLoginEmail] = useState("");

  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  const login = async () => {
    setLoginEmail("");
    setLoginPassword("");
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      //invalid email
      console.log(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  let navigate = useNavigate();

  const handleRegisterEmail = () => {
    let path = "/register";
    navigate(path);
  };

  return (
    <>
      <div>
        <h1>QUIZ APP</h1>
        <h3>By Tomas Paul Cservenak</h3>
      </div>
      <div>
        <h3>Log In if you are registered</h3>
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
        <button>Login</button>

        <h3>
          If not registered, click{" "}
          <button onClick={handleRegisterEmail}>here</button>
        </h3>
      </div>
    </>
  );
};

export default Home;
