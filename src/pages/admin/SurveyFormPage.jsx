import { useState } from 'react'
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import QuestionForm from '../../features/survey/components/QuestionForm';
import RatingForm from '../../features/survey/components/RatingForm';
import Spinner from '../../components/Spinner';

const initialSurvey = { title: "", description: "", startDate: "", endDate: "", image: "", questions: [{ title: "", description: "", ratings: [{ name: "", score: 0 }] }] };
const initialQuestion = { title: "", description: "", ratings: [{ name: "", score: 0 }] };
const initialRating = { name: "", score: 0 }

export default function SurveyFormPage() {
    const [input, setInput] = useState({ title: "", description: "", startDate: "", endDate: "", image: "", questions: [{ title: "", description: "", ratings: [{ name: "", score: 0 }] }] }); // survey object

    const handleSubmitForm = (e) => {
        e.preventDefault();
    }

    const handleChangeInput = e => {
        setInput({ ...input, [e.target.name]: e.target.value })
    };

    const handleChangeInputQuestion = (e, id) => {
        let questionArr = [...input.questions];
        questionArr[id] = { ...questionArr[id], [e.target.name]: e.target.value };
        setInput({ ...input, questions: questionArr })
    };

    const handleChangeInputRating = (e, qid, rid) => {
        let ratingArr = [...input.questions[qid].ratings];
        ratingArr[rid] = { ...ratingArr[rid], [e.target.name]: e.target.value };
        let questionArr = [...input.questions];
        questionArr[qid] = { ...questionArr[qid], ratings: ratingArr };
        setInput({ ...input, questions: questionArr })
    };

    const handleAddQuestion = () => {
        const clonedInput = { ...input };
        clonedInput.questions.push({ title: "", description: "", ratings: [{ name: "", score: 0 }] });
        setInput(clonedInput);
    }

    const handleAddRating = (qid) => {
        const clonedInput = { ...input };
        clonedInput.questions[qid].ratings.push({ name: "", score: 0 });
        setInput(clonedInput);
    }

    const handleDeleteQuestion = (qid) => {
        const clonedInput = { ...input };
        clonedInput.questions.splice(qid, 1);
        setInput(clonedInput);
    }

    const handleDeleteRating = (qid, rid) => {
        const clonedInput = { ...input };
        clonedInput.questions[qid].ratings.splice(rid, 1);
        setInput(clonedInput);
    }

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
                {input?.questions?.map((el, id) => <QuestionForm
                    key={id}
                    qid={id}
                    questionObj={el}
                    handleChangeInputQuestion={handleChangeInputQuestion}
                    handleChangeInputRating={handleChangeInputRating}
                    handleAddRating={handleAddRating}
                    handleDeleteQuestion={handleDeleteQuestion}
                    handleDeleteRating={handleDeleteRating} />)}
                <Button bg="blue" text="white" onClick={handleAddQuestion}>+ Add Question</Button>
                <br></br>
                <Button width="full" bg="green" text="white">Submit Survey</Button>
            </form>
        </div>
    )
}