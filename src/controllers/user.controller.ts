import { Request, Response } from "express"; 
import catchAync from "../utils/catchAync";
import pick from "../utils/pick";
import paginateHelper from "../helpers/paginate.helper";
import * as UserService from "../services/user.service";
import { buildRegExp } from "../utils/regExp";
import { ApiError } from "../utils/error";

//[GET] "/api/users"
export const getUsers = catchAync(async (req: Request, res: Response) => {
    const filter: Record<string, any> = {}
    const find = pick(req.query,["status","gender"])

    const keyword = req.query.keyword as string 
    const searchBy = req.query.searchBy as string 

    if(searchBy && keyword){
        filter[searchBy] = buildRegExp(keyword)
    }else if(keyword){
        filter.$or = [
            { firstName: buildRegExp(keyword) },
            { lastName: buildRegExp(keyword) }
        ]
    }
    //pagination
    const page = parseInt(req.query.page as string) || 1 
    const limit = parseInt(req.query.limit as string) || 30
    const totalDocument = await UserService.getTotalDocument(filter)
    const pagination = paginateHelper(page, limit, totalDocument) 

    //sort 
    const sort: Record<string, "asc" | "desc"> = {}
    const sortKey = req.query.sortKey as string 
    const sortValue = req.query.sortValue as "asc" | "desc" 
    if(sortKey && sortValue){
        sort[sortKey] = sortValue
    }

    //select field 
    const selectFields = req.query.only as string || ""


    const users = await UserService.getUsersByQuery({filter: {...filter,...find}, pagination, sort, selectFields})
    res.json({users})
})

//[POST] "/api/users"
export const createUser = catchAync(async (req: Request, res: Response) => {
    const body = req.body 

    const user = await UserService.createUser(body)
    res.status(201).json({message: "create user successfully", user})
})

//[PATCH] "/api/users/:id"
export const updateUser = catchAync(async (req: Request, res: Response) => {
    const {id} = req.params 
    const body = req.body 
    const user = await UserService.updateUserById(id,body)
    res.status(200).json({message: "Updated user successfully", user})
})

//[PATCH] "/api/users/:id"
export const getUser = catchAync(async (req: Request, res: Response) => {
    const {id} = req.params 
    const user = await UserService.getUserById(id);
    if(!user){
        throw new ApiError(404,"User is not found")
    }
    res.json({user})
})

//[PATCH] "/api/users/:id"
export const deleteUser = catchAync(async (req: Request, res: Response) => {
    const {id} = req.params
    const user = await UserService.updateUserById(id, {deleted: true})
    res.status(200).json({message: "Deleted user successfully", user})
})