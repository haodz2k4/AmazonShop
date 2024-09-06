
export const buildRegExp =(keyword: string): RegExp => { 
    const keywords = keyword.split(" ");
    const regexString = keywords.map(item => `(?=.*${item})`).join("")
    return new RegExp(`^${regexString}`,"i")
}