import React from 'react';
import {useNavigate} from "react-router-dom";
import {db} from './../Context/firebase';





const EndScreen = ({
  score,
  setScore,
  pointsPossible,
  setPointsPossible
}) => {



  let navigate = useNavigate();

  const handleHomeClick = () => {
    setScore(0);
     let path = '/';
     navigate(path);

  }
  return (
    <>
    <div><h1>End of quiz, you got {score} out of {pointsPossible} correct!</h1></div>
    <h2>Want to play again?</h2>
    <button className = "btn btn-1" onClick = {handleHomeClick} >Home</button>
    <button className = "btn btn-3"  >Save Score</button>
   



    </>

  )
}
export default EndScreen;
