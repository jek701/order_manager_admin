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
            })
        })
    })
})

export const {useGetClientsQuery} = clientsApi