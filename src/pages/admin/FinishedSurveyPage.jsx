import React from 'react';
import useSurvey from "../../hooks/use-survey";
import SurveyCard from '../../features/survey/components/SurveyCard';

export default function FinishedSurveyPage() {
    const { surveys } = useSurvey();

    return (
        <div className='min-h-screen'>
            {surveys.map((el) => <SurveyCard key={el.id} surveyObj={el} btnWord="View" />)}
        </div>
    )
}
