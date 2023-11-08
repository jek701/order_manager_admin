import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"
import {Orders} from "../../types/Orders"

export const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: apiConfig,
    tagTypes: ["orders"],
    endpoints: (builder) => ({
        getOrders: builder.query<Orders, void>({
            query: () => ({
                url: "orders",
            }),
        }),
    }),
})

export const {useGetOrdersQuery} = ordersApi