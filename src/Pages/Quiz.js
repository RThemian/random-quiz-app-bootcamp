import React, { useState} from "react";
import Question from "./Question";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EndScreen from "./EndScreen";

//put the randomizeArray function outside of the main component to controll its use

function randomizeArray(array) {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

const Quiz = ({
  score = 0,
  setScore
}) => {
  const difficultyLevels = [
    { value: "easy" },
    { value: "medium" },
    { value: "hard" },
  ];
  const [diffSelect, setDiffSelect] = useState("easy");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  //const [score, setScore] = useState(0);




  const loadQuestions = (e) => {
    e.preventDefault();
    setDiffSelect(document.querySelector("#difficulty").value);
    return axios
      .get(
        `https://opentdb.com/api.php?amount=3&difficulty=${diffSelect}&type=multiple`
      )
      .then((response) => {
        // handle success
        //response.json()

        console.log("questions?", response.data.results);
        const questions = response.data.results.map((q) => {
          return {
            // add "selectedAnswer" prop to each question
            selectedAnswer: null,
            // add "answers" prop to randomize answers up front
            answers: randomizeArray([...q.incorrect_answers, q.correct_answer]),
            // copy rest of object
            ...q,
          };
        });
        setQuestions(questions);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
        console.log("axios executed!");
        // If a user clicks "Load Questions" while in the middle of
        // an existing quiz, we start them back at 0 with the new
        // questions.
        setScore(0);
        setCurrentQuestionIndex(0);
      });
  };

  //
  const handleNextQuestion = () => {
    //add if correct else return
    if (
      questions[currentQuestionIndex].selectedAnswer ===
      questions[currentQuestionIndex].correct_answer
    ) {
      alert("Correct!");
      //ensures it always passes "score => score + 1"
      setScore((score) => score + 1);
      setCurrentQuestionIndex((previousIndex) => {
        if (previousIndex < questions.length) {
          return previousIndex + 1;
        }
      });
    } else {
      alert("Wrong");
      setCurrentQuestionIndex((previousIndex) => {
        if (previousIndex < questions.length) {
          return previousIndex + 1;
    
  }});}}

// create link to EndScreen with useNavigate
  let navigate = useNavigate();

   const handleFinishQuiz = () => {

    if (
      questions[currentQuestionIndex].selectedAnswer ===
      questions[currentQuestionIndex].correct_answer
    ) {
      alert("Correct!");
      //ensures it always passes "score => score + 1"
      setScore((score) => score + 1);
    }
      let path = '/endscreen';
      navigate(path);

   }

//remove handlePreviousQuestion
/*
  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((previousIndex) => {
      if (previousIndex > 0) {
        return previousIndex - 1;
      }
    });
  };
  */
  //implement specCharRemover at Quiz level
  //questions[currentQuestionIndex].selectedAnswer send this nextQuestion component

  const setSelectedAnswerForQuestion = (chosenAnswer) => {
    const questionsCopy = [...questions];
    const currentSelectedAnswer =
      questionsCopy[currentQuestionIndex].selectedAnswer;
    // this allows to deselect an already selected
    // answer so that nothing is selected.
    if (currentSelectedAnswer === chosenAnswer) {
      questionsCopy[currentQuestionIndex].selectedAnswer = null;
    } else {
      questionsCopy[currentQuestionIndex].selectedAnswer = chosenAnswer;
    }
    setQuestions(questionsCopy);
  };

  return (
    <>
      <div className="container">
        <h3>QUIZ</h3>
        <div className="difficulty_container">
          <p>Choose difficulty level</p>
          <select id="difficulty">
            {difficultyLevels.map((level) => {
              return (
                <option
                  key={Math.random() * difficultyLevels.length}
                  value={level.value}
                >
                  {level.value}
                </option>
              );
            })}
          </select>
        </div>
        <button onClick={loadQuestions}>Load Questions? </button>
      </div>
      <div>
        {questions[currentQuestionIndex] !== undefined && (
          <Question
            question={questions[currentQuestionIndex].question}
            answers={questions[currentQuestionIndex].answers}
            selectedAnswer={questions[currentQuestionIndex].selectedAnswer}
            onSelectAnswer={setSelectedAnswerForQuestion}
          />
        )}
      </div>
      {/*
        PREVIOUS QUESTION, NEXT QUESTION, and FINISH QUIZ buttons
      */}
      <div>
        {/* previous question button 
        <button
          disabled={questions.length === 0 || currentQuestionIndex === 0}
          onClick={handlePreviousQuestion}
        >
          Previous Question
        </button>
        */}
        {/* next question button */}
        <button
          disabled={
            // must select an answer to continue
            (questions[currentQuestionIndex] &&
              questions[currentQuestionIndex].selectedAnswer === null) ||
            // if there are no questions
            questions.length === 0 ||
            // if we are at the last question
            currentQuestionIndex + 1 === questions.length
          }
          onClick={handleNextQuestion}
        >
          Next Question
        </button>
        {/* TODO: finish quiz button */}
        <button
          onClick = {handleFinishQuiz}
          disabled={
            // only show finish button if we are on last question
            currentQuestionIndex + 1 !== questions.length ||
            // and the user has selected an answer for that last question
            (questions[currentQuestionIndex] &&
              questions[currentQuestionIndex].selectedAnswer === null)
          }
        >
          Finish Quiz
        </button>
        {questions.length > 0 && (
          <h5>
            Question {currentQuestionIndex + 1} / {questions.length}
          </h5>
        )}
        <h5>Score {score}</h5>
      </div>
    </>
  );
};

export default Quiz;
