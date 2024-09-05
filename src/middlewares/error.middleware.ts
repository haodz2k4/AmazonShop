import { ApiError } from './../utils/error';
import {Request, Response, NextFunction,ErrorRequestHandler} from "express"; 

export const errorHandle = async (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
) :Promise<void> => {

    console.log(err)
    if (err instanceof ApiError ){
        res.status(err.code).json({error: err.message})
    }else {
        res.status(500).json({message: "Internal server error: ", error: err})
    }
    
}