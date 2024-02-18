import React from 'react'
import Button from '../../../components/Button'
import formatDate from '../../../utils/format-date';

export default function SurveyCard({ surveyObj, btnWord }) {
    const { id, title, description, startDate, endDate, image } = surveyObj;

    const startDateFormat = formatDate(startDate);
    const endDateFormat = formatDate(endDate);

    let renderBtn = <></>;
    switch (btnWord.toLowerCase()) {
        case "edit":
            renderBtn = <Button bg="gray" text="black" >{btnWord}</Button>;
            break;
        case "view":
            renderBtn = <Button bg="blue" text="white" >{btnWord}</Button>;
            break;
        case "in-progress":
            renderBtn = <div className={"bg-gray-300 rounded-md py-2 px-4"} >In-progress: </div>;
            break;
        case "get start":
            renderBtn = <Button bg="green" text="white" >{btnWord}</Button>;
            break;
        default:
            renderBtn = <></>;
    }
    return (
        <div className='flex flex-col gap-2 w-full bg-amber-200 rounded-lg min-h-48 py-4 px-4'>
            <div className='font-bold'>{title}</div>
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
            <div className='w-full flex items-center justify-center rounded-md bg-slate-400 min-h-16'>Image</div>
        </div>
    )
}
