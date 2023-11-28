import {OrderStatuses} from "../types/Orders"

export const returnOrderStatus = (status: OrderStatuses) => {
    switch (status) {
        case "created":
            return "Создан"
        case "ordered":
            return "Товары заказаны"
        case "sent_to_destination_country":
            return "Отправлен в страну назначения"
        case "arrived_at_destination_country":
            return "Прибыло в страну назначения"
        case "sent":
            return "Отправлен клиенту"
        case "canceled":
            return "Отменен"
        case "closed":
            return "Закрыт"
        default:
            return "Неизвестный статус"
    }
}