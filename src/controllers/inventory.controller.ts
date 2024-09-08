import { Request, Response } from "express";
import catchAync from "../utils/catchAync";
import * as InventoryService from "../services/inventory.service"
import pick, {transformObjectKeys} from "../utils/pick"
import paginateHelper from "../helpers/paginate.helper";

//[GET] "/api/inventories"
export const getInventories = catchAync(async (req: Request, res: Response) => {
    const filterProducts: Record<string,any> = transformObjectKeys(pick(req.query,["product_status","product_highlighted"]))
    const filterSuppliers: Record<string,any> = transformObjectKeys(pick(req.query,["supplier_status"]))

    //Sorting 
    const sort: Record<string,1| -1> = {}
    const sortKey = req.query.sortKey as string 
    const sortValue = req.query.sortValue as string 
    if(sortKey && sortValue){
        sort[sortKey] = sortValue === "asc" ? 1 : -1
    }else{
        sort.createdAt = -1
    }
    //Pagination 
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 30 
    const totalDocument = await InventoryService.getTotalDocument()
    const pagination = paginateHelper(page, limit, totalDocument)
    
    const inventories = await InventoryService.getAllInvetoryByQuery({filterProducts,filterSuppliers,sort,pagination});
    res.json({inventories, pagination})
})