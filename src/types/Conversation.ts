export interface ConversationResponse {
    success: boolean
    message: {
        ru: string
        uz: string
    }
    data: Message[]
}

export interface Message {
    id: string
    conversation_id: string
    role: "user" | "system"
    message: string
    created_at: string
}