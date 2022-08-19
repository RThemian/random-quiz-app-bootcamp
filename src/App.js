
import './App.scss';
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StartScreen from './Pages/StartScreen';
import React, {useState, useEffect} from 'react';
import Quiz from './Pages/Quiz';
import EndScreen from './Pages/EndScreen';
import ErrorPage from './Pages/ErrorPage';
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from './Context/firebase';




function App() {

  const [score, setScore] = useState(0);
  const [pointsPossible, setPointsPossible] = useState(0);

  //manage states of firebase logins
  const [registerPassword, setRegisterPassword] =useState("");
  const [registerEmail, setRegisterEmail] = useState("");

  const [loginEmail, setLoginEmail] = useState("");

  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});


useEffect(() => {
  try {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
  })
  } catch (error) {
    console.log(error.message)
  }
}, [user])
/*
  try {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
  })
  } catch (error) {
    console.log(error.message)
  }
  */

  

//most firebase functions return promises, so must use try/catch or async/await to handle them 
//.then approach doesn't fit this syntax

   const register = async () => {
     try {
       const user = await createUserWithEmailAndPassword(
         auth, 
         registerEmail, 
         registerPassword
       );
       console.log(user);
     } catch (error) {
       //invalid email
       console.log(error.message)
     }
   }
 
   const login = async () => {

    try {
      const user = await signInWithEmailAndPassword(
        auth, 
        loginEmail, 
        loginPassword
      );
      console.log(user);
    } catch (error) {
      //invalid email
      console.log(error.message)
    }

   }
/*
const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error.message)
  }
  
}  

*/
  return (
    <Router>
      <div>
        <h3>Register User</h3>
        <input placeholder='Email...'  onChange = {(event => setRegisterEmail(event.target.value))} />
        <input placeholder='Password...' onChange = {(event => setRegisterPassword(event.target.value))} />
        <button onClick = {register}>Create User</button>
      </div>
      <div>
        <h3>Login</h3>
        <input placeholder='Email...' onChange = {(event => setLoginEmail(event.target.value))}/>
        <input placeholder='Password...' onChange = {(event => setLoginPassword(event.target.value))}/>
        <button onClick = {login} >Login</button>
      </div>
      <div>
        <h4>User Logged In:</h4>
        
        <button >Sign Out</button>
        {user?.email}
      </div>
      <nav className = "nav flex-center" >
      <ol>
        <div className = "navbar navbar-default container">

        
        <div className = "container-fluid">
          <div className = "navbar-header" >
          
            
              <Link  to= '/'>Home</Link>
            
              {"    "}
              {"    "}
           
               <Link  to='/endscreen'>EndScreen</Link>
             
         
        </div>
        </div>
        </div>

      </ol>
      </nav>
    
      {/*what's above the routes will stay the same in all pages*/}
     <Routes>
       <Route path ='/' element ={<StartScreen />} />

      
       <Route path ='/quiz' element ={<Quiz 
                  score = {score} 
                  setScore = {setScore} 
                  pointsPossible = {pointsPossible} 
                  setPointsPossible = {setPointsPossible}
                  />} />
       <Route path ='/endscreen' element ={<EndScreen 
                  score = {score} 
                  setScore = {setScore}
                  pointsPossible = {pointsPossible} 
                  setPointsPossible = {setPointsPossible}
                  />} />
     

       <Route path ='*' element ={<ErrorPage />} />
     </Routes>
     <div>
      <a href = 'https://www.britannica.com/dictionary/integrity' target = "_blank" rel="noreferrer"> <h6>HEY YOU! Yeah, you! Don't google anything!</h6></a>
       </div>
    </Router>
  )
}

export default App;
