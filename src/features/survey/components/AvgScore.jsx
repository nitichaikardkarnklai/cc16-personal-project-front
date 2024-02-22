import React from 'react'

export default function AvgScore({ questionObj }) {
    // console.log(questionObj)
    return (
        questionObj ? <div className='flex gap-3'>
            <div>{questionObj.title}: </div>
            <div className='font-bold'>{Math.round(questionObj.avg * 100) / 100}</div>
            <div>/ {questionObj.fullScore?.toFixed(2)}</div>
        </div>
            :
            ""
    )
}
