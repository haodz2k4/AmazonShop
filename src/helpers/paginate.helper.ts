export interface PaginationResult {
    currentPage: number,
    limit: number,
    skip: number
    pageSize: number
}


export default (currentPage: number, limit: number, totalDocument: number) :PaginationResult => {
    
    const skip = (currentPage - 1) * limit 
    const pageSize = Math.ceil(totalDocument / limit)
    return {currentPage, limit,skip,pageSize}
}