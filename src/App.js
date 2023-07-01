import "./styles.css"
import React from 'react';
import Intro from "./components/Intro"
import Quizz from "./components/Quizz"
import {nanoid} from "nanoid"

export default function App() {
  const [quizz, setQuizz] = React.useState(false)
  const [data, setData] =React.useState([])
  const [dataFetched, setDataFetched] = React.useState(false)
  const quizzsArray = data.map(e => {
    return { question: e.question,
             answers: shuffleArray([...e.incorrect_answers, e.correct_answer]),
             correctAns: e.correct_answer,
             id: nanoid()
            }
  })

  function quizzSetter(){
    setQuizz(preValue => !preValue)
  }

  function playAgain(){
    quizzSetter()
    setData([])
    setDataFetched(false)
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
  }

  React.useEffect(()=>{
    async function fetchData(){
      const response = await fetch('https://opentdb.com/api.php?amount=5&category=31&difficulty=easy&type=multiple')
      const jsonData = await response.json() 
      setData(jsonData.results)
    }

    if (!dataFetched) {
      fetchData();
      setDataFetched(true);
    }
  }, [dataFetched])

  return (
    <div className={quizz ? "app-for-quizz" : "App"} >
      {quizz?
        <Quizz 
          quizzsArray = {quizzsArray}
          quizzSetter={quizzSetter}
          playAgain={playAgain}
          quizz={quizz}
        />:
        <Intro 
          quizzSetter={quizzSetter}
        /> }
    </div>
  )
};
