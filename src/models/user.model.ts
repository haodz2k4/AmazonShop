import { Schema, model, Model } from "mongoose";
import {isURL, isMobilePhone, isEmail} from "validator"
import { compare, hash } from "bcrypt";
import toJSONPlugin from "./plugins/toJSON.plugin";
interface IUser {
    _id: Schema.Types.ObjectId
    firstName: string,
    lastName: string,
    avatar: string,
    email: string,
    password: string,
    phone: string,
    birthDate: Date,
    address: [{
        city: string,
        street: string,
        district: string 
    }],
    defaultAddress: number,
    gender: "nam" | "nữ",
    status: "active" | "inactive",
    deleted: boolean
}


interface IUserMethod {
    isPasswordMatch(password: string): Promise<boolean>
}
const userSchema = new Schema<IUser,{},IUserMethod>({
    firstName: {type: String, required: true,minlength: 1, maxlength: 20},
    lastName: {type: String, required: true,minlength: 1, maxlength: 20},
    email: {
        type: String, 
        required: true,
        minlength: 6, 
        maxlength: 50, 
        unique: true,
        validate: {
            validator: function(val: string): boolean {
                return isEmail(val)
            },
            message: 'Invalid email'
        }
    },
    avatar: {
        type: String,
        validate: {
            validator: function(val: string): boolean {
                return isURL(val)
            },
            message: 'Invalid URL'
        }
    },
    password: {
        type: String, 
        required: true,
        minlength: 8,
        validate: {
            validator: function(value: string): boolean {
                if(!value.match(/\d/) || !value.match(/[a-zA-Z]/)){
                    return false 
                }
                return true
            },
            message: 'Password must contain at least one letter and one numbe'
        },
        private: true
    },
    phone: {
        type: String, 
        required: true,
        minlength: 8, 
        maxlength: 10,
        validate:{
            validator: function(val: string): boolean {
                return isMobilePhone(val)
            },
            message: 'Invalid Mobile From'
        }
    },
    birthDate: {
        type: Date, 
        required: true
    },
    address: [{
            city: {type: String},
            street: {type: String},
            district: {type: String} 
        }
    ],
    defaultAddress: {
        type: Number,
        default: 0
    },
    gender: {type: String, enum: ["nam","nữ"]},
    status: {type: String, enum: ["active","inactive"], default: "active"},
    deleted: {
        type: Boolean,
        default: false
    }
},{timestamps: true}) 

userSchema.plugin(toJSONPlugin)

userSchema.methods.isPasswordMatch = async function(password: string) :Promise<boolean> {
    return await compare(password,this.password)
} 

userSchema.pre('save', async function(next) {

    if(this.isModified('password')){
        this.password = await hash(this.password, 10)
    }

    next()
})


export default model<IUser>('user',userSchema)