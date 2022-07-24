import React, {useState} from 'react';

import axios from 'axios';

function Quiz() {

    const difficultyLevel = ['easy', 'medium', 'hard'];

    const [score, setScore] = useState(0);



    const [questions, setQuestions] = useState([
    ])

    

    const url = 'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple'

    const loadQuestions = () => {
        
    return axios.get(url)
        .then( (response) => {
    // handle success
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
        {questions[0] ? questions.map(question => <h2>{question.question}</h2>) : "" }

    </div>
    </>
  )
}

export default Quiz