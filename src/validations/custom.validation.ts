import {CustomHelpers} from "joi"
import { isValidObjectId } from "mongoose"

export const validObjectId = (value: any, helper: CustomHelpers) => {
    if(!isValidObjectId(value)){
        return helper.error('any.invalid', {message: 'The category id is not valid.'})
    }
    return value
}