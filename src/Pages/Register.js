import React, {useState} from 'react'


const Register = () => {

    const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");

  const [loginEmail, setLoginEmail] = useState("");

  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  return (
    <div><h1>Register YOUR EMAIL</h1></div>
  )
}

export default Register