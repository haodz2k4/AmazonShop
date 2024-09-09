import { Request, Response } from "express";
import catchAync from "../utils/catchAync";
import * as InventoryService from "../services/inventory.service"
import pick, {transformObjectKeys} from "../utils/pick"
import { buildRegExp } from "../utils/regExp";
import paginateHelper from "../helpers/paginate.helper";
import { ApiError } from "../utils/error";

//[GET] "/api/inventories"
export const getInventories = catchAync(async (req: Request, res: Response) => {
    const filterProducts: Record<string,any> = transformObjectKeys(pick(req.query,["product_status","product_highlighted"]))
    const filterSuppliers: Record<string,any> = transformObjectKeys(pick(req.query,["supplier_status"]))


    //search 
    const productKeyword = req.query.product_keyword as string 
    const supplierKeyword = req.query.supplier_keyword as string 
    if(productKeyword){
        filterProducts.title = buildRegExp(productKeyword)
    }
    if(supplierKeyword){
        filterSuppliers.name = buildRegExp(supplierKeyword)
    }

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
    const totalDocument = await InventoryService.getTotalDocument({filterProducts,filterSuppliers})
    const pagination = paginateHelper(page, limit, totalDocument)
    
    //SelectField \
    const selectField = req.query.only as string || ""
    const inventories = await InventoryService.getAllInvetoryByQuery({filterProducts,filterSuppliers,sort,pagination, selectField});
    res.json({inventories, pagination})
}) 

//[POST] "/api/inventories/"
export const createInventory = catchAync(async (req: Request, res: Response) => {
    const body = req.body 
    const inventory = await InventoryService.createInventory(body)
    res.status(201).json({message: "Created inventory successfully",inventory})
})

//[GET] "/api/inventories/:id"
export const getInventory = catchAync(async (req: Request, res: Response) => {
    const id = req.params.id 

    const inventory = await InventoryService.getInventoryById(id)
    if(!inventory){
        throw new ApiError(404, "Inventory is not found")
    }
    res.json({inventory})
}) 

//[PATCH] "/api/inventories/:id"
export const updateInventory = catchAync(async (req: Request, res: Response) => {
    const {id} = req.params 
    const body = req.body
    const inventory = await InventoryService.updateInventoryById(id,body);
    if(!inventory){
        throw new ApiError(400,"Inventory is not found")
    }
    res.status(200).json({message: "updated inventory successfully", inventory})
}) 

//[DELETE] "/api/inventories/:id"
export const deleteInventory = catchAync(async (req: Request, res: Response) => {
    const {id} = req.params 
    await InventoryService.deleteInventoryById(id)
    res.status(204) 
})