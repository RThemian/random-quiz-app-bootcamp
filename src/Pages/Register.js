import React, { useState } from "react";
import { useAuth } from "../Context/Authentication";
import { useNavigate } from "react-router-dom";

//enable registration using auth

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
      <form onSubmit={handleRegister}>
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
      </form>
      {/*
      {user.email && <h2> New user created: {user.email}</h2>}
  */}
    </div>
  );
};

export default Register;
