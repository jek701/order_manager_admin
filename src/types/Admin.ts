export interface Admin {
    status: boolean
    message: string
    data: {
        id: number
        name: string
        phone_number: string
        role: "super_admin" | "admin"
    }
}