import React, {useEffect, useState} from "react"
import {useGetDashboardQuery} from "./dashboardApi"
import {Button, Card, Space, Tag} from "antd"
import moment from "moment"
import Title from "antd/es/typography/Title"
import Link from "antd/es/typography/Link"
import LoadingBlock from "../../components/LoadingBlock"
import {returnOrderStatus} from "../../utils/returnOrderStatus"
import {formatPhone} from "../../utils/phoneNumberFormatter"
import CreateClientModal from "../clients/CreateClientModal"
import {getToken} from "../../utils/token"
import {useNavigate} from "react-router-dom"
import CreateOrderModal from "../orders/CreateOrderModal"
import TokenUsageTotal from "../token-usage/TokenUsageTotal"

interface DashboardProps {

}

const Dashboard: React.FC<DashboardProps> = ({}) => {
    const {data, isSuccess, isLoading} = useGetDashboardQuery()
    const [newClientModal, setNewClientModal] = useState(false)
    const [newOrderModal, setNewOrderModal] = useState(false)
    const token = getToken()
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [token])

    if (isLoading) return <LoadingBlock/>

    if (isSuccess && data) {
        return <>
            <Space direction={"vertical"}>
                <Space direction={"vertical"}>
                    <Title level={3}>Виджеты</Title>
                    <Space wrap direction="horizontal" size="large" align={"start"}>
                        <Card size={"small"} title={"Доходы / Траты за последние 24 часа"}>
                            <p>Всего за сегодня
                                (чистыми): <strong>{data.data.profit}$ {data.data.profit > 0 && data.data.total > 0 ?
                                    <Tag
                                        color="green">+{Math.round((data.data.profit / data.data.total) * 100)}%</Tag> : ""}</strong>
                            </p>
                            <p>Всего за сегодня: <strong>{data.data.total}$</strong></p>
                        </Card>
                        <Card size={"small"} title={"Общая статистика"}>
                            <p>Всего
                                пользователей: <strong>{data.data.totalClients}</strong></p>
                            <p>Всего
                                администраторов: <strong>{data.data.totalAdmins}</strong></p>
                            <p>Всего
                                заказов: <strong>{data.data.totalOrders}</strong></p>
                        </Card>
                        <Card title={"Использование чат-бота за все время"} size={"small"}>
                            <TokenUsageTotal/>
                        </Card>
                    </Space>
                </Space>
                <br/>
                <Space direction={"vertical"}>
                    <Title level={3}>Заказы за последние 24 часа <Button onClick={() => setNewOrderModal(true)}>Добавить
                        новый заказ</Button></Title>
                    <Space direction="horizontal" size={"large"} wrap>
                        {data.data.order.length > 0 && data.data.order.map((order) => {
                            return (
                                <Card key={order.id} title={`ID: ${order.id}`} style={{width: 300}}>
                                    <p>Статус: <strong>{returnOrderStatus(order.order_status)}</strong></p>
                                    <p>Дата
                                        заказа: <strong>{moment(order.order_date).format("DD.MM.YYYY HH:mm")}</strong>
                                    </p>
                                    <p>Доставить
                                        до: <strong>{moment(order.deliver_until).format("DD.MM.YYYY HH:mm")}</strong>
                                    </p>
                                    <p>Количество товаров: <strong>{order.item_ids.split(",").length}</strong></p>
                                    <p>Обработал: <strong>{order.admin.name}</strong></p>
                                    <p>Имя клиент: <strong>{order.customer.name}</strong></p>
                                    <p>Номер клиент: <strong>{formatPhone(order.customer.phone_number)}</strong></p>
                                    <Button href={"/orders"}>Перейти на страницу заказов</Button>
                                </Card>
                            )
                        })}
                    </Space>
                </Space>
                <br/>
                <Space direction={"vertical"}>
                    <Title level={3}>Клиенты, прошедшие регистрацию за последние 24 часа <Button
                        onClick={() => setNewClientModal(true)}>Добавить нового клиента</Button></Title>
                    <Space direction="horizontal" size="large">
                        {data.data.client.length > 0 && data.data.client.map((client) => {
                            return (
                                <Card key={`client_id_${client.id}`} title={`ID: ${client.id}`} style={{width: 300}}>
                                    <p>Имя: <strong>{client.name}</strong></p>
                                    <p>Номер: <strong>{formatPhone(client.phone_number)}</strong></p>
                                    <p>Дата
                                        регистрации: <strong>{moment(client.created_at).format("DD.MM.YYYY HH:mm")}</strong>
                                    </p>
                                    <p>Пол: <strong>{client.gender === "male" ? <Tag color="blue">Мужской</Tag> :
                                        <Tag color="magenta">Женский</Tag>}</strong></p>
                                    <p>Имя в профиле: <Link href={client.profile_url}>{client.profile_name}</Link></p>
                                    <Button href={"/clients"}>Перейти на страницу клиентов</Button>
                                </Card>
                            )
                        })}
                    </Space>
                </Space>
            </Space>
            <CreateClientModal modal={newClientModal} setModal={setNewClientModal}/>
            <CreateOrderModal modal={newOrderModal} setModal={setNewOrderModal}/>
        </>
    }

    return <div></div>
}

export default Dashboard