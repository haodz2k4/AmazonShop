import { model } from "mongoose"
import slugify from "slugify"

export const createUniqueSlug = async (collectionName: string,field: string) :Promise<string> => {
    
    let initSlug = slugify(field,{strict: true, lower: true})
    let count = 1;
    while( await model(collectionName).findOne({slug: initSlug})){
        initSlug = `${initSlug}-${count}`
        count++
    }
    return initSlug
}