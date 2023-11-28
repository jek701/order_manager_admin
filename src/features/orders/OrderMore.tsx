import React from "react"
import {useNavigate, useParams} from "react-router-dom"
import {useGetOrderByIDQuery} from "./ordersApi"
import LoadingBlock from "../../components/LoadingBlock"
import InfoBlock from "../../components/InfoBlock"
import {Col, Row, Tag} from "antd"
import moment from "moment"
import {returnOrderStatus} from "../../utils/returnOrderStatus"
import ErrorNotFound from "../../components/ErrorNotFound"
import ColWithTitle from "../../components/ColWithTitle"
import {formatPhone} from "../../utils/phoneNumberFormatter"
import LeftArrowButton from "../../components/LeftArrowButton"
import MenuDrawer from "../../components/MenuDrawer"
import OrderStatusChangeBlock from "./OrderStatusChangeBlock"

interface OrderMoreProps {

}

const OrderMore: React.FC<OrderMoreProps> = ({}) => {
    const params = useParams<{ id: string }>()
    const navigate = useNavigate()
    const {data, isLoading, isError, isFetching} = useGetOrderByIDQuery(params.id, {
        skip: !params.id,
        refetchOnMountOrArgChange: true
    })

    if (isLoading || isFetching) return <LoadingBlock/>

    if (data && data.data) {
        return (
            <div>
                <div><LeftArrowButton onClick={() => window.history.back()}/></div>
                <Row gutter={[10, 10]}>
                    <Col span={12}>
                        <Col span={24}>
                            <ColWithTitle title={"Информация о заказе"}>
                                <InfoBlock title={"ID заказа:"}>{data?.data?.id}</InfoBlock>
                                <InfoBlock
                                    title={"Дата создания:"}>{moment(data?.data?.order_date).format("DD.MM.YYYY HH:mm")}</InfoBlock>
                                <InfoBlock
                                    title={"Дата доставки:"}>{moment(data?.data?.deliver_until).format("DD.MM.YYYY HH:mm")}</InfoBlock>
                                <InfoBlock
                                    title={"Статус:"}><Tag>{returnOrderStatus(data?.data?.order_status)}</Tag></InfoBlock>
                                <InfoBlock title={"Сумма:"}>{data?.data?.total_price}$</InfoBlock>
                                <InfoBlock
                                    title={"Чистая прибыль:"}>{data?.data?.profit_price}$ {data.data.profit_price > 0 && data.data.total_price > 0 ?
                                    <Tag
                                        color="green">+{Math.round((data.data.profit_price / data.data.total_price) * 100)}%</Tag> : ""}
                                </InfoBlock>
                                <InfoBlock>
                                    <MenuDrawer label={"Список товаров"} defaultPlaceholder={"Развернуть"} options={
                                        data.data.items.map(item => {
                                            return {
                                                label: <div>
                                                    <p>Название: <a href={item.item_url}
                                                                    target={"_blank"}>{item.item_name}</a></p>
                                                    <p>Бренд: <strong>{item.brand?.brand_name}</strong></p>
                                                    <p>Цена (продажная): <strong>{item.item_price_with_profit}$</strong>
                                                    </p>
                                                </div>
                                            }
                                        })
                                    }/>
                                </InfoBlock>
                            </ColWithTitle>
                        </Col>
                    </Col>
                    <Col span={12}>
                        <Col span={24}>
                            <ColWithTitle title={"Информация о клиенте"}>
                                <InfoBlock title={"ID клиента:"}>{data?.data?.customer.id}</InfoBlock>
                                <InfoBlock title={"Имя клиента:"}>{data?.data?.customer.name}</InfoBlock>
                                <InfoBlock
                                    title={"Телефон клиента:"}>{formatPhone(data?.data?.customer.phone_number)}</InfoBlock>
                                <InfoBlock title={"Адрес клиента:"}>{data?.data?.customer.address}</InfoBlock>
                                <InfoBlock title={"Профиль клиента:"}>
                                    {data.data.customer.profile_url ? (
                                            <a href={data.data.customer.profile_url} target={"_blank"}>{
                                                data.data.customer.profile_name
                                            }</a>
                                        )
                                        :
                                        (
                                            data.data.customer.profile_name
                                        )
                                    }
                                </InfoBlock>
                                {data.data.customerOrders && data.data.customerOrders.length > 0 && <InfoBlock>
                                    <MenuDrawer
                                        defaultPlaceholder={`Развернуть`}
                                        options={data.data.customerOrders.map(order => {
                                            return {
                                                label: <div onClick={() => navigate(`/orders/${order.id}`)}>
                                                    <p>Номер заказа: <strong>{order.id}</strong></p>
                                                    <p>Дата
                                                        заказа: <strong>{moment(order.order_date).format("DD.MM.YYYY HH:mm")}</strong>
                                                    </p>
                                                    <p>Сумма заказа: <strong>{order.total_price}$</strong></p>
                                                </div>
                                            }
                                        })}
                                        label={"Список Заказов:"}
                                    />
                                </InfoBlock>}
                            </ColWithTitle>
                        </Col>
                        <Col span={24}>
                            <ColWithTitle title={"Информация об администраторе"}>
                                <InfoBlock title={"ID администратора:"}>{data?.data?.admin.id}</InfoBlock>
                                <InfoBlock title={"Имя администратора:"}>{data?.data?.admin.name}</InfoBlock>
                                <InfoBlock
                                    title={"Телефон администратора:"}>{formatPhone(data?.data?.admin.phone_number)}</InfoBlock>
                            </ColWithTitle>
                        </Col>
                        <Col span={24}>
                            <ColWithTitle title={"Статус заказа"}>
                                <OrderStatusChangeBlock cancel_closed_date={data.data.cancel_closed_date}
                                                        cancel_reason={data.data.cancel_reason}
                                                        delivered_to_client={data.data.delivered_to_client}
                                                        ordered_date={data.data.ordered_date}
                                                        delivered_to_destination={data.data.delivered_to_destination}
                                                        id={data.data.id} order_status={data.data.order_status}/>
                            </ColWithTitle>
                        </Col>
                    </Col>
                </Row>
            </div>
        )
    }

    if (isError) return <ErrorNotFound/>

    return null
}

export default OrderMore