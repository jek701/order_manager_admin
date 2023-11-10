import React, {useEffect} from "react"
import {Modal, notification} from "antd"
import {useCreateNewClientMutation} from "./clientsApi"
import ClientForm from "./ClientForm"

interface CreateClientModalProps {
    modal: boolean
    setModal: (value: boolean) => void
}

export interface CreateClientRequestProps {
    name?: string,
    surname?: string,
    phone_number?: string,
    gender?: string
    profile_name?: string
    profile_url?: string
    address?: string
}

const CreateClientModal: React.FC<CreateClientModalProps> = ({modal, setModal}) => {
    const [newClient, {
        isSuccess: isClientCreated,
        isLoading: isClientCreating,
        isError: isClientCreateError,
        error: clientCreateError
    }] = useCreateNewClientMutation()

    const onCreateNewClient = (formValues: CreateClientRequestProps) => {
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
        <Modal
            okText={"Создать"}
            cancelText={"Отменить"}
            onCancel={() => setModal(false)}
            title={"Добавить нового пользователя"}
            open={modal}
            okButtonProps={{
                disabled: isClientCreating,
                form: "client-form",
                htmlType: "submit"
            }}
        >
            <ClientForm onFinish={onCreateNewClient}/>
        </Modal>
    )
}

export default CreateClientModal