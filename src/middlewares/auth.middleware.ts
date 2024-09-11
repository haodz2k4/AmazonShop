import { Request, Response, NextFunction } from "express"
import catchAync from "../utils/catchAync"
import { ApiError } from "../utils/error"
import * as TokenService from "../services/token.service"
import { JwtPayload } from "jsonwebtoken"
import { getAccountById } from "../services/account.service"
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
    if(role === 'admin'){
        const account = await getAccountById(id)
        if(!account){
            throw new ApiError(401,"Account is not found")
        }
        res.locals.account = account
        
    }else {

    }

    next()

})


/*
Permission chỉ dành cho admin
- Ví dụ:
User có thể call api get được vài cái như products, category, nhưng nếu cái product, category đó
Nằm trong trang quảng trị thì phải phân quyền, có 4 quyền cơ bản CRUD  
Vì vậy nếu là user, requirePermissions sẽ được chấp nhận còn nếu là admin nó sẽ tiến hành thông qua phân quyền 
*/
export const requirePermissions = (permission: string) => {
    
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            if(req.headers.authorization){
                const token = req.headers.authorization?.split(" ")[1];
                const isBlacklist = await TokenService.checkTokenInBlackList(token);
                
                const decoded = TokenService.verifyToken(token) as JwtPayload;
                if(decoded.role === 'admin'){
                    const account = await getAccountById(decoded.id)
                    if(!account){
                        throw new ApiError(404,"Account is not found")
                    }
                    if(isBlacklist){
                        throw new ApiError(403,"Invalid token")
                    }
                    const role = await getRoleById(account.roleId.toString())
                    if(!role?.permissions.includes(permission)){
                        throw new ApiError(403,"you do not have enough authority")
                    }
                    
                }
            }
            
            next() 
        } catch (error) {
            next(error)
        }
    }
}