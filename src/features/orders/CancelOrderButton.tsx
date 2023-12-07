import React, {useEffect, useState} from "react"
import {useChangeOrderStatusMutation} from "./ordersApi"
import {Button, Modal, notification} from "antd"
import TextArea from "antd/lib/input/TextArea"

interface CancelOrderButtonProps {
    id: string
    disabled?: boolean
}

const CancelOrderButton: React.FC<CancelOrderButtonProps> = ({id, disabled}) => {
    const [modal, setModal] = useState(false)
    const [cancelReason, setCancelReason] = useState<string | undefined>(undefined)
    const [changeStatus, {isSuccess, isLoading, isError, error}] = useChangeOrderStatusMutation()

    const onCancelOrderHandler = () => {
        changeStatus({
            id,
            order_status: "canceled",
            cancel_reason: cancelReason
        })
    }

    useEffect(() => {
        if (!isLoading) {
            if (isSuccess && !isError) {
                notification.success({
                    message: "Успешно",
                    description: `Заказ успешно отменен`
                })
                setModal(false)
            }
            if (isError && !isSuccess) {
                notification.error({
                    message: "Ошибка",
                    // @ts-ignore
                    description: error.data.message.ru || "Не удалось изменить статус заказа"
                })
            }
        }
    }, [isLoading, isError, isSuccess, error])

    return <>
        <Modal
            title={`Вы уверены, что хотите отменить заказ?`}
            open={modal}
            onCancel={() => setModal(false)}
            okText={"Отменить заказ"}
            cancelText={"Отменить"}
            confirmLoading={isLoading}
            onOk={onCancelOrderHandler}
        >
            <p>Чтобы отменить заказ, укажите причину, по которому вы хотите отменить заказ</p>
            <TextArea rows={4} value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} placeholder={"Укажите причину отмены заказа"} />
        </Modal>
        <Button disabled={disabled} onClick={() => setModal(true)} danger block>Отменить заказ</Button>
    </>
}

export default CancelOrderButton