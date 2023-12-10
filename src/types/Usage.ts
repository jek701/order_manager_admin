export interface TokenUsageTotal {
    total_cost: number,
    total_completion_tokens: string,
    total_prompt_tokens: string,
    total_tokens: string,
    total_requests: number
}

export interface TokenUsageAdmin {
    admin_id: number,
    total_cost: number,
    total_completion_tokens: string,
    total_prompt_tokens: string,
    total_tokens: string,
    total_requests: number
}

export interface TokenUsageModel {
    model: string,
    total_cost: number,
    total_completion_tokens: string,
    total_prompt_tokens: string,
    total_tokens: string,
    total_requests: number
}

export interface TokenUsageConversation {
    conversation_id: string,
    total_cost: number,
    total_completion_tokens: string,
    total_prompt_tokens: string,
    total_tokens: string,
    total_requests: number
}

export interface TokenUsageOrder {
    order_id: string,
    total_cost: number,
    total_completion_tokens: string,
    total_prompt_tokens: string,
    total_tokens: string,
    total_requests: number
}

export interface TokenUsageDate {
    date: string,
    total_cost: number,
    total_completion_tokens: string,
    total_prompt_tokens: string,
    total_tokens: string,
    total_requests: number
}

export interface TokenUsageRequest {
    id: number,
    admin_id: number,
    model: string,
    completion_tokens: number,
    prompt_tokens: number,
    total_tokens: number,
    conversation_id: string,
    order_id: string,
    request_cost: number
}