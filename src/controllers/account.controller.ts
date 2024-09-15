
import { Request, Response } from "express";
import catchAync from "../utils/catchAync";
import * as AccountService from "../services/account.service"
import * as TokenService from "../services/token.service"
import * as CacheService from "../services/cache.service"
import paginateHelper from "../helpers/paginate.helper";
import pick from "../utils/pick";
import { ApiError } from "../utils/error";
import ms from "ms";
import { JwtPayload } from "jsonwebtoken";
import moment from "moment"


//[GET] "/api/accounts"
export const getAccounts = catchAync(async (req: Request, res: Response) => {

    const filter = pick(req.query,["status","roleId"])

    const page = parseInt(req.query.page as string) || 1  
    const limit = parseInt(req.query.limit as string) || 10
    const totalDocument = await AccountService.getTotalDocument(filter)
    const pagination = paginateHelper(page, limit,totalDocument)

    const sort: Record<string,"asc" | "desc"> ={}
    const sortKey = req.query.sortKey as string 
    const sortValue = req.query.sortValue as "asc" | "desc" 
    if(sortKey && sortValue){
        sort[sortKey] = sortValue
    }
    const selectFields = req.query.only as string || ""
    const accounts = await AccountService.getAllAccountByQuery({filter,pagination, sort, selectFields})
    res.json({accounts, pagination})
})

//[GET] "/api/accounts/:id"
export const getAccount = catchAync(async (req: Request, res: Response) => {
    const {id} = req.params 
    const account = await AccountService.getAccountById(id)
    if(!account){
        throw new ApiError(404,"Account is not found")
    }
    res.status(200).json({account})
})

//[GET] "/api/accounts/profiles"
export const getProfileAccount = catchAync(async (req: Request, res: Response) => {
    const account = res.locals.account 
    res.json({account})
})

//[PATCH] "/api/accounts/:id"
export const updateAccount = catchAync(async (req: Request, res: Response) => {
    const {id} = req.params 
    const body = req.body
    const account = await AccountService.updateAccountById(id,body)
    res.status(200).json({account})
})

//[POST] "/api/accounts"
export const createAccount = catchAync(async (req: Request, res: Response) => {
    const body = req.body 

    const account = await AccountService.createAccount(body)
    res.status(201).json({message: "Created account successfully", account})
})

//[PATCH] "/api/accounts/:id"
export const deleteAccount = catchAync(async (req: Request, res: Response) => {
    const {id} = req.params 
    const account = await AccountService.updateAccountById(id,{deleted: true})
    res.status(200).json({account})
}) 

//[POST] "/api/accounts/login"
export const loginAccount = catchAync(async (req: Request, res: Response) => {
    const {email, password} = req.body 

    const account = await AccountService.loginWithEmailAndPassword(email, password) 
    const token = await TokenService.generateAuthAdminToken(account.id)

    res.status(200).json({message: "login successfully",account, ...token})
}) 

//[POST] "/api/accounts/refresh-token"
export const refreshToken = catchAync(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken 
    
    if(!refreshToken){
        throw new ApiError(401,"Refresh token is required")
    }
    //decoded refresh token 
    const decoded = TokenService.verifyToken(refreshToken) as JwtPayload;
    const cacheKey = `${decoded?.role}:${decoded.id}`
    //get refreshtoken from redis
    const cacheData = await CacheService.getCache(cacheKey)
    //check refreshtoken and check cache data not equals with refreshtoken
    if(!cacheData || cacheData !== refreshToken){
        throw new ApiError(403, "Invalid refresh token")
    }

    const newToken = await TokenService.generateAuthAdminToken(decoded.id)
    res.status(200).json({message: "Refresh token successfully", ...newToken})
})

//[GET] "/api/accounts/logout"
export const logout = catchAync(async (req: Request, res: Response) => {

    //RefreshToken 
    const refreshToken = req.cookies.refreshToken 
    await CacheService.deleteCache(refreshToken)
    //Access Token 
    if(!req.headers.authorization){
        throw new ApiError(401,"Access token is required")
    }
    const accessToken = req.headers.authorization.split(" ")[1]  
    
    //decoded token to get exp time
    const decoded = TokenService.decodeToken(accessToken) as JwtPayload 
    //Add token to blacklist
    const ttl = decoded.exp as number - Math.floor(Date.now() / 1000)
    await TokenService.addTokenToBlacklist(accessToken,ttl) 

    res.status(200).json({message: "Logout successfully"})

})