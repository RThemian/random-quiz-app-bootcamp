import "./App.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";

import React, { useState, useEffect } from "react";
import Quiz from "./Pages/Quiz";
import EndScreen from "./Pages/EndScreen";
import ErrorPage from "./Pages/ErrorPage";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { auth, ColRef, Database } from "./Context/firebase";

function App() {
  const [score, setScore] = useState(0);
  const [pointsPossible, setPointsPossible] = useState(0);

  //manage states of firebase logins
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");

  const [loginEmail, setLoginEmail] = useState("");

  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  const [oldScores, setOldScores] = useState([]);

  useEffect(() => {
    try {
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [user]);

  let addScoreForm = document.querySelector(".add");

  console.log(addScoreForm);
  useEffect(() => {
    if (addScoreForm) {
      addScoreForm.addEventListener("submit", (e) => {
        e.preventDefault();

        addDoc(ColRef, {
          loginEmail: addScoreForm.loginEmail.value,
          score: addScoreForm.score.value,
          pointsPossible: addScoreForm.pointsPossible.value,
          dateTime: addScoreForm.dateTime.value,
          difficulty: addScoreForm.difficulty.value,
        }).then(() => {
          addScoreForm.reset();
        });
      });
    }
  });

  let deleteScoreForm = document.querySelector(".delete");
  useEffect(() => {
    if (deleteScoreForm) {
      deleteScoreForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const docRef = doc(Database, "Scores", deleteScoreForm.id.value);
        deleteDoc(docRef).then(() => {
          deleteScoreForm.reset();
        });
      });
    }
  });

  onSnapshot(ColRef, (snapshot) => {
    let scores = [];
    snapshot.docs.forEach((doc) => {
      scores.push({ ...doc.data(), id: doc.id });
    });
    console.log("scores", scores);
  });

  const register = async () => {
    setRegisterEmail("");
    setRegisterPassword("");

    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      //invalid email
      console.log(error.message);
    }
  };

  const login = async () => {
    setLoginEmail("");
    setLoginPassword("");
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      //invalid email
      console.log(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };

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
        <Route path="/" element={<Home />} />

        <Route
          path="/quiz"
          element={
            <Quiz
              score={score}
              setScore={setScore}
              pointsPossible={pointsPossible}
              setPointsPossible={setPointsPossible}
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
