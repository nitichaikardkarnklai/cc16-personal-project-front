import axios from "../config/axios";

export const createSurvey = surveyObj => axios.post("/surveys", surveyObj);

export const getNotStartSurvey = () => axios.get(`/surveys/not-start`);
export const getOngoingSurvey = () => axios.get(`/surveys/ongoing`);
export const getFinishedSurvey = () => axios.get(`/surveys/finished`);

