import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"
import {Clients} from "../../types/Clients"

export const clientsApi = createApi({
    reducerPath: "clientApi",
    baseQuery: apiConfig,
    tagTypes: ["clients"],
    endpoints: build => ({
        getClients: build.query<Clients, void>({
            query: () => ({
                url: "clients",
                method: "GET"
            }),
            providesTags: ["clients"]
        }),
        createNewClient: build.mutation<Clients, {
            name: string,
            phone_number: string,
            surname?: string,
            gender?: string,
            profile_name?: string,
            profile_url?: string,
            address?: string
        }>({
            query: body => ({
                url: "clients",
                method: "POST",
                body
            }),
            invalidatesTags: ["clients"]
        })
    })
})

export const {useGetClientsQuery, useCreateNewClientMutation} = clientsApi