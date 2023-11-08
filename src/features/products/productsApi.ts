import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"
import {Products} from "../../types/Products"

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: apiConfig,
    tagTypes: ["products"],
    endpoints: build => ({
        getAllProducts: build.query<Products, void>({
            query: () => ({
                url: "items",
                method: "GET"
            })
        })
    })
})

export const {useGetAllProductsQuery} = productsApi