import React from 'react'

export default function Radio({ handleChangeChoice, ratingObj, questionId, arrIndex, accessSurveyMode, input }) {
    // console.log(input);
    // console.log(accessSurveyMode);
    return (
        <div className='flex gap-3'>
            {
                accessSurveyMode === "doSurvey" ?
                    <input type="radio" id={ratingObj.id} name={questionId} value={+ratingObj.score} onChange={(e) => handleChangeChoice(e, arrIndex)}></input>
                    :
                    <input disabled type="radio" id={ratingObj.id} name={questionId} checked={+ratingObj?.score === +input?.userSurveys[arrIndex]?.score}></input>
            }
            <label htmlFor={ratingObj.id}>{ratingObj.name}</label>
        </div>
    )
}
