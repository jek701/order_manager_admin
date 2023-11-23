import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"
import {Admin} from "../../types/Admin"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: apiConfig,
    tagTypes: ["auth"],
    endpoints: build => ({
        login: build.mutation<{
            token: string
        }, {
            phone_number: string,
            password: string
        }>({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data
            })
        }),
        getMe: build.query<{
            status: boolean
            message: string
            data: Admin
        }, void>({
            query: () => ({
                url: "/me",
                method: "GET"
            })
        })
    })
})

export const {useLoginMutation, useGetMeQuery} = authApi