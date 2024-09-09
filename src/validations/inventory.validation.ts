import Joi from "joi";
import { validObjectId } from "./custom.validation";
export const getInventories = {
    query: Joi.object().keys({
        product_status: Joi.string().valid('active','inactive'),
        product_highlighted: Joi.string().valid('0','1'),
        supplier_status: Joi.string().valid('active','inactive'),
        product_keyword: Joi.string(),
        supplierKeyword: Joi.string(),
        sortKey: Joi.string(),
        sortValue: Joi.string().valid('asc','desc'),
        page: Joi.number().integer().min(1),
        limit: Joi.number().integer().min(1), 
        only: Joi.string() 
    })
} 

export const createInventory = {
    body: {
        productId: Joi.string().custom(validObjectId).required(),
        supplierId: Joi.string().custom(validObjectId).required(),
        quantity: Joi.number().integer().min(0),
        wareHouse: Joi.string().required()
    }
} 

export const getInventory = {
    params: {
        id: Joi.string().custom(validObjectId)
    }
}

export const updateInventory = {
    params: {
        id: Joi.string().custom(validObjectId)
    },
    body: {
        productId: Joi.string().custom(validObjectId),
        supplierId: Joi.string().custom(validObjectId),
        quantity: Joi.number().integer().min(0),
        wareHouse: Joi.string()
    }
}

export const deleteInventory = {
    params: {
        id: Joi.string().custom(validObjectId)
    }
}

