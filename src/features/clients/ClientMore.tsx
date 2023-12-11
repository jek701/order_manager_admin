import React, {useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import LoadingBlock from "../../components/LoadingBlock"
import LeftArrowButton from "../../components/LeftArrowButton"
import {Col, Row, Table, Tag} from "antd"
import {orderColumns} from "../orders/Orders"
import {useGetOrdersQuery} from "../orders/ordersApi"
import InfoBlock from "../../components/InfoBlock"
import {useGetClientByIdQuery} from "./clientsApi"
import ColWithTitle from "../../components/ColWithTitle"
import Link from "antd/es/typography/Link"
import {formatPhone} from "../../utils/phoneNumberFormatter"
import moment from "moment"

interface ClientMoreProps {

}

const ClientMore: React.FC<ClientMoreProps> = ({}) => {
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 5
    })
    const params = useParams<{ id: string }>()
    const navigate = useNavigate()
    const {data, isLoading, isFetching} = useGetOrdersQuery({
        client_id: params.id,
        page: pagination.page,
        pageSize: pagination.pageSize
    }, {
        skip: !params.id,
        refetchOnMountOrArgChange: true
    })
    const {data: client, isLoading: isClientLoading} = useGetClientByIdQuery(params.id, {
        skip: !params.id,
        refetchOnMountOrArgChange: true
    })

    if (isLoading || isClientLoading) return <LoadingBlock/>

    if (data && client) {
        return (
            <div>
                <LeftArrowButton onClick={() => window.history.back()}/>
                <ColWithTitle title={"Информация о пользователе"}>
                    <Row gutter={[10, 10]}>
                        <Col span={12}>
                            <InfoBlock title={"ID пользователя:"}>{client.data[0].id}</InfoBlock>
                            <InfoBlock title={"Имя:"}>{client.data[0].name}</InfoBlock>
                            <InfoBlock title={"Пол:"}>{client.data[0].gender === "male" ? <Tag color={"green"}>Мужчина</Tag> : <Tag color={"pink"}>Женщина</Tag>}</InfoBlock>
                            <InfoBlock title={"Всего заказов:"}>{data.data.total}</InfoBlock>
                        </Col>
                        <Col span={12}>
                            <InfoBlock title={"Адрес:"}>{client.data[0].address}</InfoBlock>
                            <InfoBlock title={"Номер телефона:"}>{formatPhone(client.data[0].phone_number)}</InfoBlock>
                            <InfoBlock title={"Ссылка на профиль:"}>{<Link href={client.data[0].profile_url}>{client.data[0].profile_url}</Link>}</InfoBlock>
                            <InfoBlock title={"Когда был зарегистрирован:"}>{moment(client.data[0].created_at).format("DD.MM.YYYY")}</InfoBlock>
                        </Col>
                    </Row>
                </ColWithTitle>
                <ColWithTitle title={"Заказы пользователя"}>
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
                </ColWithTitle>
            </div>
        )
    }

    return <div></div>
}

export default ClientMore