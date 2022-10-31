import "./App.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";

import React, { useState } from "react";
import Quiz from "./Pages/Quiz";
import EndScreen from "./Pages/EndScreen";
import ErrorPage from "./Pages/ErrorPage";
import { saveNewScore } from "./Context/Scores";
import Login from "./Pages/Login";

function App() {
  // this should probably move to a parent component for quiz (i.e. parent_components/Quiz.js)
  const [score, setScore] = useState(0);
  const [pointsPossible, setPointsPossible] = useState(0);
  // user SHOULD stay in App.js
  // TODO: user not currently being set when you log in. You need to do this, so that when you save a score, that score can have the correct user.uid associatated with it. Then later you can fetch all scores for a given user using that user.uid
  const [user, setUser] = useState({
    email: "",
    uid: "",
    // Currently this is not being fetched when a user logs in. Fixed that and store it here on login
    //use the uid to associate the user to the score, because it's truly unique
    display_name: "",
  });

  return (
    <Router>
      <nav className="nav flex-center">
        <ol>
          <div className="navbar navbar-default container">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link to="/">Home</Link>

                {"    "}
                {"    "}

                <Link to="/endscreen">EndScreen</Link>
              </div>
            </div>
          </div>
        </ol>
      </nav>

      {/*what's above the routes will stay the same in all pages*/}

      <Routes>
        <Route path="/" element={<Login user={user} setUser={setUser} />} />

        <Route
          path="/quiz"
          element={
            <Quiz
              score={score}
              setScore={setScore}
              pointsPossible={pointsPossible}
              setPointsPossible={setPointsPossible}
              //addNewScore={addNewScore()}
            />
          }
        />
        <Route
          path="/endscreen"
          element={
            <EndScreen
              score={score}
              setScore={setScore}
              pointsPossible={pointsPossible}
              setPointsPossible={setPointsPossible}
            />
          }
        />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
