export const avgSurveyScorePercentage = questionArr => {
    // console.log(questionArr);
    let result = 0;
    for (let i = 0; i < questionArr.length; i++) {
        result = result + +questionArr[i].avg / questionArr.length;
    }
    result = Math.round(result / questionArr.length * 100);
    // console.log(result);
    return result || "NaN"
};