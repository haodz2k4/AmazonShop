import jwt from "jsonwebtoken"
import config from "../config/config"
import * as CacheService from "../services/cache.service"
import ms from "ms"

export const generateToken = (
    id: string,
    role: 'admin' | 'user',
    expiresIn: string | number,
    secretKey: string = config.jwt.secret as string
) => {
    const payload = {
        id,
        role
    }
    return jwt.sign(payload,secretKey,{expiresIn})
}



export const generateAuthAdminToken = async (accountId: string) => {
    const role = 'admin'
    const accessToken = generateToken(accountId,role,config.jwt.accessExpires as string) 

    const refreshToken = generateToken(accountId,role,config.jwt.refreshExpires as string) 

    const ttlInSecond = ms(config.jwt.refreshExpires as string) / 1000
    await CacheService.setCache(`${role}:${accountId}`,ttlInSecond,refreshToken)

    
    return {
        token: {
            accessToken,
            refreshToken
        }
    }
}

export const verifyToken = (token: string, secretKey: string = config.jwt.secret as string) => {
    return jwt.verify(token, secretKey)
}