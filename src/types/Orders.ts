import {Admin} from "./Admin"
import {Clients} from "./Clients"
import {Products} from "./Products"

export interface Orders {
    status: boolean,
    message: string,
    data: {
        orders: Order[]
        currentPage: number
        total: number
        pageSize: number
    }
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
    items: Products["data"]["items"]
    customer: Clients["data"][0]
    customerOrders: Orders["data"]["orders"]
    admin: Admin
    delivered_to_destination?: string
    delivered_to_client?: string
    sent_to_destination_country_date?: string
    cancel_closed_date?: string
    ordered_date?: string
    cancel_reason?: string
}

export type OrderStatuses = "created" | "ordered" | "sent_to_destination_country" | "arrived_at_destination_country" | "sent" | "closed" | "canceled"