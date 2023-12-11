import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"
import {Dashboard} from "../../types/Dashboard"
import {OrderStatuses} from "../../types/Orders"

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: apiConfig,
    tagTypes: ["dashboard"],
    endpoints: (builder) => ({
        getDashboard: builder.query<Dashboard, void>({
            query: () => ({
                url: "dashboard",
                method: "GET"
            }),
            providesTags: ["dashboard"]
        }),
        getOrdersByStatus: builder.query<{
            status: boolean,
            message: {
                ru: string,
                uz: string,
            },
            data: {
                order_status: OrderStatuses,
                count: number,
                color: string
            }[]
        }, void>({
            query: () => ({
                url: "dashboard/orders/by-status",
                method: "GET"
            }),
            providesTags: ["dashboard"]
        }),
        getOrdersByAdmin: builder.query<{
            status: boolean,
            message: {
                ru: string,
                uz: string,
            },
            data: {
                admin_id: number,
                count: number,
                admin: {
                    id: number,
                    name: string,
                    role: string,
                    phone_number: string
                },
                color: string
            }[]
        }, void>({
            query: () => ({
                url: "dashboard/orders/by-admin",
                method: "GET"
            }),
            providesTags: ["dashboard"]
        }),
    })
})

export const {useGetDashboardQuery, useGetOrdersByStatusQuery, useGetOrdersByAdminQuery} = dashboardApi