import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"
import {Order, Orders, OrderStatuses} from "../../types/Orders"
import {CreateOrderRequestProps} from "./CreateOrderModal"

export const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: apiConfig,
    tagTypes: ["orders"],
    endpoints: (builder) => ({
        getOrders: builder.query<Orders, {
            order_status?: Order["order_status"],
            page?: number,
            pageSize?: number
        }>({
            query: ({order_status, page, pageSize}) => ({
                url: "orders",
                params: {
                    order_status,
                    page,
                    pageSize
                }
            }),
            providesTags: ["orders"]
        }),
        getOrderByID: builder.query<{
            status: boolean,
            message: string,
            data: Order
        }, string | undefined>({
            query: id => `orders/${id}`,
            providesTags: ["orders"]
        }),
        createOrder: builder.mutation<Orders, CreateOrderRequestProps>({
            query: body => ({
                url: "orders",
                method: "POST",
                body
            }),
            invalidatesTags: ["orders"]
        }),
        changeOrderStatus: builder.mutation<{
            status: boolean,
            message: string,
            data: Order
        }, {
            id: string,
            order_status: OrderStatuses,
            delivered_to_destination?: Date
            delivered_to_client?: Date
            sent_to_destination_country_date?: Date
            cancel_closed_date?: Date
            ordered_date?: Date
            cancel_reason?: string
        }>({
            query: props => ({
                url: `orders/${props.id}`,
                method: "PATCH",
                body: props
            }),
            invalidatesTags: ["orders"]
        }),
        deleteOrder: builder.mutation<{
            status: boolean,
            message: string
        }, string>({
            query: id => ({
                url: `orders/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["orders"]
        }),
    }),
})

export const {useGetOrdersQuery, useCreateOrderMutation, useDeleteOrderMutation, useGetOrderByIDQuery, useChangeOrderStatusMutation} = ordersApi