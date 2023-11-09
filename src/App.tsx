import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import React from "react"
import Layout from "./layouts/Layout"
import LoadingBlock from "./components/LoadingBlock"

const Login = React.lazy(() => import("src/features/auth/Login"))
const Clients = React.lazy(() => import("src/features/clients/Clients"))
const Products = React.lazy(() => import("src/features/products/Products"))
const Orders = React.lazy(() => import("src/features/orders/Orders"))
const Brands = React.lazy(() => import("src/features/brands/Brands"))
const Dashboard = React.lazy(() => import("src/features/dashboard/Dashboard"))
const ErrorNotFound = React.lazy(() => import("src/components/ErrorNotFound"))

const App = () => {

    return (
        <Router>
            <Layout>
                <React.Suspense fallback={<LoadingBlock />}>
                    <Routes>
                        <Route path={"/login"} element={<Login/>}/>
                        <Route path={"/clients"} element={<Clients />} />
                        <Route path={"/products"} element={<Products />} />
                        <Route path={"/orders"} element={<Orders />} />
                        <Route path={"/brands"} element={<Brands />} />
                        <Route path={"/"} element={<Dashboard />} />
                        <Route path="*" element={<ErrorNotFound />} />
                    </Routes>
                </React.Suspense>
            </Layout>
        </Router>
    )
}
export default App