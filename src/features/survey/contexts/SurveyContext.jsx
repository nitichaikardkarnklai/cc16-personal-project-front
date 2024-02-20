import { createContext, useState, useEffect } from "react";
import * as surveyApi from "../../../api/survey";
import { toast } from "react-toastify";
import { useLocation } from 'react-router-dom';
import useAuth from "../../../hooks/use-auth";

export const SurveyContext = createContext();

export default function SurveyContextProvider({ children }) {
    const [surveys, setSurveys] = useState([]);
    const [survey, setSurvey] = useState(null);
    const [accessSurveyMode, setAccessSurveyMode] = useState("");
    const [onFetchSurvey, setOnFetchSurvey] = useState(false);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const { authUser } = useAuth();

    useEffect(() => {
        if (location.pathname === "/admin/create" || location.pathname === "/comingSoon") {
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
        } else if (location.pathname === "/") {
            surveyApi
                .getNotDoSurvey(authUser.id)
                .then(res => {
                    setSurveys(res.data.notSubmitSurvey)
                    // console.log(res.data)
                })
                .catch(err => {
                    toast.error(err.response?.data.message);
                })
        } else if (location.pathname === "/history") {
            surveyApi
                .getDoneSurvey(authUser.id)
                .then(res => {
                    setSurveys(res.data.doneSurvey)
                    // console.log(res.data)
                })
                .catch(err => {
                    toast.error(err.response?.data.message);
                })
        }
    }, [location, onFetchSurvey])

    return (
        <SurveyContext.Provider
            value={{
                surveys,
                setOnFetchSurvey,
                survey,
                setSurvey,
                accessSurveyMode,
                setAccessSurveyMode,
                loading
            }}>
            {children}
        </SurveyContext.Provider>
    )
}