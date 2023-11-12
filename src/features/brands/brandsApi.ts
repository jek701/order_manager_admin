import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"
import {Brand} from "../../types/Products"

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
    })
})

export const {useGetBrandsQuery, useGetBrandByIDQuery} = brandsApi