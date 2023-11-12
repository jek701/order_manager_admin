import {Admin} from "./Admin"
import {Clients} from "./Clients"
import {Products} from "./Products"

export interface Orders {
    status: boolean,
    message: string,
    data: Order[]
}

export interface Order {
    id: string
    order_date: string
    deliver_until: string
    item_ids: string
    customer_id: string
    order_status: OrderStatuses
    total_price: number
    items_original_price: number
    transportation_price: number
    profit_price: number
    items: Products["data"]
    customer: Clients["data"][0]
    customerOrders: Orders["data"]
    admin: Admin["data"]
}

export type OrderStatuses = "created" | "ordered" | "sent_to_destination_country" | "arrived_at_destination_country" | "sent" | "closed" | "canceled"