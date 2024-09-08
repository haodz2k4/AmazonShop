import Inventory from "../models/Inventory.model"
import {transformToMatchMongo} from "../utils/pick"
interface InventoryOptions {
    filterProducts: Record<string, any>,
    filterSuppliers: Record<string,any>,
    sort: Record<string, | 1 | -1>
}

export const getAllInvetoryByQuery = async (options: InventoryOptions) => {

    return await Inventory.aggregate([
        {
            $lookup: {
                from: "products",
                localField: 'productId',
                foreignField: '_id',
                as: 'product'
            }
            
        },
        {
            $lookup: {
                from: "suppliers",
                localField: "supplierId",
                foreignField: "_id",
                as: 'supplier'
            }
        },
        {$unwind: '$product'},
        {$unwind: '$supplier'},
        {
            $match: {
                ...transformToMatchMongo('product',options.filterProducts),
                ...transformToMatchMongo('supplier',options.filterSuppliers)}
        },
        {
            $sort: options.sort
        }
        
    ])
}