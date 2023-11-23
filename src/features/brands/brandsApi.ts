import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"
import {Brand} from "../../types/Products"

export interface CreateBrandRequest {
    brand_name: string
    brand_icon?: string
}

export interface EditBrandRequest extends CreateBrandRequest {
    id: number
}

export const brandsApi = createApi({
    reducerPath: "brandsApi",
    baseQuery: apiConfig,
    tagTypes: ["brands"],
    endpoints: (builder) => ({
        getBrands: builder.query<Brand, void>({
            query: () => ({
                url: "brands",
                method: "GET"
            }),
            providesTags: ["brands"]
        }),
        getBrandByID: builder.query<Brand, number>({
            query: id => `brands/${id}`
        }),
        createBrand: builder.mutation<Brand, CreateBrandRequest>({
            query: (body) => ({
                url: "brands",
                method: "POST",
                body
            }),
            invalidatesTags: ["brands"]
        }),
        editBrand: builder.mutation<Brand, EditBrandRequest>({
            query: (body) => ({
                url: `brands/${body.id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["brands"]
        }),
        deleteBrand: builder.mutation<Brand, number>({
            query: id => ({
                url: `brands/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["brands"]
        })
    })
})

export const {useGetBrandsQuery, useGetBrandByIDQuery, useCreateBrandMutation, useDeleteBrandMutation, useEditBrandMutation} = brandsApi