import React from "react";
//import Button from "mui-button";
import { Link } from "react-router-dom";

function StartScreen() {
  return (
    <>
      <div>
        QUIZ MASTER!,{" "}
        <span style={{ color: "red" }}>want to play a game?</span>
      </div>

      <label>PRESS THE BUTTON</label>
      <br />
      <button className = "btn">
      <Link to="/quiz"><h1>Quiz</h1></Link>
    </button>
    </>
  );
}

export default StartScreen;
