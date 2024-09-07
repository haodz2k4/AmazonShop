
export const generateRandomElement = <T>(...listItem: T[]): T => {
    
    return listItem[Math.floor(Math.random() * listItem.length)] 
    
}