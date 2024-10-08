import {Model, ObjectId, Schema, model, plugin, Document} from "mongoose"
import { isURL } from "validator"
import { createUniqueSlug } from "../helpers/slug.helper"

import toJSONPlugin from "./plugins/toJSON.plugin"
export interface IProduct extends Document{
    id: string 
    title: string
    categoryId: ObjectId
    description: string
    highlighted: string
    position: number 
    thumbnail: string 
    price: number
    discountPercentage: number 
    deleted: boolean
    slug: string
    status: string
    quantity?: number

}

const productSchema = new Schema<IProduct>({
    title: {
        type: String,
        required: [true,'title is required'],
        minlength: 2,
        maxlength: 200 
    },
    categoryId: {
        type: Schema.Types.ObjectId, ref: 'category',
        required: [true,'categoryId is required'],
        validate: {
            validator: async function(v: string) {
                const category = await model('category').findOne({_id: this.categoryId, deleted: false})
                return category !!
            },
            message: 'categoryId is not exists',
        },
        
    },
    position: {type: Number, min: 1},
    description: String,
    highlighted: {type: String, enum: ["0","1"],default: "0"},
    thumbnail: {
        type: String, 
        validate: {
            validator: function(v: string) {
                return isURL(v)
            },
            message: 'invalid thumbnail'
        }
    },
    price: {type: Number, min: [0,'Minimum price is 0']},
    discountPercentage: {type: Number, min: [0,'Minimum discountPercentage is 0'], max: [100,'Maxium discountPercentage is 100']},
    deleted: {type: Boolean, default: false},
    slug: {type: String, unique: true},
    status: {type: String, enum: {values: ["active","inactive"],message: 'Status must be either "active" or "inactive"'}},


},{
    timestamps: true
})


//Plugin
productSchema.plugin(toJSONPlugin)

const collectionName = 'product'

productSchema.pre('save', async function(next) {

    try {

        if(this.isModified('title')){
            this.slug = await createUniqueSlug(collectionName, this.title)
        }
        next()
    } catch (error) {
        next(error as any)
    }
})

export default model<IProduct>(collectionName,productSchema)