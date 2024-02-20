import { useEffect } from 'react';
import { deleteSurvey } from '../../api/survey';
import Button from '../../components/Button';
import SurveyCard from '../../features/survey/components/SurveyCard';
import useSurvey from '../../hooks/use-survey';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CreateSurveyPage() {
    const { surveys, setOnFetchSurvey, setAccessSurveyMode, setSurvey } = useSurvey();
    const navigate = useNavigate();

    useEffect(() => {
        setAccessSurveyMode("");
        setSurvey(null)
    }, [])

    const handleDeleteSurvey = async (id) => {
        if (confirm("Are you sure to delete?")) {
            try {
                await deleteSurvey(id);
                // console.log(JSON.stringify(input, null, 4));
                // console.log("you confirm delete");

                toast.success("Delete Survey Successfully");
                setOnFetchSurvey(c => !c);

            } catch (err) {
                console.log(err);
                toast.error(err.response?.data.message);
            }
        } else {
            // console.log("you cancel delete");
            toast.success("Cancel Delete Successfully");
        }

    }

    return (
        <div className='min-h-screen flex flex-col gap-4'>
            <Button bg="blue" text="white" width="full" onClick={() => navigate("/admin/surveyForm")}>Create Survey</Button>
            {surveys.map((el) => <SurveyCard onDelete={handleDeleteSurvey} key={el.id} surveyObj={el} btnWord="Edit" />)}
        </div>
    )
}