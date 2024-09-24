import { Request, Response } from "express"; 
import catchAync from "../utils/catchAync";
import pick from "../utils/pick";
import paginateHelper from "../helpers/paginate.helper";
import * as UserService from "../services/user.service";
import { sendOtpEmail } from "../services/email.service";
import { setCache, getCache, deleteCache } from "../services/cache.service";
import { generateRandomNumber } from "../helpers/generate.helper";
import * as TokenService from "../services/token.service"
import { buildRegExp } from "../utils/regExp";
import { ApiError } from "../utils/error";
import { JwtPayload } from "jsonwebtoken";

//[GET] "/api/users"
export const getUsers = catchAync(async (req: Request, res: Response) => {
    const filter: Record<string, any> = {}
    const find = pick(req.query,["status","gender"])

    const keyword = req.query.keyword as string 
    const searchBy = req.query.searchBy as string 

    if(searchBy && keyword){
        filter[searchBy] = buildRegExp(keyword)
    }else if(keyword){
        filter.$or = [
            { firstName: buildRegExp(keyword) },
            { lastName: buildRegExp(keyword) }
        ]
    }
    //pagination
    const page = parseInt(req.query.page as string) || 1 
    const limit = parseInt(req.query.limit as string) || 30
    const totalDocument = await UserService.getTotalDocument(filter)
    const pagination = paginateHelper(page, limit, totalDocument) 

    //sort 
    const sort: Record<string, "asc" | "desc"> = {}
    const sortKey = req.query.sortKey as string 
    const sortValue = req.query.sortValue as "asc" | "desc" 
    if(sortKey && sortValue){
        sort[sortKey] = sortValue
    }

    //select field 
    const selectFields = req.query.only as string || ""


    const users = await UserService.getUsersByQuery({filter: {...filter,...find}, pagination, sort, selectFields})
    res.json({users})
})

//[POST] "/api/users"
export const createUser = catchAync(async (req: Request, res: Response) => {
    const body = req.body 

    const user = await UserService.createUser(body)
    res.status(201).json({message: "create user successfully", user})
})

//[PATCH] "/api/users/:id"
export const updateUser = catchAync(async (req: Request, res: Response) => {
    const {id} = req.params 
    const body = req.body 
    const user = await UserService.updateUserById(id,body)
    res.status(200).json({message: "Updated user successfully", user})
})

//[PATCH] "/api/users/:id"
export const getUser = catchAync(async (req: Request, res: Response) => {
    const {id} = req.params 
    const user = await UserService.getUserById(id);
    if(!user){
        throw new ApiError(404,"User is not found")
    }
    res.json({user})
})

//[PATCH] "/api/users/:id"
export const deleteUser = catchAync(async (req: Request, res: Response) => {
    const {id} = req.params
    const user = await UserService.updateUserById(id, {deleted: true})
    res.status(200).json({message: "Deleted user successfully", user})
})

//[GET] "/api/users/profiles"
export const getProfileUser = catchAync(async (req: Request, res: Response) => {
    const user = res.locals.user 
    res.json({user})
})

//[GET] "/api/users/profiles"
export const updateProfileUser = catchAync(async (req: Request, res: Response) => {
    const user = res.locals.user 
    const body = req.body
    const userAfterUpdate = await UserService.updateUserById(user.id,body)
    res.json(200).json({user: userAfterUpdate})
})

//[POST] "/api/users/login"
export const loginUser = catchAync(async (req: Request, res: Response) => {
    const {email, password}= req.body 
    const user = await UserService.loginUser(email, password)
    const token = await TokenService.generateAuthUserToken(user.id)

    res.status(200).json({message: "Login successfull",user, token})
}) 

//[POST] "/api/users/address/"
export const addAddress = catchAync(async (req: Request, res: Response) => {
    const userId = res.locals.user.id 
    const {city, street, district} = req.body
    const address = await UserService.addAddress({userId, city, street, district})
    res.status(200).json({message: "Added address ", address})
})

//[GET] "/api/users/:id/address"
export const getAddresses = catchAync(async (req: Request, res: Response) => {
    const {id} = req.params 
    const addresses = await UserService.getAddressesByUserid(id)

    res.status(200).json({addresses})
})

//[DELETE] "/api/users/address/:id"
export const removeAddress = catchAync(async (req: Request, res: Response) => {
    const {id} = req.params
    await UserService.removeAddress(id)
    res.status(200).json({message: "Remove address successfull"})
})

//[POST] "/api/users/forgot-password"
export const forgotPassword = catchAync(async (req: Request, res: Response) => {
    const {email} = req.body
    
    const user = await UserService.getUserByEmail(email) 
    if(!user){
        throw new ApiError(404,"Email is not exists")
    }
    const otp = generateRandomNumber(6)
    await sendOtpEmail(email,otp)
    await setCache(`otp_${user.id}`,120,otp)
    res.status(200).json({message: "Send otp successfully"})

})

//[POST] "/api/users/verify-otp"
export const verifyOtp = catchAync(async (req: Request, res: Response) => {
    const {email, otp} = req.body 
    const user = await UserService.getUserByEmail(email) 
    if(!user){
        throw new ApiError(404,"Email is not exists")
    }
    const cacheData = await getCache(`otp_${user.id}`)
    if(!cacheData || cacheData !== otp){
        throw new ApiError(400,"Invalid otp")
    }
    await deleteCache(`otp_${user.id}`)
    const token = await TokenService.generateToken(user.id,'user',120)
    res.status(200).json({message: "Verify Otp successfully", token})
    
})

//[POST] "/api/users/reset-password"
export const resetPassword = catchAync(async (req: Request, res: Response) => {
    const {password} =req.body
    const {token} = req.query
    const decoded = await TokenService.verifyToken(token as string) as JwtPayload
    
    const isBlacklisted = await TokenService.checkTokenInBlackList(token as string)
    if(!decoded || decoded.role !== 'user' || isBlacklisted){
        throw new ApiError(404,"Invalid or expired verification token")
    }
    await TokenService.addTokenToBlacklist(token as string, 120)
    
    const user = await UserService.updateUserById(decoded.id,{password})
    res.status(200).json({ message: "Password reset successfully", user });

})