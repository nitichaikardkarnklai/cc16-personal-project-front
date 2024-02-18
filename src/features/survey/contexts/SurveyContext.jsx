import { createContext, useState, useEffect } from "react";
import * as surveyApi from "../../../api/survey";
import { toast } from "react-toastify";
import { useLocation } from 'react-router-dom';

export const SurveyContext = createContext();

export default function SurveyContextProvider({ children }) {
    const [surveys, setSurveys] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/admin/create") {
            // console.log("createPath", location.pathname);
            surveyApi
                .getNotStartSurvey()
                .then(res => {
                    setSurveys(res.data.notStartSurvey)
                })
                .catch(err => {
                    toast.error(err.response?.data.message);
                })
        } else if (location.pathname === "/admin/ongoing") {
            // console.log("ongoingPath", location.pathname);
            surveyApi
                .getOngoingSurvey()
                .then(res => {
                    setSurveys(res.data.ongoingSurvey)
                })
                .catch(err => {
                    toast.error(err.response?.data.message);
                })
        } else if (location.pathname === "/admin/finished") {
            // console.log("finishedPath", location.pathname);
            surveyApi
                .getFinishedSurvey()
                .then(res => {
                    setSurveys(res.data.finishedSurvey)
                })
                .catch(err => {
                    toast.error(err.response?.data.message);
                })
        }
    }, [location])

    return (
        <SurveyContext.Provider
            value={{
                surveys
            }}>
            {children}
        </SurveyContext.Provider>
    )
}