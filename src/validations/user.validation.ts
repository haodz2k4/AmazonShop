import { validPhone, validObjectId } from './custom.validation';
import Joi from 'joi';
export const getUsers = {
    query: Joi.object().keys({
        status: Joi.string().valid("active","inactive"),
        keyword: Joi.string(),
        searchBy: Joi.string(),
        page: Joi.number().integer().min(1),
        limit: Joi.number().integer().max(100),
        sortKey: Joi.string(),
        sortValue: Joi.string().valid("asc","desc"),
        only: Joi.string()
    })
}

export const createUser = {
    body: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        avatar: Joi.string().uri(),
        email: Joi.string().email().required(),
        password: Joi.string().email().required(),
        phone: Joi.string().required().custom(validPhone),
        birthDate: Joi.string().isoDate(),
        gender: Joi.string().valid("nam","nữ"),
        status: Joi.string().valid("active","inactive")
    })
}

export const updateUser = {
    params: Joi.object().keys({
        id: Joi.string().custom(validObjectId)
    }),
    body: Joi.object().keys({
        firstName: Joi.string(),
        lastName: Joi.string(),
        avatar: Joi.string().uri(),
        phone: Joi.string().custom(validPhone),
        birthDate: Joi.string().isoDate(),
        gender: Joi.string().valid("nam","nữ"),
        status: Joi.string().valid("active","inactive")
    })

}

export const getUser = {
    params: Joi.object().keys({
        id: Joi.string().custom(validObjectId)
    }),
}

export const deleteUser = {
    params: Joi.object().keys({
        id: Joi.string().custom(validObjectId)
    }),
}

export const loginUser = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().email().required()
    })
}

export const addAddress = {
    city: Joi.string().required(),
    street: Joi.string().required(),
    district: Joi.string().required()
}

export const getAddress = {
    params: Joi.object().keys({
        id: Joi.string().custom(validObjectId)
    })
}

export const removeAddress = {
    params: Joi.object().keys({
        id: Joi.string().custom(validObjectId)
    })
}

export const forgotPassword = {
    body: Joi.object().keys({
        email: Joi.string().email().required()
    })
}

export const verifyOtp = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        otp: Joi.number().integer().required()
    })
}

export const resetPassword = {
    body: Joi.object().keys({
        password: Joi.string().required()
    }),
    query: Joi.object().keys({
        token: Joi.string()
    })
}