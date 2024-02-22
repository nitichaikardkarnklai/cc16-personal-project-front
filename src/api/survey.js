import axios from "../config/axios";

export const createSurvey = surveyObj => axios.post("/surveys", surveyObj);
export const getNotStartSurvey = () => axios.get(`/surveys/not-start`);
export const getOngoingSurvey = () => axios.get(`/surveys/ongoing`);
export const getFinishedSurvey = () => axios.get(`/surveys/finished`);

export const deleteSurvey = (id) => axios.delete(`/surveys/${id}`);
export const editSurvey = (id, surveyObj) => axios.patch(`/surveys/${id}`, surveyObj);

export const getNotDoSurvey = (userId) => axios.get(`/surveys/not-finish/users/${userId}`);
export const getDoneSurvey = (userId) => axios.get(`/surveys/finished/users/${userId}`);
