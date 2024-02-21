import { useEffect } from 'react';
import Button from '../../components/Button';
import SurveyCard from '../../features/survey/components/SurveyCard';
import useSurvey from '../../hooks/use-survey';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearAccessPageMode } from '../../utils/local-storage';

export default function StartSurveyPage() {
    const { surveys, setAccessSurveyMode, setSurvey } = useSurvey();
    const navigate = useNavigate();

    useEffect(() => {
        setAccessSurveyMode("");
        setSurvey(null)
        clearAccessPageMode();
    }, [])

    return (
        <div className='min-h-screen flex flex-col gap-4'>
            {surveys.length === 0 ? <div className='my-24 flex justify-center items-center text-[1.5rem] text-green-500'>You Don't Have Survey To Do Now</div> : ""}
            {surveys.map((el) => <SurveyCard key={el.id} surveyObj={el} btnWord={"get start"} />)}
        </div>
    )
}
