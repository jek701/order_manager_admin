export interface Products {
    status: boolean,
    message: string,
    data: {
        id: string,
        item_name: string,
        item_original_price: number,
        item_price_with_profit: number,
        brand_id: number,
        item_url: string,
        item_weight: number,
        is_available: boolean,
        average_delivery_time: number,
        brand_name: string,
        currency_sign: string | null,
        currency_name: string
    }[]
}

export interface Brand {
    status: boolean,
    message: string,
    data: {
        id: number,
        brand_name: string,
        item_count: number,
        brand_icon: string,
        sold_items_count: number,
        female_bought_count: number,
        male_bought_count: number,
        average_delivery_time: number,
        currency_id: number
    }[]
}