import React from "react"

export default function Intro(props){
    return(
        <>
            <img src={process.env.PUBLIC_URL + '/images/logo1.svg'} alt="" className="logo1"/>
            <img src={process.env.PUBLIC_URL + '/images/logo2.svg'} alt="" className="logo2"/>
            <h1 className="intro-title">Quizzical</h1>
            <h3 className="intro-text">Some description if needed</h3>
            <button className="intro-button" onClick={props.quizzSetter}>Start quizz</button>
        </> 
    )
}