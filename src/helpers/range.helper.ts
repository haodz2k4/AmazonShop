
export const getRangePrice = (minPrice: number | undefined, maxPrice: number | undefined) => {
    if(minPrice && maxPrice){
        return {price: {$gte: minPrice, $lte: maxPrice}}
    }
    return {}
}