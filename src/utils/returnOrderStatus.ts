import {OrderStatuses} from "../types/Orders"

export const returnOrderStatus = (status: OrderStatuses) => {
    switch (status) {
        case "created":
            return "Создан"
        case "ordered":
            return "Заказан"
        case "sent_to_destination_country":
            return "Отправлен в страну назначения"
        case "arrived_at_destination_country":
            return "Прибыл в страну назначения"
        case "sent":
            return "Отправлен"
        case "canceled":
            return "Отменен"
        case "closed":
            return "Закрыт"
        default:
            return "Неизвестный статус"
    }
}