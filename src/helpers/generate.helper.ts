
export const generateRandomElement = <T>(...listItem: T[]): T => {
    
    return listItem[Math.floor(Math.random() * listItem.length)] 
    
}

export const generateRandomNumber= (length: number): string => {
    const characters = "0123456789"
    let result = ""
    for(let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result 
}   