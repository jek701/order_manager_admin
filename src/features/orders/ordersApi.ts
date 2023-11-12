import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"
import {Order, Orders} from "../../types/Orders"
import {CreateOrderRequestProps} from "./CreateOrderModal"

export const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: apiConfig,
    tagTypes: ["orders"],
    endpoints: (builder) => ({
        getOrders: builder.query<Orders, {
            order_status?: Order["order_status"],
        }>({
            query: ({order_status}) => ({
                url: "orders",
                params: {
                    order_status
                }
            }),
            providesTags: ["orders"]
        }),
        getOrderByID: builder.query<{
            status: boolean,
            message: string,
            data: Order
        }, string | undefined>({
            query: id => `orders/${id}`
        }),
        createOrder: builder.mutation<Orders, CreateOrderRequestProps>({
            query: body => ({
                url: "orders",
                method: "POST",
                body
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

export const {useGetOrdersQuery, useCreateOrderMutation, useDeleteOrderMutation, useGetOrderByIDQuery} = ordersApi