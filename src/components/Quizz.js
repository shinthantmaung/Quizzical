import React from "react"
import he from "he"
import Confetti from "react-confetti"
import Answers from "./Answers"

export default function Quizz(props){
    const [checked, setChecked] = React.useState(false)
    function checkAns(){
        setChecked(true)
    }

    const [selectedAnsTracker, setSelectedAnsTracker] = React.useState(["","","","",""])

    function correctAnsCounter(){
        let correctAnsCount = 0
        for(let i=0; i<5; i++){
            const correctAns= props.quizzsArray[i].correctAns
            if (selectedAnsTracker.includes(he.decode(correctAns))){
                correctAnsCount++
            }
        }
        return correctAnsCount
    }

    function ansSelection(event, index){
        //can not select answer after checking
        if(checked){
            return
        }

        const selectedAns = event.target.textContent
        console.log(selectedAns)
        //to prevent elements of the array modifying to empty string
        if(selectedAns.length !== 0){
            setSelectedAnsTracker(prev => {
                const newArray = [...prev]
                newArray[index] = selectedAns
                return newArray
            })
        }
        
    }

    const quizzElements = React.useMemo(() => {
        return props.quizzsArray.map((quizz, index) => {
          return (
            <div className="question-with-answers" key={quizz.id}>
              <h2 className="question">{he.decode(quizz.question)}</h2>
              <Answers
                index={index}
                answers={quizz.answers}
                checked={checked}
                correctAns={quizz.correctAns}
                selectedAnsTracker={selectedAnsTracker}
                ansSelection={ansSelection}
              />
            </div>
          );
        });
      }, [props.quizzsArray, checked, selectedAnsTracker]);

    return(<>
                <img src={process.env.PUBLIC_URL + '/images/logo1.svg'} alt="" className="logo1 logo-1-quizz"/>
                <img src={process.env.PUBLIC_URL + '/images/logo2.svg'} alt="" className="logo2 logo-2-quizz" />
                <div className="quizz-container">
                    {quizzElements}
                </div>
                {checked && correctAnsCounter() <= 1 && <h2 className="question">I'm sorry&#x1F613; your knowledge of anime is very basic.</h2>}
                {checked && correctAnsCounter() >= 2 && correctAnsCounter() <= 4 && <h2 className="question">Not bad but not impressive&#x1F61C;</h2>}
                {checked && correctAnsCounter() === 5 && <h2 className="question">Congradulations&#x1F631;!You must be a true otaku</h2>}
                {checked ?
                <div className="checked-bottom-container">
                    <h2 className="question answer-counter">You scored <span className="question">{correctAnsCounter()}</span>/5 correct answers</h2>
                    <button onClick={props.playAgain} className="quizz-button checked-quizz-button">Play again</button>
                </div>
                    :
                <button onClick={checkAns} className="quizz-button">Check answers</button>
                    }
                {checked && correctAnsCounter() === 5 && <Confetti/>}
            </>
            )}
