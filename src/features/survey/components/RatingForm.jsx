import { useState } from 'react';
import Input from '../../../components/Input';


export default function RatingForm() {
    const [input, setInput] = useState({ name: "", score: 0 }); // rating object

    const handleChangeInput = e => {
        setInput({ ...input, [e.target.name]: e.target.value })
    };

    return (
        <div className='bg-amber-300 py-2 px-4 rounded-lg flex flex-col gap-2'>
            <div className='font-bold'>Rating 1</div>
            <label htmlFor="title">Rating Name: </label>
            <Input value={input.name} onChange={handleChangeInput} type="text" name="name"></Input>
            <label htmlFor="score">Rating Score: </label>
            <Input value={input.score} onChange={handleChangeInput} type="text" name="score"></Input>
        </div>
    )
}
