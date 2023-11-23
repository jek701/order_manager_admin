import React from "react"
import {useGetOrdersQuery} from "./ordersApi"
import {ColumnsType} from "antd/es/table"
import {Order} from "../../types/Orders"
import {Table, Tag} from "antd"
import moment from "moment"
import Profile from "../../components/Profile"
import {returnOrderStatus} from "../../utils/returnOrderStatus"
import {useNavigate} from "react-router-dom"
import LoadingBlock from "../../components/LoadingBlock"

const columns: ColumnsType<Order> = [
    {
        title: "Дата заказа",
        dataIndex: "order_date",
        key: "date",
        render: (value) => moment(value).format("DD.MM.YYYY HH:mm")
    },
    {
        title: "Доставить до",
        dataIndex: "deliver_until",
        key: "deliver_until",
        render: (value) => value ? moment(value).format("DD.MM.YYYY HH:mm") : "-"
    },
    {
        title: "Статус",
        dataIndex: "order_status",
        key: "status",
        render: status => <Tag>{returnOrderStatus(status)}</Tag>
    },
    {
        title: "Итоговая цена",
        dataIndex: "total_price",
        key: "price",
        render: value => `${value}$`
    },
    {
        title: "Цена продуктов",
        dataIndex: "items_original_price",
        key: "products_price",
        render: value => `${value}$`
    },
    {
        title: "Цена доставки",
        dataIndex: "transportation_price",
        key: "delivery_price",
        render: value => `${value}$`
    },
    {
        title: "Клиент",
        dataIndex: "client",
        key: "client",
        render: (_, record) => <Profile name={record.customer?.name} phone={record.customer?.phone_number} />
    },
    {
        title: "Кто принял заказ",
        dataIndex: "accepted_by",
        key: "accepted_by",
        render: (_, record) => record.admin.name
    }
    // {
    //     title: "Действия",
    //     dataIndex: "actions",
    //     key: "actions",
    //     render: (_, record) => <OrderActionButton record={record} />
    // }
]

const Orders = () => {
    const {data, isLoading, isFetching} = useGetOrdersQuery({})
    const navigate = useNavigate()

    if (isLoading) return <LoadingBlock />

    return (
        <div>
            <Table
                onRow={record => ({
                    onClick: () => navigate(`/orders/${record.id}`)
                })}
                loading={isFetching}
                style={{cursor: "pointer"}}
                columns={columns}
                dataSource={data?.data}
            />
        </div>
    )
}

export default Orders