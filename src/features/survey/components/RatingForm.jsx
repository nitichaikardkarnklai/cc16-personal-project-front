import { useState } from 'react';
import Input from '../../../components/Input';


export default function RatingForm({ ratingObj, rid, qid, handleChangeInputRating, handleDeleteRating }) {

    return (
        <div className='bg-amber-300 py-2 px-4 rounded-lg flex flex-col gap-2'>
            <div className='flex justify-between'>
                <div className='font-bold'>Rating {rid + 1}</div>
                <button onClick={() => handleDeleteRating(qid, rid)}>&#x2715;</button>
            </div>
            <label htmlFor="title">Rating Name: </label>
            <Input value={ratingObj.name} onChange={e => handleChangeInputRating(e, qid, rid)} type="text" name="name"></Input>
            <label htmlFor="score">Rating Score: </label>
            <Input value={ratingObj.score} onChange={e => handleChangeInputRating(e, qid, rid)} type="text" name="score"></Input>
        </div>
    )
}