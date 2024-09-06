import Category from "../models/category.model"

export const getAllCategoryByQuery = async () => {
    return await Category.find()
}