import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"
import {Clients} from "../../types/Clients"
import {CreateClientRequestProps} from "./CreateClientModal"

interface EditCustomerProps extends CreateClientRequestProps {
    id: string
}

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
        getClientById: build.query<Clients, string | undefined>({
            query: id => ({
                url: `clients/${id}`,
                method: "GET"
            })
        }),
        createNewClient: build.mutation<Clients, CreateClientRequestProps>({
            query: body => ({
                url: "clients",
                method: "POST",
                body
            }),
            invalidatesTags: ["clients"]
        }),
        editCustomer: build.mutation<Clients, EditCustomerProps>({
            query: body => ({
                url: `clients/${body.id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["clients"]
        }),
        deleteClient: build.mutation<{
            status: boolean,
            message: string
        }, {
            id: number
        }>({
            query: ({id}) => ({
                url: `clients/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["clients"]
        })
    })
})

export const {
    useGetClientsQuery,
    useCreateNewClientMutation,
    useDeleteClientMutation,
    useEditCustomerMutation,
    useGetClientByIdQuery
} = clientsApi