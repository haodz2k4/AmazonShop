import { PaginationResult } from "../helpers/paginate.helper"
import Inventory,{IIventory} from "../models/Inventory.model"
import { ApiError } from "../utils/error"
import {transformToMatchMongo} from "../utils/pick"
interface InventoryOptions {
    filterProducts: Record<string, any>
    filterSuppliers: Record<string,any>
    pagination: PaginationResult
    sort: Record<string, | 1 | -1>
    selectField: string 
}

export const getAllInvetoryByQuery = async (options: InventoryOptions) => {


    const selectFields = options.selectField.split(" ").reduce((result, item) => {
        result[item] = 1
        return result
    }, {} as any) 

    const pipeline: any = [
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
        },
        {$limit: options.pagination.limit },{$skip: options.pagination.skip}
        
    ]
    if(options.selectField){
        pipeline.push({$project: selectFields})
    }
    return await Inventory.aggregate([
        ...pipeline,
    ])
}

export const getTotalDocument = async (options?: Partial<InventoryOptions>) => {
    const pipeline: any[] = [
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
        { $unwind: '$product' },
        { $unwind: '$supplier' }
    ];

    if (options?.filterProducts) {
        pipeline.push({
            $match: {
                ...transformToMatchMongo('product', options.filterProducts)
            }
        });
    }

    if (options?.filterSuppliers) {
        pipeline.push({
            $match: {
                ...transformToMatchMongo('supplier', options.filterSuppliers)
            }
        });
    }

    const result = await Inventory.aggregate([
        ...pipeline,
        { $count: "totalDocuments" }
    ]);

    return result.length > 0 ? result[0].totalDocuments : 0;
};

export const getTotalQuantityByProductId = async (productId: string) => {
    
    const inventories = await Inventory.find({productId: productId}).select("quantity") 
    return inventories.reduce((result, item) => {
        result += item.quantity
        return result
    }, 0)
}

export const createInventory = async (bodyInventory: IIventory) => {
    return await Inventory.create(bodyInventory)
} 

export const getInventoryById = async (id: string) => {
    return await Inventory.findById(id)
}

export const updateInventoryById = async (id: string, bodyInventory: Partial<IIventory>) => {
    return await Inventory.findByIdAndUpdate(id,bodyInventory);
}

export const deleteInventoryById = async (id: string) => {
    const inventory = await Inventory.findByIdAndDelete(id) 
    if(!inventory){
        throw new ApiError(404,"Inventory is not found")
    }
}