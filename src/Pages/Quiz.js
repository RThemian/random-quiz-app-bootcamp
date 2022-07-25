import React, {useState} from 'react';

import axios from 'axios';

const Quiz = () => {

    const difficultyLevel = ['easy', 'medium', 'hard'];

    const [score, setScore] = useState(0);

    const [optionChosen, setOptionChosen] = useState("");

    const [questions, setQuestions] = useState([
    ])

    // function regexRemover find "&quot;" and replace with " " "
    // find "&#039;" replace " ' "

    const removeSpecChar = (props) => {

       let result = props
         .replace(/&quot;/g, "''")
         .replace(/&#039;/g, "'")
         .replace(/&shy;/g, "-")
         .replace(/&amp;/g, "&")

        return result;

    }

    
    const randArray = () => {

    }



    const url = 'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple'

    const loadQuestions = () => {
        
    return axios.get(url)
        .then( (response) => {
    // handle success
        //response.json()
        console.log("questions?", response.data.results);
        
        setQuestions(response.data.results)
        })
        .catch((error) => {
    // handle error
            console.log(error);
        })
        .then( () => {
    // always executed
         console.log("axios executed!")
  });

    }

  return (
      <>
    <div className = 'container'>
        <h3>QUIZ</h3>
        <button onClick = {loadQuestions} >Load Questions? Easy level</button>
    </div>
    <div className='questions'>
        {questions[0] ? questions.map(question => (
        <ol key = {question.question}>
            <h2>{removeSpecChar(question.question)}</h2>
            <button id = "btn" onClick ={(event) => 
          setOptionChosen("A")}> 
          {removeSpecChar(question.incorrect_answers[0])}{" "} </button>
        <button id = "btn" onClick ={() => setOptionChosen("B")}> 
          {removeSpecChar(question.incorrect_answers[1])}{" "} </button>
        <button id = "btn" onClick ={() => setOptionChosen("C")}> 
          {removeSpecChar(question.incorrect_answers[2])}{" "} </button>
        <button id = "btn" onClick ={() => setOptionChosen("D")}> 
          {removeSpecChar(question.correct_answer)}{" "} </button>
        </ol>
        )) : "" }

    </div>
    </>
  )
}

export default Quiz;