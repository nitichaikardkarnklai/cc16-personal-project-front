import { useState } from 'react'
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import QuestionForm from '../../features/survey/components/QuestionForm';
import RatingForm from '../../features/survey/components/RatingForm';

export default function SurveyFormPage() {
    const [input, setInput] = useState({ title: "", description: "", startDate: "", endDate: "", image: "", questions: [] }); // survey object

    const handleSubmitForm = (e) => {
        e.preventDefault();
    }

    const handleChangeInput = e => {
        setInput({ ...input, [e.target.name]: e.target.value })
    };

    return (
        <div className='min-h-screen flex flex-col gap-4'>
            <Link to="/admin/create">&lt; Back</Link>
            <form className='flex flex-col gap-4 py-8 px-[10%] bg-amber-100 rounded-3xl' onSubmit={handleSubmitForm}>
                <label htmlFor="title">Survey Topic: </label>
                <Input value={input.title} onChange={handleChangeInput} type="text" name="title"></Input>
                <label htmlFor="description">Survey Description: </label>
                <TextArea value={input.description} onChange={handleChangeInput} type="text" name="description"></TextArea>
                <div className='flex gap-8'>
                    <div>
                        <label htmlFor="startDate">Start Date: </label>
                        <Input value={input.startDate} onChange={handleChangeInput} type="date" name="startDate"></Input>
                    </div>
                    <div>
                        <label htmlFor="endDate">End Date: </label>
                        <Input value={input.endDate} onChange={handleChangeInput} type="date" name="endDate"></Input>
                    </div>
                </div>
                <QuestionForm />
                <QuestionForm />
                <QuestionForm />
                <Button bg="blue" text="white">+ Add Question</Button>
                <br></br>
                <Button width="full" bg="green" text="white">Submit</Button>
            </form>
        </div>
    )
}