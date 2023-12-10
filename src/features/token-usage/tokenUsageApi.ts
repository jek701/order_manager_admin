import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"
import {
    TokenUsageAdmin,
    TokenUsageConversation,
    TokenUsageDate,
    TokenUsageModel,
    TokenUsageOrder,
    TokenUsageRequest,
    TokenUsageTotal
} from "../../types/Usage"

interface TotalTokenUsageResponse {
    success: boolean
    message: {
        ru: string
        uz: string
    }
    data: TokenUsageTotal[]
}

interface ByDateTokenUsageResponse {
    success: boolean
    message: {
        ru: string
        uz: string
    }
    data: TokenUsageDate[]
}

interface ByAdminTokenUsageResponse {
    success: boolean
    message: {
        ru: string
        uz: string
    }
    data: TokenUsageAdmin[]
}

interface ByConversationTokenUsageResponse {
    success: boolean
    message: {
        ru: string
        uz: string
    }
    data: TokenUsageConversation[]
}

interface ByOrderTokenUsageResponse {
    success: boolean
    message: {
        ru: string
        uz: string
    }
    data: TokenUsageOrder[]
}

interface ByModelTokenUsageResponse {
    success: boolean
    message: {
        ru: string
        uz: string
    }
    data: TokenUsageModel[]
}

interface ByRequestTokenUsageResponse {
    success: boolean
    message: {
        ru: string
        uz: string
    }
    data: TokenUsageRequest[]
}

export const tokenUsageApi = createApi({
    reducerPath: "tokenUsageApi",
    baseQuery: apiConfig,
    endpoints: (builder) => ({
        getTotalTokenUsage: builder.query<TotalTokenUsageResponse, void>({
            query: () => ({
                url: "/token-usage/total",
                method: "GET"
            })
        }),
        getTokenUsagePerRequest: builder.query<ByRequestTokenUsageResponse, void>({
            query: () => ({
                url: "/token-usage/per-request",
                method: "GET"
            })
        }),
        getTokenUsagePerConversation: builder.query<ByConversationTokenUsageResponse, void>({
            query: () => ({
                url: "/token-usage/per-conversation",
                method: "GET"
            })
        }),
        getTokenUsagePerOrder: builder.query<ByOrderTokenUsageResponse, void>({
            query: () => ({
                url: "/token-usage/per-order",
                method: "GET"
            })
        }),
        getTokenUsagePerAdmin: builder.query<ByAdminTokenUsageResponse, void>({
            query: () => ({
                url: "/token-usage/per-admin",
                method: "GET"
            })
        }),
        getTokenUsagePerDate: builder.query<ByDateTokenUsageResponse, number | undefined>({
            query: (days = 7) => ({
                url: `/token-usage/per-date?days=${days}`,
                method: "GET"
            })
        }),
        getTokenUsagePerModel: builder.query<ByModelTokenUsageResponse, void>({
            query: () => ({
                url: "/token-usage/per-model",
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