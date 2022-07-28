import React, { useState } from "react";
import Question from "./Question";
import axios from "axios";

const Quiz = () => {
  const difficultyLevels = [{value:"easy"}, {value:"medium"}, {value:"hard"}];
  const [diffSelect, setDiffSelect] = useState("easy");

 // const [score, setScore] = useState(0);

  const [optionChosen, setOptionChosen] = useState("");

  const [questions, setQuestions] = useState([{"category":"History","type":"multiple","difficulty":"hard","question":"PRACTICE: In the year 1900, what were the most popular first names given to boy and girl babies born in the United States?","correct_answer":"John and Mary","incorrect_answers":["Joseph and Catherine","William and Elizabeth","George and Anne"]}]);

  // function regexRemover find "&quot;" and replace with " " "
  // find "&#039;" replace " ' "

  const removeSpecChar = (props) => {
    let result = props
      .replace(/&quot;/g, "''")
      .replace(/&#039;/g, "'")
      .replace(/&shy;/g, "-")
      .replace(/&amp;/g, "&");

    return result;
  };

  const randArray = () => {};

   
  
  const loadQuestions = (e) => {
    e.preventDefault();
    setDiffSelect(document.querySelector("#difficulty").value);
    return axios
      .get(`https://opentdb.com/api.php?amount=10&difficulty=${diffSelect}&type=multiple`)
      .then((response) => {
        // handle success
        //response.json()
        console.log("questions?", response.data.results);

        setQuestions(response.data.results);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
        console.log("axios executed!");
      });
  };

  return (
    <>
      <div className="container">
        
        <h3>QUIZ</h3>
        <div className="difficulty_container">
          <p>Choose difficulty level</p>

          <select  id="difficulty">
            {difficultyLevels.map((level) => (
              <option key = {Math.random()*difficultyLevels.length} value={level.value}>{level.value}</option>
            ))}
          </select>
        </div>


        <button onClick={loadQuestions}>Load Questions? </button>
      </div>
      <div>
          <Question 
            questions = {questions}
            removeSpecChar = {removeSpecChar}
            diffSelect = {diffSelect}


            />
      </div>
      {/* <div className="questions">
        {questions
          ? questions.map((question) => (
              <ol key={question.question}>
                <h2>{removeSpecChar(question.question)}</h2>
                <h3>Difficulty Level: {diffSelect.toUpperCase()}</h3>
                <button id="btn" onClick={(event) => setOptionChosen("A")}>
                  {removeSpecChar(question.incorrect_answers[0])}
                </button>{" "}
                <button id="btn" onClick={() => setOptionChosen("B")}>
                  {removeSpecChar(question.incorrect_answers[1])}
                </button>{" "}
                <button id="btn" onClick={() => setOptionChosen("C")}>
                  {removeSpecChar(question.incorrect_answers[2])}{" "}
                </button>{" "}
                <button id="btn" onClick={() => setOptionChosen("D")}>
                  {removeSpecChar(question.correct_answer)}{" "}
                </button>
              </ol>
            ))
          : ""}
      </div> */}
    </>
  );
};

export default Quiz;
