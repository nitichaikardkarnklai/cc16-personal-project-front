import React from 'react'
import Button from '../../../components/Button'
import formatDate from '../../../utils/format-date';
import { useNavigate } from 'react-router-dom';
import useSurvey from '../../../hooks/use-survey';
import { storeAccessPageMode } from '../../../utils/local-storage';
import { useLocation } from 'react-router-dom';
import AvgScore from './AvgScore';
import * as myMath from "../../../utils/myMath"

export default function SurveyCard({ surveyObj, btnWord, onDelete }) {
    const { id, title, description, startDate, endDate, image } = surveyObj;
    const navigate = useNavigate();
    const location = useLocation();
    const { setSurvey, setAccessSurveyMode } = useSurvey();

    const startDateFormat = formatDate(startDate);
    const endDateFormat = formatDate(endDate);

    const handleViewSurvey = (e, surveyObj) => {
        setAccessSurveyMode(c => "viewOnly");
        setSurvey(c => surveyObj);
        navigate("/admin/surveyForm");
    }

    const handleEditSurvey = (e, surveyObj) => {
        setAccessSurveyMode(c => "edit");
        setSurvey(c => surveyObj);
        navigate("/admin/surveyForm");
    }

    const handleViewHistory = (e, surveyObj) => {
        setAccessSurveyMode(c => "viewHistoryOnly");
        storeAccessPageMode("viewHistoryOnly");
        setSurvey(c => surveyObj);
        navigate("/DoSurveyForm");
    }

    const handleGetStart = (e, surveyObj) => {
        setAccessSurveyMode(c => "doSurvey");
        storeAccessPageMode("doSurvey");
        setSurvey(c => surveyObj);
        navigate("/DoSurveyForm");
    }

    let renderBtn = <></>;
    switch (btnWord?.toLowerCase()) {
        case "edit":
            renderBtn = <Button bg="gray" text="black" onClick={(e) => handleEditSurvey(e, surveyObj)}>Edit</Button>;
            break;
        case "view details":
            renderBtn = (<div className='flex gap-4'>
                <Button onClick={(e) => handleViewSurvey(e, surveyObj)} bg="blue" text="white" >View Details</Button>
                <div className={"bg-gray-300 rounded-md py-2 px-4 flex items-center"}>Finished: {Math.round(surveyObj.countDoSurvey / surveyObj.countTotalUser * 100)}%</div>
            </div>);
            break;
        case "view your choice":
            renderBtn = <Button onClick={(e) => handleViewHistory(e, surveyObj)} bg="blue" text="white" >View Your Choice</Button>;
            break;
        case "in-progress":
            renderBtn = (<div className='flex gap-4'>
                <Button onClick={(e) => handleViewSurvey(e, surveyObj)} bg="blue" text="white" >View</Button>
                <div className={"bg-gray-300 rounded-md py-2 px-4 flex items-center"}>In-progress: {Math.round(surveyObj.countDoSurvey / surveyObj.countTotalUser * 100)}%</div>
            </div>);
            break;
        case "get start":
            renderBtn = <Button onClick={(e) => handleGetStart(e, surveyObj)} bg="green" text="white" >Get Start</Button>;
            break;
        case "coming soon":
            renderBtn = <div className={"bg-gray-300 rounded-md py-2 px-4 flex items-center"}>{Math.ceil((new Date(startDate) - new Date()) / (1000 * 60 * 60 * 24)) == 1 ? "One Day Left" : Math.ceil((new Date(startDate) - new Date()) / (1000 * 60 * 60 * 24)) + " Days Left"}</div>;
            break;
        default:
            renderBtn = <div className={"bg-gray-300 rounded-md py-2 px-4 flex items-center"}>{btnWord}</div>;
    }

    return (
        <div className='flex flex-col gap-2 w-full bg-amber-200 rounded-lg py-4 px-4'>
            <div className='flex justify-between'>
                <div className='font-bold'>{title}</div>
                {onDelete ? <button onClick={(e) => onDelete(id)}>&#x2715;</button> : ""}
            </div>
            <div>{description}</div>
            <div className='flex justify-between items-center'>
                <div className='flex gap-16'>
                    <div>
                        <span>Start Date: </span>
                        <span className='font-bold'>{startDateFormat}</span>
                    </div>
                    <div>
                        <span>End Date: </span>
                        <span className='font-bold'>{endDateFormat}</span>
                    </div>
                </div>
                {renderBtn}
            </div>
            {location.pathname === "/admin/finished" ?
                <>
                    <div>
                        Average Score (%): <span className='font-bold'>{myMath.avgSurveyScorePercentage(surveyObj?.questions)}%</span>
                    </div>
                    {surveyObj?.questions.map((el, id) => el.avg ? <AvgScore key={id} questionObj={el} /> : "")}
                </>
                :
                ""
            }
            {/* <div className='w-full flex items-center justify-center rounded-md bg-slate-400 min-h-16'>Image</div> */}
        </div>
    )
}