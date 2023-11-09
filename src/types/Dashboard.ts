import {Order} from "./Orders"
import {Clients} from "./Clients"

export interface Dashboard {
    status: boolean
    message: string
    data: {
        order: Order[],
        client: Clients["data"],
        profit: number,
        total: number
    }
}