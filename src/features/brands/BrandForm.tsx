import React from "react"
import {Form, Input} from "antd"

interface BrandFormProps {
    onFinish: (value: any) => void
    initialValues?: any
}

const BrandForm: React.FC<BrandFormProps> = ({onFinish, initialValues}) => {
    const [form] = Form.useForm()
    return (
        <Form id={"brand-form"} form={form} onFinish={onFinish} initialValues={initialValues}>
            <Form.Item label={"Название бренда"} name={"brand_name"} rules={[{
                required: true,
                message: "Пожалуйста, укажите название бренда"
            }]}>
                <Input placeholder={"Введите название бренда"} />
            </Form.Item>
            <Form.Item label={"Логотип"} name={"brand_icon"}>
                <Input placeholder={"Введите логотип бренда"} />
            </Form.Item>
        </Form>
    )
}

export default BrandForm