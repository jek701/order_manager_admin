import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"
import {Admin, AdminResponse} from "../../types/Admin"

export const adminsApi = createApi({
    reducerPath: "adminsApi",
    baseQuery: apiConfig,
    tagTypes: ["admins"],
    endpoints: (builder) => ({
        getAdmins: builder.query<AdminResponse, void>({
            query: () => ({
                url: "admins",
                method: "GET"
            }),
            providesTags: ["admins"]
        }),
        getAdminByID: builder.query<Admin, string>({
            query: id => `admins/${id}`
        }),
        getPendingAdmins: builder.query<AdminResponse, void>({
            query: () => ({
                url: "admins/pending",
                method: "GET"
            }),
            providesTags: ["admins"]
        }),
        createAdmin: builder.mutation<Admin, {
            name: string
            phone_number: string
            password: string
        }>({
            query: (body) => ({
                url: "admins",
                method: "POST",
                body
            }),
            invalidatesTags: ["admins"]
        }),
        updateAdmin: builder.mutation<Admin, {
            id: number
            name?: string
            phone_number?: string
            password?: string
        }>({
            query: ({id, ...patch}) => ({
                url: `admins/${id}`,
                method: "PATCH",
                body: patch
            }),
            invalidatesTags: ["admins"]
        }),
        deleteAdmin: builder.mutation<Admin, string>({
            query: id => ({
                url: `admins/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["admins"]
        }),
    })
})

export const {
    useGetAdminsQuery,
    useGetAdminByIDQuery,
    useGetPendingAdminsQuery,
    useCreateAdminMutation,
    useUpdateAdminMutation,
    useDeleteAdminMutation
} = adminsApi