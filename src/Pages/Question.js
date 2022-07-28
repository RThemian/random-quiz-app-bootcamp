import React, {useState} from 'react'

const Question = ({
    questions,
    diffSelect,
    removeSpecChar
}) => {

const [currQuestion, setCurrQuestion] = useState(0)
const [optionChosen, setOptionChosen] = useState("");
//console.log("QUESTIONS", questions[0].question)


const finishQuiz = () => {

}

const nextQuestion = () => {
    setCurrQuestion(currQuestion + 1);
}
console.log()

  return (
    <div className="questions">
        
                <h1>Question {currQuestion + 1}</h1>
                <h2> {removeSpecChar(questions[currQuestion].question)}</h2>
                <h3>Difficulty Level: {diffSelect.toUpperCase()}</h3>
                <button id="btn" onClick={(event) => setOptionChosen("A")}>
                  {removeSpecChar(questions[currQuestion].incorrect_answers[0])}
                </button>{" "}
                <button id="btn" onClick={() => setOptionChosen("B")}>
                  {removeSpecChar(questions[currQuestion].incorrect_answers[1])}
                </button>{" "}
                <button id="btn" onClick={() => setOptionChosen("C")}>
                  {removeSpecChar(questions[currQuestion].incorrect_answers[2])}{" "}
                </button>{" "}
                <button id="btn" onClick={() => setOptionChosen("D")}>
                  {removeSpecChar(questions[currQuestion].correct_answer)}{" "}
                </button>

                {currQuestion === questions.length - 1 ? (
                <button onClick = {finishQuiz}>Finish Quiz</button> ) 
                : ( <button onClick = {nextQuestion}>Next Question</button> ) 
    }


        
      </div>
  )
}

export default Question