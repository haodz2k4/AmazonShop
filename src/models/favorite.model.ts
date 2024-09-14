import { Schema, model, Types } from 'mongoose';
import User from "../models/user.model"

interface IFavorite {
    userId: Types.ObjectId,
    productIds: Types.ObjectId[] 
}

const favoriteSChema = new Schema<IFavorite>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        validate: {
            validator: async function(val) {
                const user = await User.findOne({_id: val, deleted: false})
                return !!user 
            },
            message: 'User is not found'
        }
    },
    productIds: [{type: Schema.Types.ObjectId, ref: 'product'}] 
})


export default model('favorite',favoriteSChema)