import React, { useState } from "react";
import { Link } from "react-router-dom";

function StartScreen() {
  return (
    <>
      <div>
        This is the StartScreen,{" "}
        <span style={{ color: "red" }}>want to play a game?</span>
      </div>

      <label>PRESS THE BUTTON </label>
      <Link to="/quiz">Quiz</Link>
    </>
  );
}

export default StartScreen;
