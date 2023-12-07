import React, {useEffect, useState} from "react"
import {OrderStatuses} from "../../types/Orders"
import {useChangeOrderStatusMutation} from "./ordersApi"
import {Button, Col, DatePicker, notification, Row} from "antd"
import CancelOrderButton from "./CancelOrderButton"
import dayjs from "dayjs"
import InfoBlock from "../../components/InfoBlock"
import moment from "moment"

interface OrderStatusChangeBlockProps {
    order_status: OrderStatuses
    delivered_to_client?: string
    delivered_to_destination?: string
    ordered_date?: string
    cancel_closed_date?: string
    cancel_reason?: string
    id: string
}

const OrderStatusChangeBlock: React.FC<OrderStatusChangeBlockProps> = ({
                                                                           order_status,
                                                                           id,
                                                                           ordered_date,
                                                                           delivered_to_destination,
                                                                           delivered_to_client,
                                                                           cancel_closed_date,
                                                                           cancel_reason
                                                                       }) => {
    const [changeStatus, {isLoading, isError, isSuccess, error}] = useChangeOrderStatusMutation()
    const [date, setDate] = useState<dayjs.Dayjs | null>(null)
    const changeStatusHandler = (status: OrderStatuses) => {
        if (status === "ordered") {
            changeStatus({
                id,
                order_status: status,
                ordered_date: date?.toDate()
            })
        }
        if (status === "arrived_at_destination_country") {
            changeStatus({
                id,
                order_status: status,
                delivered_to_destination: date?.toDate()
            })
        }
        if (status === "sent") {
            changeStatus({
                id,
                order_status: status,
                delivered_to_client: date?.toDate()
            })
        }
        if (status === "closed") {
            changeStatus({
                id,
                order_status: status,
                cancel_closed_date: date?.toDate()
            })
        }
    }

    useEffect(() => {
        if (!isLoading) {
            if (isSuccess && !isError) {
                notification.success({
                    message: "Успешно",
                    description: "Статус успешно изменен"
                })
                setDate(null)
            }
            if (!isSuccess && isError) {
                notification.error({
                    message: "Ошибка",
                    // @ts-ignore
                    description: error.message.ru || "Произошла ошибка"
                })
            }
        }
    }, [isLoading, isError, isSuccess, error])

    switch (order_status) {
        case "created":
            return (
                <Row gutter={10}>
                    <Col style={{marginBottom: "15px"}} span={24}>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 250px",
                            alignItems: "center",
                            justifyItems: "center"
                        }}>
                            <p>Выберите время, когда товары были заказаны</p>
                            <DatePicker value={date} onChange={(value) => setDate(value)} style={{width: "100%"}}/>
                        </div>
                    </Col>
                    <Col span={9}>
                        <CancelOrderButton disabled={isLoading} id={id}/>
                    </Col>
                    <Col span={15}>
                        <Button loading={isLoading} onClick={() => changeStatusHandler("ordered")} type={"primary"} block>Изменить статус
                            на: Товары заказаны</Button>
                    </Col>
                </Row>
            )
        case "ordered":
            return (
                <Row gutter={10}>
                    <Col style={{marginBottom: "15px"}} span={24}>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 250px",
                            alignItems: "center",
                            justifyItems: "center"
                        }}>
                            <p>Выберите время, когда заказ прибыл в страну назначения</p>
                            <DatePicker value={date} onChange={(value) => setDate(value)} style={{width: "100%"}}/>
                        </div>
                    </Col>
                    <Col span={7}>
                        <CancelOrderButton disabled={isLoading} id={id}/>
                    </Col>
                    <Col span={17}>
                        <Button loading={isLoading} onClick={() => changeStatusHandler("arrived_at_destination_country")} type={"primary"}
                                block>Изменить статус на: Прибыло в страну назначения</Button>
                    </Col>
                </Row>
            )
        case "arrived_at_destination_country":
            return (
                <Row gutter={10}>
                    <Col style={{marginBottom: "15px"}} span={24}>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 250px",
                            alignItems: "center",
                            justifyItems: "center"
                        }}>
                            <p>Выберите время, когда заказ был отправлен клиенту</p>
                            <DatePicker value={date} onChange={(value) => setDate(value)} style={{width: "100%"}}/>
                        </div>
                    </Col>
                    <Col span={7}>
                        <CancelOrderButton disabled={isLoading} id={id}/>
                    </Col>
                    <Col span={17}>
                        <Button loading={isLoading} onClick={() => changeStatusHandler("sent")} type={"primary"} block>Изменить статус на:
                            Отправлен клиенту</Button>
                    </Col>
                </Row>
            )
        case "sent":
            return (
                <Row gutter={10}>
                    <Col style={{marginBottom: "15px"}} span={24}>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 250px",
                            alignItems: "center",
                            justifyItems: "center"
                        }}>
                            <p>Выберите время, когда заказ был закрыт</p>
                            <DatePicker value={date} onChange={(value) => setDate(value)} style={{width: "100%"}}/>
                        </div>
                    </Col>
                    <Col span={7}>
                        <CancelOrderButton disabled={isLoading} id={id}/>
                    </Col>
                    <Col span={17}>
                        <Button loading={isLoading} onClick={() => changeStatusHandler("closed")} type={"primary"} block>Изменить статус на:
                            Закрыт</Button>
                    </Col>
                </Row>
            )
        case "closed":
            return <>
                <InfoBlock title={"Дата заказа товаров:"}>{moment(ordered_date).format("DD.MM.YYYY - HH:mm")}</InfoBlock>
                <InfoBlock title={"Дата прибытия заказа в страну назначения:"}>{moment(delivered_to_destination).format("DD.MM.YYYY - HH:mm")}</InfoBlock>
                <InfoBlock title={"Дата отправки заказа клиенту:"}>{moment(delivered_to_client).format("DD.MM.YYYY - HH:mm")}</InfoBlock>
                <InfoBlock title={"Дата закрытия заказа:"}>{moment(cancel_closed_date).format("DD.MM.YYYY - HH:mm")}</InfoBlock>
            </>
        case "canceled":
            return <>
                <InfoBlock title={"Дата заказа товаров:"}>{ordered_date ? moment(ordered_date).format("DD.MM.YYYY - HH:mm") : "-"}</InfoBlock>
                <InfoBlock title={"Дата прибытия заказа в страну назначения:"}>{delivered_to_destination ? moment(delivered_to_destination).format("DD.MM.YYYY - HH:mm") : "-"}</InfoBlock>
                <InfoBlock title={"Дата отмены заказа:"}>{moment(cancel_closed_date).format("DD.MM.YYYY - HH:mm")}</InfoBlock>
                <InfoBlock title={"Причина отмены:"}>{cancel_reason}</InfoBlock>
            </>
        default:
            return <div>Incorrect status</div>
    }
}

export default OrderStatusChangeBlock