
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StartScreen from './Pages/StartScreen';

import Quiz from './Pages/Quiz';
import EndScreen from './Pages/EndScreen';
import ErrorPage from './Pages/ErrorPage';





function App() {
  return (
    <Router>
      <nav>
      <ol>
        <div>
        <Link to= '/'>Home</Link>
        </div>
        <div>
        <Link to='/quiz'>Quiz</Link>
        </div>
        <div>
        <Link to='/endscreen'>EndScreen</Link>
        </div>
      </ol>
      </nav>
    
      {/*what's above the routes will stay the same in all pages*/}
     <Routes>
       <Route path ='/' element ={<StartScreen />} />
       <Route path ='/quiz' element ={<Quiz />} />
       <Route path ='/endscreen' element ={<EndScreen />} />
       <Route path ='*' element ={<ErrorPage />} />
     </Routes>
    </Router>
  )
}

export default App;
