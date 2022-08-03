import React, {useState} from 'react'
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Quiz from './Quiz';


function StartScreen() {

  


  return (
    <>
    <div>This is the StartScreen, <span style={{color:'red'}}>want to play a game?</span></div>
        
          <label>PRESS THE BUTTON </label>
        <Link to='/quiz'>Quiz</Link>

        
        
  </>
)
}
  

export default StartScreen