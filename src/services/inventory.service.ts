import Inventory from "../models/Inventory.model"

interface InventoryOptions {
    filterProducts: Record<string, any>,
    filterSuppliers: Record<string,any>,
    sort: Record<string,'asc' | 'desc' | 1 | -1>
}

export const getAllInvetoryByQuery = async (options: InventoryOptions) => {

    console.log(options)
    return await Inventory.aggregate([
        {
            $lookup: {
                from: "products",
                localField: 'productId',
                foreignField: '_id',
                as: 'products'
            }
            
        },
        {
            $lookup: {
                from: "suppliers",
                localField: "supplierId",
                foreignField: "_id",
                as: 'suppliers'
            }
        },
        {$unwind: '$products'},
        {$unwind: '$suppliers'},
        {
            $match: {...options.filterProducts,...options.filterSuppliers}
        }
        
    ])
}