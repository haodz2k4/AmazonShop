import { PaginationResult } from "../helpers/paginate.helper"
import Order from "../models/order.model"
import catchAync from "../utils/catchAync"
interface OrderOptions {
    filter: Record<string,any>,
    pagination?: PaginationResult,
    sort?: Record<string, "asc" | "desc">,
    selectField?: string
}
export const getOrdersByQuery = async (options: OrderOptions) => {

    return await Order
        .find(options.filter)
        .limit(options.pagination ? options.pagination.limit : 100)
        .skip(options.pagination ? options.pagination.skip : 0)
        .sort(options.sort)
        .select(options.selectField || "")
}

export const getTotalDocument = async (query?: Record<string, any>) => {
    return await Order.countDocuments(query)
}