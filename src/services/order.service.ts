import { PaginationResult } from "../helpers/paginate.helper"
import Order, {IOrder} from "../models/order.model"
import catchAync from "../utils/catchAync"
import { ApiError } from "../utils/error"
interface OrderOptions {
    filter: Record<string,any>,
    pagination?: PaginationResult,
    sort?: Record<string, "asc" | "desc">,
    selectFields?: string
}
export const getOrdersByQuery = async (options: OrderOptions) => {

    return await Order
        .find(options.filter)
        .limit(options.pagination ? options.pagination.limit : 100)
        .skip(options.pagination ? options.pagination.skip : 0)
        .sort(options.sort)
        .select(options.selectFields || "")
        .populate('products.productId')
}

export const getTotalDocument = async (query?: Record<string, any>) => {
    return await Order.countDocuments(query)
}

export const createOrder = async (bodyOrder: IOrder) => {
    return await Order.create(bodyOrder)
    
}

export const getOrderById = async (id: string) => {
    return await Order.findById(id)
}

export const updateOrderById = async (id: string, bodyOrder: Partial<IOrder>) => {
    const order = await getOrderById(id)
    if(!order){
        throw new ApiError(404,"Order is not found")
    }
    Object.assign(order, bodyOrder)
    await order.save()
    return order
}


export const getOrderByUserIdAndOrderId = async (userId: string, orderId: string) => {
    return await Order.findOne({_id: orderId, userId}).populate('products.productId','title thumbnail ')
}