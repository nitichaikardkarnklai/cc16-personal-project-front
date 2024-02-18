import { useContext } from "react";
import { SurveyContext } from "../features/survey/contexts/SurveyContext";

export default function useSurvey() {
    return useContext(SurveyContext);
}