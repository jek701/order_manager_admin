import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"
import {ConversationResponse, Message} from "../../types/Conversation"

export const conversationApi = createApi({
    reducerPath: "conversationApi",
    baseQuery: apiConfig,
    tagTypes: ["Conversation"],
    endpoints: (builder) => ({
        getConversation: builder.query<{
            success: boolean
            message: {
                ru: string
                uz: string
            }
            data: {
                count: number
                rows: Message[]
            }
        }, string>({
            query: (order_id) => ({
                url: `/chat/${order_id}`
            }),
            providesTags: ["Conversation"]
        }),
        newConversation: builder.mutation<ConversationResponse, {
            order_id: string
            customer_id: string
        }>({
            query: (body) => ({
                url: "/conversation",
                method: "POST",
                body
            }),
            invalidatesTags: ["Conversation"]
        }),
        sendMessage: builder.mutation<ConversationResponse, {
            order_id: string
            message: string
        }>({
            query: (body) => ({
                url: "/chat",
                method: "POST",
                body
            })
        })
    })
})

export const {
    useGetConversationQuery,
    useSendMessageMutation,
    useNewConversationMutation
} = conversationApi