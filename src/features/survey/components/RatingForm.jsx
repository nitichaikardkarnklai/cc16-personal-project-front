import { useState } from 'react';
import Input from '../../../components/Input';
import useSurvey from '../../../hooks/use-survey';


export default function RatingForm({ ratingObj, rid, qid, handleChangeInputRating, handleDeleteRating }) {
    const { accessSurveyMode } = useSurvey();

    return (
        <>
            {accessSurveyMode == "viewOnly" ?
                <div className='bg-amber-300 py-2 px-4 rounded-lg flex flex-col gap-2'>
                    <div className='font-bold'>Rating {rid + 1}</div>
                    <div className='flex gap-4'>
                        <span>Rating Name: </span>
                        <div className='font-bold'>{ratingObj.name}</div>
                    </div>
                    <div className='flex gap-4'>
                        <span>Rating Score: </span>
                        <div className='font-bold'>{ratingObj.score}</div>
                    </div>
                </div>
                :
                <div className='bg-amber-300 py-2 px-4 rounded-lg flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <div className='font-bold'>Rating {rid + 1}</div>
                        {rid == 0 || <button type="button" onClick={() => handleDeleteRating(qid, rid)}>&#x2715;</button>}
                    </div>
                    <label htmlFor="name">Rating Name: </label>
                    <Input value={ratingObj.name} onChange={e => handleChangeInputRating(e, qid, rid)} type="text" name="name"></Input>
                    {rid !== 0 ? <label htmlFor="score">Rating Score: {ratingObj.score}</label>
                        :
                        <div className='flex gap-4'>
                            <span htmlFor="score">Rating Score: </span>
                            <select name="score" id="score" value={ratingObj.score} onChange={e => handleChangeInputRating(e, qid, rid)} className="rounded-md">
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                            </select>
                            {/* <Input value={ratingObj.score} onChange={e => handleChangeInputRating(e, qid, rid)} type="text" name="score"></Input> */}
                        </div>}
                </div>
            }
        </>
    )
}