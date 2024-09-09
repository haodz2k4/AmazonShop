import { Schema,model, plugin } from "mongoose";
import {isURL, isEmail, isMobilePhone} from 'validator'
import {hash, compare} from "bcrypt"
import toJSONPlugin from "./plugins/toJSON.plugin";
export interface IAccount {
    fullName: string
    description: string
    avatar: string
    email: string
    password: string
    phone: string
    roleId: Schema.Types.ObjectId
    birthDate: Date
    deleted: boolean
    status: string 
}

const accountSchema = new Schema<IAccount>({
    fullName: {type: String, required: true, min: 3, max: 20},
    description: String,
    avatar: {
        type: String,
        validate: {
            validator:  function(val: string) {
                return isURL(val)
            },
            message: "Invalid url avatar"
        }
    },
    email: {
        type: String, 
        required: true, 
        unique: true,
        validate: {
            validator: function(val: string) {
                return isEmail(val)
            },
            message: "Invalid email"
        }
    },
    password: {
        type: String, 
        required: true,
        len: 8,
        private: true
    },
    phone: {
        type: String, 
        required: true,
        validate: {
            validator: function(val: string) {
                return isMobilePhone(val)
            },
            message: 'phone is not valid'
        }
    },
    roleId: {type: Schema.Types.ObjectId, required: true, ref: 'role'},
    birthDate: Date,
    deleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["active","inactive"],
        default: "active"
    }
},{timestamps: true}) 


accountSchema.pre('save',async function(next) {
    if(this.isModified('password')) {
        this.password = await hash(this.password,8)
    } 
    next()
})

export default model('account',accountSchema)

