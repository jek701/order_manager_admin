import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"
import {Dashboard} from "../../types/Dashboard"

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: apiConfig,
    tagTypes: ["dashboard"],
    endpoints: (builder) => ({
        getDashboard: builder.query<Dashboard, void>({
            query: () => ({
                url: "dashboard",
                method: "GET"
            }),
            providesTags: ["dashboard"]
        })
    })
})

export const {useGetDashboardQuery} = dashboardApi