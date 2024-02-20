import { useEffect } from 'react';
import Button from '../../components/Button';
import SurveyCard from '../../features/survey/components/SurveyCard';
import useSurvey from '../../hooks/use-survey';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function HistoryPage() {
    const { surveys, setAccessSurveyMode, setSurvey } = useSurvey();
    const navigate = useNavigate();

    useEffect(() => {
        setAccessSurveyMode("");
        setSurvey(null)
    }, [])

    return (
        <div className='min-h-screen flex flex-col gap-4'>
            {surveys.map((el) => <SurveyCard key={el.id} surveyObj={el} btnWord={"view your choice"} />)}
        </div>
    )
}
