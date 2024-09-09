import Joi from "joi";
import {validObjectId, ValidSlug} from "./custom.validation"
export const getCategories = {
    query: Joi.object().keys({
        status: Joi.string().valid('active','inactive'),
        parentCategory: Joi.string().custom(validObjectId),
        page: Joi.number().integer().min(1),
        limit: Joi.number().integer().min(1),
        sortKey: Joi.string(),
        sortValue: Joi.string().valid("asc", "desc"),
        only: Joi.string() 
    })
}

export const getCategory = {
    params: Joi.object().keys({
        id: Joi.string().custom(validObjectId)
    }),
}

export const getCategoryBySlug = {
    params: Joi.object().keys({
        slug: Joi.string().custom(ValidSlug)
    })
}

export const createCategory = {
    body: Joi.object().keys({
        title: Joi.string().required().min(2).max(150),
        thumbnail: Joi.string().uri(),
        description: Joi.string(),
        parentCategory: Joi.string().custom(validObjectId)
    })
}