import {connect} from "mongoose"
import config from "./config"
export default async () => {
    try {
        await connect(config.mongodb as string)
        console.log("Connected to mongodb")
    }catch {
        console.log("Failed to connect mongodb")
    }
}