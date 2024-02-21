const ACCESS_TOKEN = "token";
const SURVEY = "survey";
const ACCESS_PAGE_MODE = "accessPageMode"

export const storeToken = token => localStorage.setItem(ACCESS_TOKEN, token);
export const getToken = () => localStorage.getItem(ACCESS_TOKEN);
export const clearToken = () => localStorage.removeItem(ACCESS_TOKEN);

export const storePrevSurvey = survey => localStorage.setItem(SURVEY, survey);
export const getPrevSurvey = () => localStorage.getItem(SURVEY);
export const clearPrevSurvey = () => localStorage.removeItem(SURVEY);

export const storeAccessPageMode = mode => localStorage.setItem(ACCESS_PAGE_MODE, mode);
export const getAccessPageMode = () => localStorage.getItem(ACCESS_PAGE_MODE);
export const clearAccessPageMode = () => localStorage.removeItem(ACCESS_PAGE_MODE);