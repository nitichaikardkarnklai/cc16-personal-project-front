import React from 'react';
import useSurvey from "../../hooks/use-survey";
import SurveyCard from '../../features/survey/components/SurveyCard';


export default function PreviousSurveyPage() {
    const { surveys } = useSurvey();

    return (
        <div className='min-h-screen flex flex-col gap-4'>
            {surveys.map((el) => <SurveyCard key={el.id} surveyObj={el} btnWord="In-progress" />)}
        </div>
    )
}