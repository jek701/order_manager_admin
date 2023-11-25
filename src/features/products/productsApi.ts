import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"
import {Product, Products} from "../../types/Products"

export interface CreateProductRequest {
    item_name: string
    item_original_price: number,
    item_price_with_profit?: number,
    brand_id: number,
    item_url?: string,
    item_weight?: string
    is_available?: boolean
}

export interface EditProductRequest extends CreateProductRequest {
    id: string
}

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: apiConfig,
    tagTypes: ["products"],
    endpoints: build => ({
        getAllProducts: build.query<Products, void>({
            query: () => ({
                url: "items",
                method: "GET"
            }),
            providesTags: ["products"]
        }),
        createNewProduct: build.mutation<{
            status: boolean,
            message: {
                ru: string
                uz: string
            },
            data: Product
        }, CreateProductRequest>({
            query: body => ({
                url: "items",
                method: "POST",
                body
            }),
            invalidatesTags: ["products"]
        }),
        editProduct: build.mutation<{
            status: boolean,
            message: {
                ru: string
                uz: string
            },
            data: Product
        }, EditProductRequest>({
            query: body => ({
                url: `items/${body.id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["products"]
        }),
        deleteProduct: build.mutation<{
            status: boolean,
            message: {
                ru: string
                uz: string
            },
            data: []
        }, string>({
            query: id => ({
                url: `items/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["products"]
        })
    })
})

export const {useGetAllProductsQuery, useCreateNewProductMutation, useEditProductMutation ,useDeleteProductMutation} = productsApi