import axios from "../config/axios";

export const createUserSurvey = (userId, userSurveyObj) => axios.post(`/user-surveys/users/${userId}`, userSurveyObj);
export const getUserSurveyByUserId = (userId, surveyId) => axios.get(`/user-surveys/surveys/${surveyId}/users/${userId}`);
export const getAvgData = () => axios.get("/user-surveys/average");