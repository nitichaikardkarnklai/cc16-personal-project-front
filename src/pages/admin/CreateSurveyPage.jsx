import Button from '../../components/Button';
import SurveyCard from '../../features/survey/components/SurveyCard';
import useSurvey from '../../hooks/use-survey';
import { useNavigate } from 'react-router-dom';

export default function CreateSurveyPage() {
    const { surveys } = useSurvey();
    const navigate = useNavigate();

    return (
        <div className='min-h-screen flex flex-col gap-4'>
            <Button bg="blue" text="white" width="full" onClick={() => navigate("/admin/surveyForm")}>Create Survey</Button>
            {surveys.map((el) => <SurveyCard key={el.id} surveyObj={el} btnWord="Edit" />)}
        </div>
    )
}