import { useState } from 'react'
import RatingForm from './RatingForm'
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import Button from '../../../components/Button';

export default function QuestionForm({ questionObj, qid, handleChangeInputQuestion, handleChangeInputRating, handleAddRating, handleDeleteQuestion, handleDeleteRating }) {

    return (
        <div className='bg-amber-200 py-2 px-4 rounded-xl flex flex-col gap-2'>
            <div className='flex justify-between'>
                <div className='font-bold'>Question {qid + 1}</div>
                <button onClick={() => handleDeleteQuestion(qid)}>&#x2715;</button>
            </div>
            <label htmlFor="title">Question Title: </label>
            <Input value={questionObj.title} onChange={e => handleChangeInputQuestion(e, qid)} type="text" name="title"></Input>
            <label htmlFor="description">Question Description: </label>
            <TextArea value={questionObj.description} onChange={e => handleChangeInputQuestion(e, qid)} type="text" name="description"></TextArea>
            {questionObj.ratings.map((el, id) => <RatingForm
                key={id}
                rid={id}
                ratingObj={el}
                qid={qid}
                handleChangeInputRating={handleChangeInputRating}
                handleDeleteRating={handleDeleteRating}
            />)}
            <Button onClick={() => handleAddRating(qid)} bg="black" text="white">+ Add Rating</Button>
        </div>
    )
}
