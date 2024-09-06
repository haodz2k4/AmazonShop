import { query } from "express";
import * as Custom from "./custom.validation"
import Joi from "joi";

export const getProducts = {
    query: Joi.object().keys({
        status: Joi.string().valid('active','inactive'),
        highlighted: Joi.string().valid('0','1'),
        categoryId: Joi.string().valid().custom(Custom.validObjectId),
        minPrice: Joi.number().integer().min(0),
        maxPrice: Joi.number().integer().min(10),
        page: Joi.number().integer().min(0).max(100),
        limit: Joi.number().integer().min(1),
        sortKey: Joi.string(),
        sortValue: Joi.string().valid('sortKey','sortValue'),
        only: Joi.string()
    })
}