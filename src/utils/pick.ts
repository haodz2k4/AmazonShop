export default <T extends Record<string, any>, K extends keyof T>(object: T, keys: K[]): Partial<T> => { 
    return keys.reduce((result, key) => {
        if (key in object) {
            result[key] = object[key];
        }
        return result;
    }, {} as Partial<T>);
}
//example: 
//input: product_status='active' || supplier_status='inactive'
//output: {status: 'active'} || {status: 'inactive'}
export const transformObjectKeys = (obj: Record<string,any>): Record<string,any> => {

    return Object.entries(obj).reduce((result, item) => {
        const [key,value] = item 
        const [_,b] = key.split("_") 
        result[b] = value
        return result
    },{} as Record<string,any>)
}
//example: 
//input: key = "product" obj = {status: active,highlighted: "1"} 
//output: {'product.status': 'active', 'product.highlighted': "1"}
export const transformToMatchMongo = (key: string, obj: Record<string,any>): Record<string,any> => {

    return Object.entries(obj).reduce((result, item) => {
        const [keyChild,value] = item 
        console.log(keyChild)
        console.log(value)
        result[`${key}.${keyChild}`] = value
        return result
    },{} as any)
}