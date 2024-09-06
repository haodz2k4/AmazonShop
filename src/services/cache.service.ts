import redis from "../config/redis";

export const setCache = async (key: string, ttl: number | string, value: any) => {
    try {
        const ok = await redis.setex(key,ttl, value)
    } catch (error) {
        throw new Error("Cannot be set cache")
    }
} 

export const getCache = async (key: string) => {
    try {
        const result = await redis.get(key)
        if(!result){
            return result
        }
        return JSON.parse(result)
    } catch (error) {
        throw new Error("Cannot be get cache")
    }
}

export const deleteCache = async (...key: string[]) => {
    try {
        await redis.del(key)
    } catch (error) {
        throw new Error("Cannot be delete cache")
    }
}