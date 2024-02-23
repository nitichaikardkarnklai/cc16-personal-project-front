import Joi from "joi";
import { toast } from 'react-toastify';


const createSurveySchema = Joi.object({
    title: Joi.string().required().trim().messages({
        'string.empty': "front: survey title is required",
        "any.required": "front: survey title is required",
    }),
    description: Joi.string().trim(),
    startDate: Joi.date().required().messages({
        'string.empty': "front: startDate is required",
        "any.required": "front: startDate is required",
    }),
    endDate: Joi.date().required().messages({
        'string.empty': "front: endDate is required",
        "any.required": "front: endDate is required",
    }),
    image: Joi.optional().allow(''),
    isLive: Joi.boolean(),
    questions: Joi.array().items(
        Joi.object({
            title: Joi.string().required().trim().messages({
                'string.empty': "front: question title is required",
                "any.required": "front: question title is required",
            }),
            description: Joi.string().trim(),
            ratings: Joi.array().items(
                Joi.object({
                    name: Joi.string().required().messages({
                        'string.empty': "front: rating name is required",
                        "any.required": "front: rating name is required",
                    }),
                    score: Joi.number().integer().required().messages({
                        'string.empty': "front: rating score is required",
                        "any.required": "front: rating score is required",
                    })
                })
            )
        })
    )
});

const editSurveySchema = Joi.object({
    title: Joi.string().trim().required().messages({
        'string.empty': "front: survey title is required",
        "any.required": "front: survey title is required",
    }),
    description: Joi.string().trim().allow(''),
    startDate: Joi.date().required().messages({
        'string.empty': "front: startDate is required",
        "any.required": "front: startDate is required",
    }),
    endDate: Joi.date().required().messages({
        'string.empty': "front: endDate is required",
        "any.required": "front: endDate is required",
    }),
    image: Joi.optional().allow(''),
    isLive: Joi.boolean(),
    questions: Joi.array().items(
        Joi.object({
            title: Joi.string().trim().required().messages({
                'string.empty': "front: question title is required",
                "any.required": "front: question title is required",
            }),
            description: Joi.string().trim(),
            ratings: Joi.array().items(
                Joi.object({
                    name: Joi.string().required().messages({
                        'string.empty': "front: rating name is required",
                        "any.required": "front: rating name is required",
                    }),
                    score: Joi.number().required().integer().messages({
                        'string.empty': "front: rating score is required",
                        "any.required": "front: rating score is required",
                    })
                })
            )
        })
    )
});

export const validateCreateSurvey = (surveyObj) => {
    const { value, error } = createSurveySchema.validate(surveyObj);
    const currentTime = new Date();
    console.log(currentTime, value.startDate);

    currentTime.setHours(0, 0, 0, 0);
    if (error) {
        throw error
    }
    if (value.startDate > value.endDate) {
        throw new Error("front: start date cannot more than end date", 400);
    }
    if (value.startDate < currentTime || value.endDate < currentTime) {
        throw new Error("front: you don't have time machine", 400);
    }
    const endDateTemp = value.endDate;
    endDateTemp.setHours(30, 59, 59, 0);
    // endDateTemp.setHours(23, 59, 59, 999);
    value.endDate = endDateTemp;
    surveyObj = value;
    return surveyObj
};

export const validateEditSurvey = (surveyObj) => {
    const { value, error } = editSurveySchema.validate(surveyObj);
    const currentTime = new Date();
    // console.log(currentTime, value.startDate);

    currentTime.setHours(0, 0, 0, 0);
    if (error) {
        throw error
    }
    if (value.startDate > value.endDate) {
        throw new Error("front: start date cannot more than end date", 400);
    }
    if (value.startDate < currentTime || value.endDate < currentTime) {
        throw new Error("front: you don't have time machine", 400);
    }
    const endDateTemp = value.endDate;
    endDateTemp.setHours(30, 59, 59, 0);
    value.endDate = endDateTemp;
    surveyObj = value;

    return surveyObj
};