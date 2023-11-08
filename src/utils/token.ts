import Cookies from "js-cookie"

export const setToken = (token: string) => {
    Cookies.set("ONLINE_STORE_MANAGER", token)
}

export const getToken = () => {
    return Cookies.get("ONLINE_STORE_MANAGER")
}

export const removeToken = () => {
    Cookies.remove("ONLINE_STORE_MANAGER")
}