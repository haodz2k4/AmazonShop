import { Request, Response, NextFunction } from "express"
import catchAync from "../utils/catchAync"
import { ApiError } from "../utils/error"
import * as TokenService from "../services/token.service"
import { JwtPayload } from "jsonwebtoken"
import { getAccountById } from "../services/account.service"
import { getCache } from "../services/cache.service"
export const requireAuth = catchAync(async (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers.authorization){
        throw new ApiError(401,"Token is required")
    }

    const token = req.headers.authorization.split(" ")[1]

    //decode token 
    const decoded = TokenService.verifyToken(token) as JwtPayload

    const id = decoded.id 
    const role = decoded.role 
    const cacheKey = `blacklist_${token}`
    //check token in blacklist 
    const isBlacklisted = await getCache(cacheKey)
    if(isBlacklisted === 'blacklisted'){
        throw new ApiError(403,"Token is not valid")
    }
    if(role === 'admin'){
        const account = await getAccountById(id)
        if(!account){
            throw new ApiError(401,"Account is not found")
        }
        res.locals.account = account
        
    }
    next()

})