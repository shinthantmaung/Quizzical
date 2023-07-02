import React from "react"

export default function Intro(props){
    return(
        <>
            <img src={process.env.PUBLIC_URL + '/images/logo1.svg'} alt="" className="logo1"/>
            <img src={process.env.PUBLIC_URL + '/images/logo2.svg'} alt="" className="logo2"/>
            <h1 className="intro-title">Quizzical</h1>
            <p className="intro-text">a quizz app of five anime questions.<br></br>Time to test if you are a true otaku!&#x1F600;</p>
            <button className="intro-button" onClick={props.quizzSetter}>Start quizz</button>
        </> 
    )
}