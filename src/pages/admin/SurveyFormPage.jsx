import { useState } from 'react'
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import QuestionForm from '../../features/survey/components/QuestionForm';
import { toast } from 'react-toastify';
import { createSurvey, editSurvey } from '../../api/survey';
import useSurvey from '../../hooks/use-survey';
import formatDate from '../../utils/format-date';
import deleteAllIdKeyFromSurvey from '../../utils/delete-all-id-key-from-survey';

const initialSurvey = { title: "", description: "", startDate: "", endDate: "", image: null, questions: [{ title: "", description: "", ratings: [{ name: "", score: 0 }] }] };
const initialQuestion = { title: "", description: "", ratings: [{ name: "", score: 0 }] };
// const initialRating = { name: "", score: 0 }

export default function SurveyFormPage() {
    const { survey, accessSurveyMode } = useSurvey();
    // console.log(accessSurveyMode, survey);
    const navigate = useNavigate();

    const [input, setInput] = useState(survey || { ...initialSurvey }); // survey object

    // ---------------------- Handle Submit Form ----------------------

    const handleSubmitForm = async (e, input) => {
        e.preventDefault();
        try {
            if (accessSurveyMode === "edit") {
                // console.log(JSON.stringify(input, null, 4));
                const { id: surveyId, ...surveyObjTemp } = input;
                const surveyObj = { ...deleteAllIdKeyFromSurvey(surveyObjTemp) };
                // console.log(surveyObj);
                await editSurvey(surveyId, surveyObj);

                toast.success("Edit Survey Successfully");
                navigate("/admin/create");
            } else {
                await createSurvey(input);
                // console.log(JSON.stringify(input, null, 4));

                toast.success("Create Survey Successfully");
                navigate("/admin/create");
            }

        } catch (err) {
            console.log(err);
            toast.error(err.response?.data.message);
        }
    }

    // ---------------------- Handle Change Input ----------------------

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
        ratingArr[0].score = +ratingArr[0].score
        for (let i = 1; i < ratingArr.length; i++) {
            ratingArr[i].score = +ratingArr[i - 1].score + 1;
        }
        let questionArr = [...input.questions];
        questionArr[qid] = { ...questionArr[qid], ratings: ratingArr };
        setInput({ ...input, questions: questionArr });
    };

    // ---------------------- Handle Add Button ----------------------

    const handleAddQuestion = () => {
        const clonedInput = { ...input };
        clonedInput.questions.push({ ...initialQuestion });
        setInput(clonedInput);
    }

    const handleAddRating = (qid, ratingArr) => {
        const clonedInput = { ...input };
        const prevRatingObj = ratingArr[ratingArr.length - 1];
        clonedInput.questions[qid].ratings.push({ name: "", score: (+prevRatingObj.score + +1) });
        setInput(clonedInput);
    }

    // ---------------------- Handle Delete Input ----------------------

    const handleDeleteQuestion = (qid) => {
        const clonedInput = { ...input };
        clonedInput.questions.splice(qid, 1);
        setInput(clonedInput);
    }

    const handleDeleteRating = (qid, rid) => {
        const clonedInput = { ...input };
        clonedInput.questions[qid].ratings.splice(rid, 1);

        let ratingArr = [...clonedInput.questions[qid].ratings];
        ratingArr[0].score = +ratingArr[0].score
        for (let i = 1; i < ratingArr.length; i++) {
            ratingArr[i].score = +ratingArr[i - 1].score + 1;
        }
        let questionArr = [...clonedInput.questions];
        questionArr[qid] = { ...questionArr[qid], ratings: ratingArr };

        setInput({ ...clonedInput, questions: questionArr });
    }

    return (
        <>
            {accessSurveyMode == "viewOnly" ?
                <div className='min-h-screen flex flex-col gap-4'>
                    <button className="self-start" onClick={() => navigate(-1)}>&lt; Back</button>
                    <div className='flex flex-col gap-4 py-8 px-[10%] bg-amber-100 rounded-3xl' onSubmit={(e) => handleSubmitForm(e, input)}>
                        <div>Survey Topic: </div>
                        <div className='font-bold'>{survey.title}</div>
                        <div>Survey Description: </div>
                        <div className='font-bold'>{survey.description}</div>
                        <div className='flex gap-8'>
                            <div>
                                <div>Start Date: </div>
                                <div className='font-bold'>{formatDate(survey.startDate)}</div>
                            </div>
                            <div>
                                <div>End Date: </div>
                                <div className='font-bold'>{formatDate(survey.endDate)}</div>
                            </div>
                        </div>
                        {/* image component */}
                        {survey.questions?.map((el, id) => <QuestionForm
                            key={id}
                            qid={id}
                            questionObj={el} />)}
                    </div>
                </div>
                :
                <div className='min-h-screen flex flex-col gap-4'>
                    <Link to="/admin/create">&lt; Back</Link>
                    <form className='flex flex-col gap-4 py-8 px-[10%] bg-amber-100 rounded-3xl' onSubmit={(e) => handleSubmitForm(e, input)}>
                        <label htmlFor="title">Survey Topic: </label>
                        <Input value={input.title} onChange={handleChangeInput} type="text" name="title"></Input>
                        <label htmlFor="description">Survey Description: </label>
                        <TextArea value={input.description} onChange={handleChangeInput} type="text" name="description"></TextArea>
                        <div className='flex gap-8'>
                            <div>
                                <label htmlFor="startDate">Start Date: </label>
                                <Input value={input.startDate.slice(0, 10)} onChange={handleChangeInput} type="date" name="startDate"></Input>
                            </div>
                            <div>
                                <label htmlFor="endDate">End Date: </label>
                                <Input value={input.endDate.slice(0, 10)} onChange={handleChangeInput} type="date" name="endDate"></Input>
                            </div>
                        </div>
                        {/* image component */}
                        {input?.questions?.map((el, id) => <QuestionForm
                            key={id}
                            qid={id}
                            questionObj={el}
                            handleChangeInputQuestion={handleChangeInputQuestion}
                            handleChangeInputRating={handleChangeInputRating}
                            handleAddRating={handleAddRating}
                            handleDeleteQuestion={handleDeleteQuestion}
                            handleDeleteRating={handleDeleteRating} />)}
                        <Button bg="blue" text="white" type="button" onClick={handleAddQuestion}>+ Add Question</Button>
                        <br></br>
                        <Button width="full" bg="green" text="white" type="submit">{accessSurveyMode == "edit" ? "Save Change Survey" : "Submit Survey"}</Button>
                    </form>
                </div>
            }
        </>
    )
}