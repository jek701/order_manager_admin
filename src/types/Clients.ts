export interface Clients {
    status: boolean
    message: string
    data: {
        id: number,
        name: string,
        surname?: string,
        gender?: string,
        phone_number: string,
        profile_name?: string,
        profile_url?: string,
        address?: string
    }[]
}