import useSurvey from '../../hooks/use-survey'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../../features/survey/components/QuestionCard';
import Button from '../../components/Button';
import { storePrevSurvey, getPrevSurvey, clearPrevSurvey, getAccessPageMode, storeAccessPageMode, clearAccessPageMode } from "../../utils/local-storage"
import { toast } from 'react-toastify';
import * as userSurveyApi from "../../api/userSurvey"
import useAuth from '../../hooks/use-auth';

let initialInput = { userSurveys: [] }

export default function DoSurveyFormPage() {
    const { survey, setSurvey, accessSurveyMode, setLoading, loading } = useSurvey();
    const { authUser } = useAuth();
    const navigate = useNavigate();

    // const [input, setInput] = useState({ userSurveys: [{ questionId: null, score: null }] }); // userSurvey Object
    const [input, setInput] = useState(null); // userSurvey Object

    useEffect(() => {

        if (!getAccessPageMode()) {
            storeAccessPageMode(accessSurveyMode);
        }


        if (survey) {
            for (let i = 0; i < survey?.questions?.length; i++) {
                initialInput.userSurveys.push({ questionId: survey.questions[i].id, score: null });
            }
            setInput(c => initialInput);
            storePrevSurvey(JSON.stringify(survey, null, 4));
        } else {
            let tempSurvey = JSON.parse(getPrevSurvey());
            // console.log(tempSurvey);

            for (let i = 0; i < tempSurvey?.questions?.length; i++) {
                initialInput.userSurveys.push({ questionId: tempSurvey.questions[i].id, score: null });
            }
            setInput(c => initialInput);
            setSurvey(tempSurvey);
        }

        if (accessSurveyMode === "viewHistoryOnly" || getAccessPageMode() === "viewHistoryOnly") {
            let tempSurvey2 = JSON.parse(getPrevSurvey());
            // console.log(tempSurvey2);
            userSurveyApi
                .getUserSurveyByUserId(authUser.id, tempSurvey2.id)
                .then(res => {
                    setInput(c => { return { ...c, userSurveys: res.data.userSurveyResultForUser } })
                })
                .catch(err => {
                    toast.error(err.response?.data.message);
                })
        }

    }, [])

    // ---------------------- Handle Submit Form ----------------------

    const handleSubmitForm = async (e, input) => {
        e.preventDefault();

        try {
            if (confirm("Are you sure to submit survey?")) {
                // console.log(input);
                await userSurveyApi.createUserSurvey(authUser.id, input);
                toast.success("Submit Survey Successfully");
                navigate("/");
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data.message);
        }

    }

    const handleChangeChoice = (e, arrIndex) => {
        let userSurveysArr = [...input.userSurveys];
        userSurveysArr[arrIndex].score = e.target.value;
        setInput({ userSurveys: userSurveysArr });
    };

    const handleBack = () => {
        clearPrevSurvey();
        navigate(-1);
        clearAccessPageMode();
    }

    return (
        <div className='h-screen'>
            {accessSurveyMode === "doSurvey" ?
                <>
                    <button onClick={() => handleBack()}>&lt; Back</button>
                    <form className='flex flex-col gap-4 py-8 px-[10%] bg-amber-100 rounded-3xl' onSubmit={(e) => handleSubmitForm(e, input)}>
                        <div className='font-bold'>{survey?.title}</div>
                        <div>{survey?.description}</div>
                        {survey?.questions?.map((el, id) => <QuestionCard
                            key={el.id}
                            questionObj={el}
                            arrIndex={id}
                            handleChangeChoice={handleChangeChoice}

                            accessSurveyMode={accessSurveyMode}
                        />)}
                        <Button width="full" bg="green" text="white" type="submit">Submit</Button>
                    </form>
                </>
                :
                <>
                    <button onClick={() => handleBack()}>&lt; Back</button>
                    <form className='flex flex-col gap-4 py-8 px-[10%] bg-amber-100 rounded-3xl' onSubmit={(e) => handleSubmitForm(e, input)}>
                        <div className='font-bold'>{survey?.title}</div>
                        <div>{survey?.description}</div>
                        {survey?.questions?.map((el, id) => <QuestionCard
                            key={el.id}
                            questionObj={el}
                            arrIndex={id}
                            handleChangeChoice={handleChangeChoice}

                            accessSurveyMode={accessSurveyMode}
                            input={input}
                        />)}
                    </form>
                </>
            }
        </div>

    )
}