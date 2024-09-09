import {CustomHelpers} from "joi"
import { isValidObjectId } from "mongoose"
import slugify from "slugify"

export const validObjectId = (value: any, helper: CustomHelpers) => {
    if(!isValidObjectId(value)){
        return helper.error('any.invalid', {message: 'The category id is not valid.'})
    }
    return value
}

export const ValidSlug = (value: any, helper: CustomHelpers) => {
    const initSlug = slugify(value,{lower: true, strict: true})
    if(initSlug !== value){
        return helper.error('any.invalid',{message: `${value} is invalid slug`})
    }

    return initSlug
}