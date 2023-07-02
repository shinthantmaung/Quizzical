import React from "react"
import he from "he"

export default function Answers(props){
    const ansElements = props.answers.map(ans =>{
            const stylesBeforeChecked = {
                background: props.selectedAnsTracker.includes(he.decode(ans)) ? "#D6DBF5" :undefined
            }
            const stylesAfterChecked = {
                //conditional color change of answers
                background: (props.selectedAnsTracker.includes(he.decode(ans)) && props.correctAns === ans) ? "#94D7A2" : 
                            (props.selectedAnsTracker.includes(he.decode(ans))) ? "#F8BCBC" : 
                            (props.selectedAnsTracker[props.index]==="" && props.correctAns===ans) ? "#F8BCBC" : //to ensure correct answer is red when the user did not select any answer
                            (props.correctAns === ans)? "#94D7A2": undefined ,
                border: (props.selectedAnsTracker.includes(he.decode(ans)) && props.correctAns === ans) || 
                        (props.selectedAnsTracker.includes(he.decode(ans))) ||
                        (props.selectedAnsTracker[props.index]==="" && props.correctAns===ans) ||
                        (props.correctAns === ans) ? "none" : undefined ,
                opacity: (props.selectedAnsTracker.includes(he.decode(ans)) && props.correctAns === ans) ||
                         (props.correctAns === ans) ? undefined : "65%"

            }

            return<label class="radio-button one-answer" onClick={(event) => props.ansSelection(event, props.index)} style={props.checked? stylesAfterChecked: stylesBeforeChecked}>
                        <input type="radio" name="radioButton" />
                        {he.decode(ans)}
                    </label>
    })
    return(<div>
                {ansElements}
            </div>)
    }