import React, {useMemo} from "react"
import {Form, InputNumber, Select} from "antd"
import {CreateOrderRequestProps} from "./CreateOrderModal"
import {useGetClientsQuery} from "../clients/clientsApi"
import {useGetOptimizedProductsQuery} from "../products/productsApi"
import Profile from "../../components/Profile"
import TotalPrice from "../../components/TotalPrice"

interface OrderFormProps {
    initialValues?: CreateOrderRequestProps
    onFinish: (value: any) => void
}

const OrderForm: React.FC<OrderFormProps> = ({initialValues, onFinish}) => {
    const [form] = Form.useForm()
    const item_ids: string[] = Form.useWatch("item_ids", form)
    const delivery_price = Form.useWatch("transportation_price", form)
    const {data, isLoading: isClientsLoading} = useGetClientsQuery()
    const {
        data: items,
        isLoading: isItemsLoading,
        isFetching: isItemsFetching
    } = useGetOptimizedProductsQuery()

    const onSetTotalPriceHandler = () => {
        form.setFieldValue("total_price", itemsProfitPrice + delivery_price + itemsTotalPrice)
    }

    // Get items total price from form.getFieldValue("item_ids")
    const itemsTotalPrice = useMemo(() => {
        if (item_ids) {
            let totalPrice = 0
            item_ids.forEach(id => {
                const item = items?.data.find(item => item.id === id)
                if (item) {
                    totalPrice += item.item_original_price
                }
            })
            return Number(totalPrice)
        }
        return 0
    }, [item_ids])

    const itemsProfitPrice = useMemo(() => {
        if (item_ids) {
            let totalPrice = 0
            item_ids.forEach(id => {
                const item = items?.data.find(item => item.id === id)
                if (item) {
                    totalPrice += item.item_price_with_profit - item.item_original_price
                }
            })
            return Number(totalPrice)
        }
        return 0
    }, [item_ids])

    const onFinishHandler = (values: any) => {
        const newValues = {
            ...values,
            item_ids: values.item_ids.join(","),
            customer_id: values.customer_id
        }
        onFinish(newValues)
    }

    return (
        <Form onFinish={onFinishHandler} id={"order-form"} initialValues={initialValues} layout={"vertical"}
              form={form}>
            <Form.Item label={"Клиент"} name={"customer_id"} rules={[{
                required: true,
                message: "Пожалуйста, выберите клиента"
            }]}>
                <Select loading={isClientsLoading} options={data?.data.map(client => {
                    return {
                        value: client.id,
                        label: <Profile name={client.name} phone={client.phone_number}/>
                    }
                })} placeholder={"Выберите клиента из списка"}/>
            </Form.Item>
            <Form.Item label={"Товары"} name={"item_ids"} rules={[{
                required: true,
                message: "Пожалуйста, выберите товары"
            }]}>
                <Select mode={"multiple"} disabled={!items} loading={isItemsLoading || isItemsFetching}
                        options={items?.data.map(item => {
                            return {
                                value: item.id,
                                label: item.item_name
                            }
                        })}
                        placeholder={(isItemsFetching || isItemsLoading) ? "Загрузка..." : "Выберите товары из списка"}/>
            </Form.Item>
            <Form.Item label={"Цена доставки"} name={"transportation_price"} rules={[{
                required: true,
                message: "Пожалуйста, укажите цену за доставку"
            }]}>
                <InputNumber style={{width: "100%"}} controls={false} placeholder={"Введите цену за доставку"}/>
            </Form.Item>
            <TotalPrice setTotalPrice={onSetTotalPriceHandler} itemsTotalPrice={itemsTotalPrice}
                        deliveryPrice={delivery_price} profitPrice={itemsProfitPrice}/>
            <Form.Item label={"Итоговая цена"} name={"total_price"} rules={[{
                required: true,
                message: "Пожалуйста, укажите итоговую цену"
            }]}>
                <InputNumber suffix={"$"} controls={false} style={{width: "100%"}}
                             placeholder={"Введите итоговую цену"}/>
            </Form.Item>

            {/*<Form.Item name={"profile_name"} label={"Имя профиля"}>*/}
            {/*    <Input placeholder={"Введите имя профиля клиента"} />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item name={"profile_url"} label={"Ссылка профиля"}>*/}
            {/*    <Input placeholder={"Вставьте ссылку профиля клиента"} />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item name={"address"} label={"Адрес клиента"}>*/}
            {/*    <Input placeholder={"Введите адрес клиента"} />*/}
            {/*</Form.Item>*/}
        </Form>
    )
}

export default OrderForm