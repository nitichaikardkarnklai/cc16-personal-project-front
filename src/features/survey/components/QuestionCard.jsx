import React from 'react'
import Radio from '../../../components/Radio'

export default function QuestionCard({ questionObj, handleChangeChoice, arrIndex, accessSurveyMode, input }) {
    return (
        <div className="bg-amber-200 py-2 px-4 rounded-xl flex flex-col gap-2">
            <div className='font-bold'>
                {questionObj.title}
            </div>
            <div>
                {questionObj.description}
            </div>
            {questionObj.ratings.map(el => <Radio
                key={el.id}
                questionId={questionObj.id}
                ratingObj={el}
                arrIndex={arrIndex}
                handleChangeChoice={handleChangeChoice}

                accessSurveyMode={accessSurveyMode}
                input={input} />)}
        </div>
    )
}