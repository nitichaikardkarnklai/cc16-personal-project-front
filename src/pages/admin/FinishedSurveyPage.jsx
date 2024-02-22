import React from 'react';
import useSurvey from "../../hooks/use-survey";
import SurveyCard from '../../features/survey/components/SurveyCard';
import { useEffect } from 'react';
import * as userSurveyApi from "../../api/userSurvey";
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function FinishedSurveyPage() {
    const { surveys } = useSurvey();
    // const [avgData, setAvgData] = useState(null);

    useEffect(() => {
        // userSurveyApi
        //     .getAvgData()
        //     .then(res => {
        //         // console.log(res.data.avgData);
        //         // const avgDataTemp = 
        //         // for (let i = 0; i < surveys.questions.length; i++) {
        //         //     surveys.questions[i].avg

        //         // }

        //         setSurvey(surveys);
        //     })
        //     .catch(err => {
        //         toast.error(err.response?.data.message);
        //     })
    }, [])

    return (
        <div className='min-h-screen flex flex-col gap-4'>
            {surveys.map((el) => <SurveyCard key={el.id} surveyObj={el} btnWord="View Details" />)}
        </div>
    )
}
