import {configureStore} from "@reduxjs/toolkit"
import {useDispatch as useStoreDispatch} from "react-redux"
import {clientsApi} from "./features/clients/clientsApi"
import auth from "./features/auth/authSlice"
import {authApi} from "./features/auth/authApi"

const reducers = {
    [clientsApi.reducerPath]: clientsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth
}

const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware({immutableCheck: false})
        .concat(clientsApi.middleware)
        .concat(authApi.middleware)
})

export type StoreState = ReturnType<typeof store.getState>
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch

export interface AppThunkProps {
    dispatch: AppDispatch;
    state: StoreState;
    extra?: unknown;
    rejectValue?: unknown;
}

export const useDispatch = () => useStoreDispatch<AppDispatch>()

export default store