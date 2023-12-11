import React, {useState} from "react"
import {useGetOrdersQuery} from "./ordersApi"
import {ColumnsType} from "antd/es/table"
import {Order, OrderStatuses} from "../../types/Orders"
import {Button, Segmented, Table, Tag} from "antd"
import moment from "moment"
import Profile from "../../components/Profile"
import {returnOrderStatus} from "../../utils/returnOrderStatus"
import {useNavigate} from "react-router-dom"
import LoadingBlock from "../../components/LoadingBlock"
import Title from "antd/es/typography/Title"
import CreateOrderModal from "./CreateOrderModal"
import {numberToDecimal} from "../../utils/numberToDecimal"

export const orderColumns: ColumnsType<Order> = [
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
        render: value => `${numberToDecimal(value)}$`
    },
    {
        title: "Цена продуктов",
        dataIndex: "items_original_price",
        key: "products_price",
        render: value => `${numberToDecimal(value)}$`
    },
    {
        title: "Цена доставки",
        dataIndex: "transportation_price",
        key: "delivery_price",
        render: value => `${numberToDecimal(value)}$`
    },
    {
        title: "Клиент",
        dataIndex: "client",
        key: "client",
        render: (_, record) => <Profile name={record.customer?.name} phone={record.customer?.phone_number}/>
    },
    {
        title: "Кто принял заказ",
        dataIndex: "accepted_by",
        key: "accepted_by",
        render: (_, record) => record.admin?.name
    }
    // {
    //     title: "Действия",
    //     dataIndex: "actions",
    //     key: "actions",
    //     render: (_, record) => <OrderActionButton record={record} />
    // }
]

const orderStatusList = [
    {
        label: "Активные заказы",
        value: "active"
    },
    {
        label: "Закрытые заказы",
        value: "closed"
    },
    {
        label: "Отмененные заказы",
        value: "canceled"
    }
]

const Orders = () => {
    const [selectedStatus, setSelectedStatus] = useState<OrderStatuses | undefined>(undefined)
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 5
    })
    const {data, isLoading, isFetching, refetch} = useGetOrdersQuery({order_status: selectedStatus, page: pagination.page, pageSize: pagination.pageSize}, {refetchOnMountOrArgChange: true})
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()

    const onStatusChangeHandler = (value: string) => {
        if (value === "active") {
            setSelectedStatus(undefined)
        } else {
            // @ts-ignore
            setSelectedStatus(value)
        }
        refetch()
    }

    if (isLoading) return <LoadingBlock/>

    return <>
        <Title level={1} style={{textAlign: "center"}}>Заказы</Title>
        <Button type={"primary"} onClick={() => setModal(true)}>Создать новый заказ</Button>
        <br/>
        <br/>
        <Segmented defaultValue={"active"} onChange={(value) => onStatusChangeHandler(value.toString())} options={orderStatusList} />
        <br/>
        <br/>
        <Table
            onRow={record => ({
                onClick: () => navigate(`/orders/${record.id}`)
            })}
            onChange={(pagination) => {
                setPagination({
                    page: pagination.current || 1,
                    pageSize: pagination.pageSize || 10
                })
            }}
            loading={isFetching}
            style={{cursor: "pointer"}}
            columns={orderColumns}
            dataSource={data?.data.orders}
            pagination={{
                current: data?.data.currentPage || pagination.page,
                total: data?.data.total || 1,
                pageSize: data?.data.pageSize || pagination.pageSize,
                showSizeChanger: true,
                pageSizeOptions: [5, 10, 15, 20, 30, 50]
            }}
        />
        <CreateOrderModal modal={modal} setModal={setModal}/>
    </>
}

export default Orders