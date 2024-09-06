import { PaginationResult } from "../helpers/paginate.helper";
import Product, {IProduct} from "../models/product.model"
import { ApiError } from "../utils/error";
import * as CacheService from "../services/cache.service"
interface ProductsOption {
    filter: Partial<Record<keyof IProduct, any>>
    pagination: PaginationResult
    sort: Record<string, "asc" | "desc" | 1 | -1> 
    selectFields: string
}

const Deleted = {deleted: false}
const CACHE_URL = 'product:/api/products'
const CACHE_URLS = 'products:/api/products'
export const getAllProductsByQuery = async (option: ProductsOption) => {

    return await Product
        .find({...option.filter, ...Deleted})
        .sort(option.sort)
        .limit(option.pagination.limit)
        .skip(option.pagination.skip)
        .select(option.selectFields)
}

export const getTotalDocument = async (query?: Partial<Record<keyof IProduct, any>>): Promise<number> => {
    return await Product.countDocuments(query)
}

export const getProductByid = async (id: string) => {
    return await Product.findOne({_id: id, ...Deleted})
} 

export const getProductBySlug = async (slug: string) => {
    return await Product.findOne({slug,...Deleted}).populate('categoryId','title thumbnail')
}

export const updateProductById = async (id: string,productBody: Partial<IProduct>) => {
    const product = await getProductByid(id);
    if(!product){
        throw new ApiError(404,"products is not found")
    }
    Object.assign(product, productBody)
    await product.save() 

    await CacheService.deleteCache(`${CACHE_URL}/${id}`,`${CACHE_URL}/slug/${product.slug}`)
    await CacheService.deleteKeysByPattern(`${CACHE_URLS}*`)
    return product
} 

export const createProduct = async (productBody: IProduct) => {
    
    await CacheService.deleteKeysByPattern(`${CACHE_URLS}*`)
   return await Product.create(productBody);

}

