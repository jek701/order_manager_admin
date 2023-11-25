import React, {useState} from "react"
import {Form, Input, InputNumber, Select, Tag} from "antd"
import {useGetBrandsQuery} from "../brands/brandsApi"
import {Product} from "../../types/Products"

interface ProductsFormProps {
    initialValues?: Product
    onFinish: (value: any) => void
}

const profitPercentAdd = [10, 15, 20, 30, 50]

const ProductsForm: React.FC<ProductsFormProps> = ({initialValues, onFinish}) => {
    const [form] = Form.useForm()
    const {data, isLoading, isFetching} = useGetBrandsQuery()
    const [profitPrice, setProfitPrice] = useState<number | null>(null)

    const addFromPercent = (percent: number) => {
        const productOriginalPrice = form.getFieldValue("item_original_price")
        const profitPrice = Math.floor(productOriginalPrice + (productOriginalPrice * (percent/100)))
        setProfitPrice(profitPrice)
        form.setFieldValue("item_price_with_profit", profitPrice)
    }

    return (
        <Form layout={"vertical"} onFinish={onFinish} id={"product-form"} initialValues={initialValues} form={form}>
            <Form.Item label={"Название продукта"} name={"item_name"} rules={[{
                required: true,
                message: "Пожалуйста, укажите название продукта"
            }]}>
                <Input placeholder={"Введите название продукта"}/>
            </Form.Item>
            <Form.Item label={"Цена продукта (оригинальная)"} name={"item_original_price"} rules={[{
                required: true,
                message: "Пожалуйста, укажите цену продукта"
            }]}>
                <InputNumber style={{width: "100%"}} placeholder={"Введите цену продукта"} suffix={"$"} controls={false}/>
            </Form.Item>
            <Form.Item label={"Цена продукта (продажная)"} name={"item_price_with_profit"}>
                <div style={{marginBottom: "5px"}}>
                    {profitPercentAdd.map(percent => {
                        return <Tag style={{cursor: "pointer"}} onClick={() => addFromPercent(percent)}>+ {percent}%</Tag>
                    })}
                </div>
                <InputNumber value={profitPrice} onChange={(value) => setProfitPrice(value)} style={{width: "100%"}} placeholder={"Введите продажную цену продукта"} suffix={"$"} controls={false}/>
            </Form.Item>
            <Form.Item label={"Бренд товара"} name={"brand_id"} rules={[{
                required: true,
                message: "Пожалуйста, укажите бренд продукта"
            }]}>
                <Select
                    disabled={!data}
                    loading={isLoading || isFetching}
                    placeholder={"Введите id бренда"}
                    options={data?.data.map(brand => {
                        return {
                            value: brand.id,
                            label: brand.brand_name
                        }
                    })}
                />
            </Form.Item>
            <Form.Item label={"Ссылка на товар"} name={"item_url"}>
                <Input placeholder={"Введите ссылку на продукт"}/>
            </Form.Item>
            <Form.Item label={"Вес товара в граммах"} name={"item_weight"}>
                <InputNumber style={{width: "100%"}} placeholder={"Введите вес продукта (в гр.)"} suffix={"гр."} controls={false}/>
            </Form.Item>
            <Form.Item label={"Доступность"} name={"is_available"} valuePropName={"checked"}>
                <Select defaultValue={true} options={
                    [
                        {
                            label: "Доступно",
                            value: 1
                        },
                        {
                            label: "Не доступно",
                            value: 0
                        }
                    ]
                }/>
            </Form.Item>
        </Form>
    )
}

export default ProductsForm