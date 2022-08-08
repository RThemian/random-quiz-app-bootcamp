import React from "react";
import { Link } from "react-router-dom";

function StartScreen() {
  return (
    <>
      <div>
        This is the StartScreen,{" "}
        <span style={{ color: "red" }}>want to play a game?</span>
      </div>

      <label>PRESS THE BUTTON</label>
      <br />
      <Link to="/quiz"><h1>Quiz</h1></Link>
    </>
  );
}

export default StartScreen;
