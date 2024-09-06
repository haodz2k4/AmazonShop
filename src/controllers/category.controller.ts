import { Request, Response } from "express";
import catchAync from "../utils/catchAync";
import * as CategoryService from "../services/category.service"
export const getCategories = catchAync(async (req: Request, res: Response) => {
    
    const categories = await CategoryService.getAllCategoryByQuery()
    res.json({categories})
})