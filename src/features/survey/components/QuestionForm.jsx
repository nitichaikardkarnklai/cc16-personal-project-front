import { useState } from 'react'
import RatingForm from './RatingForm'
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import Button from '../../../components/Button';

export default function QuestionForm() {
    const [input, setInput] = useState({ title: "", description: "", ratings: [] }); // question object

    const handleChangeInput = e => {
        setInput({ ...input, [e.target.name]: e.target.value })
    };

    return (
        <div className='bg-amber-200 py-2 px-4 rounded-xl flex flex-col gap-2'>
            <div className='font-bold'>Question 1</div>
            <label htmlFor="title">Question Title: </label>
            <Input value={input.title} onChange={handleChangeInput} type="text" name="title"></Input>
            <label htmlFor="description">Question Description: </label>
            <TextArea value={input.description} onChange={handleChangeInput} type="text" name="description"></TextArea>
            <RatingForm></RatingForm>
            <Button bg="black" text="white">+ Add Rating</Button>
        </div>
    )
}
