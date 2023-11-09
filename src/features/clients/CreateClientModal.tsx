import React, {useEffect} from "react"
import {Form, Input, Modal, notification, Select} from "antd"
import {useCreateNewClientMutation} from "./clientsApi"

interface CreateClientModalProps {
    modal: boolean
    setModal: (value: boolean) => void
}

const CreateClientModal: React.FC<CreateClientModalProps> = ({modal, setModal}) => {
    const [form] = Form.useForm()
    const [newClient, {isSuccess: isClientCreated, isLoading: isClientCreating, isError: isClientCreateError, error: clientCreateError}] = useCreateNewClientMutation()

    const onCreateNewClient = () => {
        const formValues: {
            name?: string,
            surname?: string,
            phone_number?: string,
            gender?: string
            profile_name?: string
            profile_url?: string
            address?: string
        } = form.getFieldsValue()

        if (formValues.name && formValues.phone_number && formValues.gender) {
            newClient({
                name: formValues.name,
                surname: formValues.surname,
                phone_number: formValues.phone_number,
                gender: formValues.gender,
                profile_url: formValues.profile_url,
                profile_name: formValues.profile_name,
                address: formValues.address
            })
        } else {
            notification.error({
                message: "Ошибка",
                description: "Для создания клиента заполните все поля"
            })
        }
    }

    useEffect(() => {
        if (!isClientCreating && isClientCreated) {
            notification.success({
                message: "Успешно",
                description: "Клиент успешно создан"
            })
            setModal(false)
        }
        if (!isClientCreating && isClientCreateError) {
            notification.error({
                message: "Ошибка",
                // @ts-ignore
                description: clientCreateError?.data.message
            })
        }
    }, [isClientCreated, isClientCreating, isClientCreateError, clientCreateError])
    return (
        <Modal okText={"Создать"} cancelText={"Отменить"} onCancel={() => setModal(false)} title={"Добавить нового пользователя"} open={modal} confirmLoading={isClientCreating} onOk={onCreateNewClient}>
            <Form layout={"vertical"} form={form}>
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
        </Modal>
    )
}

export default CreateClientModal