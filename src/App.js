
import './App.scss';
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StartScreen from './Pages/StartScreen';
import React, {useState} from 'react';
import Quiz from './Pages/Quiz';
import EndScreen from './Pages/EndScreen';
import ErrorPage from './Pages/ErrorPage';






function App() {

  const [score, setScore] = useState(0);
 

  


  return (
    <Router>
      <nav >
      <ol>
        <div className = "navbar navbar-default">

        
        <div className = "container-fluid">
          <div className = "navbar-header" >
          
            
              <Link to= '/'>Home</Link>
            
              {"    "}
              {"    "}
           
               <Link to='/endscreen'>EndScreen</Link>
             
         
        </div>
        </div>
        </div>

      </ol>
      </nav>
    
      {/*what's above the routes will stay the same in all pages*/}
     <Routes>
       <Route path ='/' element ={<StartScreen />} />

      
       <Route path ='/quiz' element ={<Quiz score = {score} setScore = {setScore} />} />
       <Route path ='/endscreen' element ={<EndScreen score = {score} setScore = {setScore} />} />
     

       <Route path ='*' element ={<ErrorPage />} />
     </Routes>
     <div>
      <a href = 'https://www.britannica.com/dictionary/integrity' target = "_blank" rel="noreferrer"> <h3>HEY YOU! Yeah, you! Don't google anything!</h3></a>
       </div>
    </Router>
  )
}

export default App;
