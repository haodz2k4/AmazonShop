import redis from "../config/redis";

export const setCache = async (key: string, ttl: number | string, value: any) => {
    try {
        const ok = await redis.setex(key,ttl, JSON.stringify(value))
    } catch (error) {
        throw new Error("Cannot be set cache")
    }
} 

export const getCache = async (key: string) :Promise<any> => {
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

export const deleteCache = async (...key: string[]) :Promise<void>=> {
    try {
        await redis.del(key)
    } catch (error) {
        throw new Error("Cannot be delete cache")
    }
}

export const deleteKeysByPattern = async (pattern: string) => {
    let cursor = '0';
    do {
        const result = await redis.scan(cursor, 'MATCH', pattern);
        cursor = result[0];
        const keys = result[1];

        if (keys.length > 0) {
            await redis.del(...keys);
        }
    } while (cursor !== '0');
}