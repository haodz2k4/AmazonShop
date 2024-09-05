import { PaginationResult } from "../helpers/paginate.helper";
import Product, {IProduct} from "../models/product.model"
import { ApiError } from "../utils/error";

interface ProductsOption {
    filter: Record<string,any>
    pagination: PaginationResult
    sort: Record<string, "asc" | "desc" | 1 | -1> 
    selectFields: string
}

const Deleted = {deleted: false}

export const getAllProductsByQuery = async (option: ProductsOption) => {

    return await Product
        .find({...option.filter, ...Deleted})
        .sort(option.sort)
        .limit(option.pagination.limit)
        .skip(option.pagination.skip)
        .select(option.selectFields)
}



export const getProductByid = async (id: string) => {
    return await Product.findOne({_id: id, ...Deleted})
} 

export const getProductBySlug = async (slug: string) => {
    return await Product.findOne({slug,...Deleted})
}

export const updateProductById = async (id: string,productBody: Partial<IProduct>) => {
    const product = await getProductByid(id);
    if(!product){
        throw new ApiError(404,"products is not found")
    }
    Object.assign(product, productBody)
    await product.save() 
    return product
} 

export const createProduct = async (productBody: IProduct) => {
   return await Product.create(productBody);

}

export const deleteProductById = async (id: string) => {
    const product = await Product.findByIdAndUpdate(id,{deleted: true})
    if(!product){
        throw new ApiError(404,"products is not found")
    }
    
}