import React from 'react';
import {useNavigate} from "react-router-dom";

const EndScreen = ({
  score,
  setScore
}) => {

  let navigate = useNavigate();

  const handleHomeClick = () => {
    setScore(0);
     let path = '/';
     navigate(path);

  }
  return (
    <>
    <div>This is the EndScreen, you got {score} correct!</div>
    <h2>Want to play again?</h2>
    <button onClick = {handleHomeClick} >Home</button>
   



    </>

  )
}
export default EndScreen;
