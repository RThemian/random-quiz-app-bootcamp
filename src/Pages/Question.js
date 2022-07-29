import React, {useState, useContext, useEffect} from 'react';
import './Question.css';

const Question = ({
    questions,
    diffSelect,
   
}) => {

    const removeSpecChar = ( props) => {
 
        let result = props
          .replace(/&quot;/g, "''")
          .replace(/&#039;/g, "'")
          .replace(/&shy;/g, "-")
          .replace(/&amp;/g, "&")
          .replace(/&Iacute;/g, "í")
          .replace(/&uuml;/g, "ü");

    
        return result;
      };
    


const [score, setScore] = useState(0);
const [currQuestion, setCurrQuestion] = useState(0)
const [optionChosen, setOptionChosen] = useState("");
//console.log("QUESTIONS", questions[0].question)


const finishQuiz = () => {

}

const nextQuestion = () => {

    if (questions[currQuestion].correct_answer === optionChosen) {
        setScore(score + 1);
      }


    setCurrQuestion(currQuestion + 1);
}



// make answer array with three incorrects and last one correct
   
 let answerArr = [removeSpecChar(questions[currQuestion].incorrect_answers[0]),
                  removeSpecChar(questions[currQuestion].incorrect_answers[1]),
                  removeSpecChar(questions[currQuestion].incorrect_answers[2]),
                  removeSpecChar(questions[currQuestion].correct_answer)];

console.log("this is the NON random array", answerArr)



//take array of values and randomly change its indices

  function RandomizeArray(arr1) {
    //removeSpecChar(arr1);
    let ctr = arr1.length, 
    temp, 
    index
  
  // While there are elements in the array
      while (ctr > 0) {
  // Pick a random index
          index = Math.floor(Math.random() * ctr);
  // Decrease ctr by 1
          ctr--;
  // And swap the last element with it
          temp = arr1[ctr];
          arr1[ctr] = arr1[index];
          arr1[index] = temp;
      }
    return arr1;
  }

//fill a const variable by randomizing the answerArr
//THIS IS WHERE I THINK THE PROBLEM IS





const finalRandArr = [...RandomizeArray(answerArr)];




console.log("optionChosen", optionChosen)


  return (
    <div className="quiz">
        
                <h1>Question {currQuestion + 1}</h1>
                <h2> {removeSpecChar(questions[currQuestion].question)}</h2>
                <h3>Difficulty Level: {diffSelect.toUpperCase()}</h3>
                <div className = "options">
                <button id="btn" onClick ={() => {
                  setOptionChosen(finalRandArr[0]) }}>
                  {finalRandArr[0]}
                
                </button>{" "}
                <button id="btn" onClick={() => setOptionChosen(finalRandArr[1])}>
                  {finalRandArr[1]}
                </button>{" "}
                <button id="btn" onClick={() => setOptionChosen(finalRandArr[2])}>
                  {finalRandArr[2]}{" "}
                </button>{" "}
                <button id="btn" onClick={() => setOptionChosen(finalRandArr[3])}>
                  {finalRandArr[3]}{" "}
                </button>

                {currQuestion === questions.length - 1 ? (
                <button onClick = {finishQuiz}>Finish Quiz</button> ) 
                : ( <button onClick = {nextQuestion}>Next Question</button> ) }
                </div>
                    <div>
                      <h3>This is the random array {answerArr.length > 0 ? RandomizeArray(answerArr).map((option) =>  <li>{option}</li>) : ""}</h3>
                    </div>

        
      </div>
  )
}

export default Question