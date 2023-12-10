import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"

export const tokenUsageApi = createApi({
    reducerPath: "tokenUsageApi",
    baseQuery: apiConfig,
    endpoints: (builder) => ({
        getTotalTokenUsage: builder.query({
            query: () => ({
                url: "/token-usage/total",
                method: "GET"
            })
        }),
        getTokenUsagePerRequest: builder.query({
            query: () => ({
                url: "/token-usage/per-request",
                method: "GET"
            })
        }),
        getTokenUsagePerConversation: builder.query({
            query: () => ({
                url: "/token-usage/per-conversation",
                method: "GET"
            })
        }),
        getTokenUsagePerOrder: builder.query({
            query: () => ({
                url: "/token-usage/per-order",
                method: "GET"
            })
        }),
        getTokenUsagePerAdmin: builder.query({
            query: () => ({
                url: "/token-usage/per-admin",
                method: "GET"
            })
        }),
        getTokenUsagePerDate: builder.query({
            query: (date: string) => ({
                url: `/token-usage/per-date`,
                method: "GET"
            })
        })
    })
})

export const {
    useGetTotalTokenUsageQuery,
    useGetTokenUsagePerRequestQuery,
    useGetTokenUsagePerConversationQuery,
    useGetTokenUsagePerOrderQuery,
    useGetTokenUsagePerAdminQuery,
    useGetTokenUsagePerDateQuery
} = tokenUsageApi