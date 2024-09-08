import { PaginationResult } from "../helpers/paginate.helper"
import Inventory,{IIventory} from "../models/Inventory.model"
import {transformToMatchMongo} from "../utils/pick"
interface InventoryOptions {
    filterProducts: Record<string, any>,
    filterSuppliers: Record<string,any>,
    pagination: PaginationResult
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
        },
        {$limit: options.pagination.limit},{$skip: options.pagination.skip}
        
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

export const createInventory = async (bodyInventory: IIventory) => {
    return await Inventory.create(bodyInventory)
} 

export const getInventoryById = async (id: string) => {
    return await Inventory.findOne({_id: id})
}