import React from "react"
import {Form, Input, Select} from "antd"
import {CreateClientRequestProps} from "./CreateClientModal"

interface ClientFormProps {
    initialValues?: CreateClientRequestProps
    onFinish: (value: any) => void
}

const ClientForm: React.FC<ClientFormProps> = ({initialValues, onFinish}) => {
    const [form] = Form.useForm()

    return (
        <Form onFinish={onFinish} id={"client-form"} initialValues={initialValues} layout={"vertical"} form={form}>
            <Form.Item label={"Имя"} name={"name"} rules={[{
                required: true,
                message: "Пожалуйста, укажите имя клиента"
            }]}>
                <Input placeholder={"Введите имя клиента"} />
            </Form.Item>
            <Form.Item label={"Фамилия"} name={"surname"}>
                <Input placeholder={"Введите фамилию клиента"} />
            </Form.Item>
            <Form.Item label={"Номер телефона"} name={"phone_number"} rules={[{
                required: true,
                message: "Пожалуйста, укажите номер телефона клиента"
            }]}>
                <Input placeholder={"Введите номер телефона клиента"} />
            </Form.Item>
            <Form.Item label={"Пол"} name={"gender"} rules={[{
                required: true,
                message: "Пожалуйста, укажите пол клиента"
            }]}>
                <Select options={[
                    {
                        value: "male",
                        label: "Мужской"
                    },
                    {
                        value: "female",
                        label: "Женский"
                    }
                ]} placeholder={"Выберите пол"} />
            </Form.Item>
            <Form.Item name={"profile_name"} label={"Имя профиля"}>
                <Input placeholder={"Введите имя профиля клиента"} />
            </Form.Item>
            <Form.Item name={"profile_url"} label={"Ссылка профиля"}>
                <Input placeholder={"Вставьте ссылку профиля клиента"} />
            </Form.Item>
            <Form.Item name={"address"} label={"Адрес клиента"}>
                <Input placeholder={"Введите адрес клиента"} />
            </Form.Item>
        </Form>
    )
}

export default ClientForm