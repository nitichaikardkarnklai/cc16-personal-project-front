const deleteAllIdKeyFromSurvey = survey => {
    delete survey.id;
    delete survey.createdAt;
    for (let el of survey.questions) {
        delete el.id
        delete el.surveyId
    }
    for (let id in survey.questions) {
        for (let el of survey.questions[id].ratings) {
            delete el.id
            delete el.questionId
        }
    }
    return survey
}

export default deleteAllIdKeyFromSurvey;