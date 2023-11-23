export interface AdminResponse {
    status: boolean
    message: string
    data: Admin[]
}

export interface Admin {
    id: number
    name: string
    phone_number: string
    role: "super_admin" | "admin" | "pending"
}