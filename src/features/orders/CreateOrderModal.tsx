import React, {useEffect} from "react"
import {Modal, notification} from "antd"
import {useCreateOrderMutation} from "./ordersApi"
import OrderForm from "./OrderForm"

interface CreateOrderModalProps {
    modal: boolean
    setModal: (value: boolean) => void
}

export interface CreateOrderRequestProps {
    customer_id?: number
    item_ids?: string
    transportation_price?: number
    profit_price?: number
    total_price?: number
    delivery_until?: number
}

const CreateOrderModal: React.FC<CreateOrderModalProps> = ({modal, setModal}) => {
    const [newOrder, {
        isSuccess: isOrderCreated,
        isLoading: isOrderCreating,
        isError: isOrderCreateError,
        error: orderCreateError
    }] = useCreateOrderMutation()

    const onCreateNewClient = (formValues: CreateOrderRequestProps) => {
        if (formValues.customer_id && formValues.item_ids && formValues.transportation_price) {
            newOrder({
                ...formValues,
                transportation_price: Number(formValues.transportation_price)
            })
        } else {
            notification.error({
                message: "Ошибка",
                description: "Для создания заказа заполните все поля"
            })
        }
    }

    useEffect(() => {
        if (!isOrderCreating && isOrderCreated) {
            notification.success({
                message: "Успешно",
                description: "Заказ успешно создан"
            })
            setModal(false)
        }
        if (!isOrderCreating && isOrderCreateError) {
            notification.error({
                message: "Ошибка",
                // @ts-ignore
                description: orderCreateError?.data.message.ru
            })
        }
    }, [isOrderCreated, isOrderCreating, isOrderCreateError, orderCreateError])
    return (
        <Modal
            okText={"Создать"}
            cancelText={"Отменить"}
            onCancel={() => setModal(false)}
            title={"Добавить новый заказ"}
            open={modal}
            okButtonProps={{
                disabled: isOrderCreating,
                form: "order-form",
                htmlType: "submit"
            }}
        >
            <OrderForm onFinish={onCreateNewClient}/>
        </Modal>
    )
}

export default CreateOrderModal