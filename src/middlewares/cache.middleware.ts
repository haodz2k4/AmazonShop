import { Request, Response, NextFunction } from "express"
import * as CacheService from "../services/cache.service"

export const cacheMiddleware = (key: string, ttl: string | number) => {

    return async (req: Request, res: Response, next: NextFunction):Promise<void> => {
        try {
            const cacheKey = `${key}:${req.originalUrl}`
            const cachedData = await CacheService.getCache(cacheKey);
            if(cachedData){
                res.json(cachedData)
                return 
            }
            const originalJson = res.json.bind(res);
    
            res.json = (data) => {
            CacheService.setCache(cacheKey, ttl, data);
            return originalJson(data);
            };
            next()
        } catch (error) {
            next(error)
        }

    }
} 

export const valiationCacheMiddleware = (key: string) => {
    return async (req: Request, res: Response, next: NextFunction):Promise<void> => {

        try {
            if (req.method === 'POST') {
                await CacheService.deleteKeysByPattern(`${key}s:*`);
            } else {
                await CacheService.deleteKeysByPattern(`${key}s:*`);
                await CacheService.deleteCache(`${key}:${req.originalUrl}`);
            }
            next();
        } catch (error) {
            next(error);
        }

    }
}


