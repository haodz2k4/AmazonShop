import { Request, Response, NextFunction } from "express"
import catchAync from "../utils/catchAync"
import { ApiError } from "../utils/error"
import * as TokenService from "../services/token.service"
import { JwtPayload } from "jsonwebtoken"
import { getAccountById } from "../services/account.service"
import { getUserById } from "../services/user.service"
import { getRoleById } from "../services/role.service"


export const requireAuth = catchAync(async (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers.authorization){
        throw new ApiError(401,"Token is required")
    }
    const token = req.headers.authorization.split(" ")[1]
    //decode token 
    const decoded = TokenService.verifyToken(token) as JwtPayload
    const {id, role} = decoded
    const isBlacklist = await TokenService.checkTokenInBlackList(token);
    if(isBlacklist){
        throw new ApiError(403,"Invalid token")
    }
    console.log(id, role)
    if(role === 'admin'){
        const account = await getAccountById(id)
        if(!account){
            throw new ApiError(401,"Account is not found")
        }
        res.locals.account = account
        
    }else {
        const user = await getUserById(id)
        if(!user){
            throw new ApiError(401,"user is not found")
        }
        res.locals.user = user 
    }

    next()

})


/*
require permissions is always after require auth
permissons is only apply for admin
*/
export const requirePermissions = (permission: string) => {
    
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const account = res.locals.account;
            if(!account){
                throw new ApiError(404, "Account is not found")
            }
            const role = await getRoleById(account.RoleId);
            
            if(!role?.permissions.includes(permission)){
                throw new ApiError(403,"You do not have enough authority")
            }
            res.locals.role = role
            next() 
        } catch (error) {
            next(error)
        }
    }
}