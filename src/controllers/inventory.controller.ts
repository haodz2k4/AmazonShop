import { Request, Response } from "express";
import catchAync from "../utils/catchAync";
import pick from "../utils/pick";
import * as InventoryService from "../services/inventory.service"

//[GET] "/api/inventories"
export const getInventories = catchAync(async (req: Request, res: Response) => {
    //Exmaple:
    //input:product_status=active & supplier_status=active 
    //output product: {status: active} & supplier: {status: active}
    const filterProducts: Record<string,any> = {};
    const filterSuppliers: Record<string,any> = {};
   
    const sort: Record<string,1| -1> = {}
    const sortKey = req.query.sortKey as string 
    const sortValue = req.query.sortValue as string 
    if(sortKey && sortValue){
        sort[sortKey] = sortValue === "asc" ? 1 : -1
    }
    const inventories = await InventoryService.getAllInvetoryByQuery({filterProducts,filterSuppliers,sort});
    res.json({inventories})
})