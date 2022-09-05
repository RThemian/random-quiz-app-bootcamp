import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Context/useAuth";

const EndScreen = ({ score, setScore, pointsPossible, setPointsPossible }) => {
  const { user } = useAuth();

  let navigate = useNavigate();

  console.log("END USER", user);

  const handleHomeClick = () => {
    setScore(0);
    let path = "/";
    navigate(path);
  };
  return (
    <>
      <div>
        <h1>
          End of quiz, {user.displayName}. You got {score} out of{" "}
          {pointsPossible} correct!
        </h1>
      </div>
      <h2>Want to play again?</h2>
      <button className="btn btn-1" onClick={handleHomeClick}>
        Home
      </button>{" "}
      <button className="btn btn-3">Save Score</button>
    </>
  );
};
export default EndScreen;
