import React, {useEffect, useState} from "react"
import {Button, Dropdown, MenuProps, Modal, notification} from "antd"
import {DeleteOutlined, DownOutlined, EditOutlined} from "@ant-design/icons"
import {Order} from "../../types/Orders"
import {useDeleteOrderMutation} from "./ordersApi"

interface OrderActionButtonProps {
    record: Order
}

const items: MenuProps["items"] = [
    {
        key: "update",
        label: <><EditOutlined/> Изменить</>
    },
    {
        key: "delete",
        label: <><DeleteOutlined/> Удалить</>,
        danger: true
    }
]

const OrderActionButton: React.FC<OrderActionButtonProps> = ({record}) => {
    const [deleteModal, setDeleteModal] = useState(false)
    // const [editModal, setEditModal] = useState(false)
    const [currentOrderId, setCurrentOrderId] = useState<string | undefined>(undefined)

    // APIs
    const [deleteOrder, {isLoading: isDeleting, isSuccess: isDeleted, isError: isDeleteError, error: deleteError}] = useDeleteOrderMutation()
    // const [editCustomer, {isLoading: isEditing, isSuccess: isEdited, isError: isEditError, error: editError}] = useEditCustomerMutation()

    const onActionClickHandler = (orderId: string, key: string) => {
        setCurrentOrderId(orderId)
        if (key === "delete") {
            setDeleteModal(true)
        }
        // if (key === "update") {
        //     setEditModal(true)
        // }
    }

    const onDeleteHandler = () => {
        if (currentOrderId) {
            deleteOrder(currentOrderId)
        }
    }

    // const onEditHandler = (values: CreateClientRequestProps) => {
    //     if (currentClientId) {
    //         editCustomer({
    //             id: currentClientId.toString(),
    //             ...values
    //         })
    //     }
    // }

    const onCloseHandler = () => {
        setDeleteModal(false)
        // setEditModal(false)
        setCurrentOrderId(undefined)
    }

    useEffect(() => {
        if (!isDeleting) {
            if (isDeleted) {
                notification.success({
                    message: "Успешно",
                    description: "Заказ успешно удален"
                })
                onCloseHandler()
            }
            if (isDeleteError) {
                notification.error({
                    message: "Ошибка",
                    // @ts-ignore
                    description: deleteError.data.message
                })
            }
        }
    }, [isDeleted, isDeleting, isDeleteError, deleteError])

    // useEffect(() => {
    //     if (!isEditing) {
    //         if (isEdited) {
    //             notification.success({
    //                 message: "Успешно",
    //                 description: "Клиент успешно изменен"
    //             })
    //             onCloseHandler()
    //         }
    //         if (isEditError) {
    //             notification.error({
    //                 message: "Ошибка",
    //                 // @ts-ignore
    //                 description: editError.data.message
    //             })
    //         }
    //     }
    // }, [isEdited, isEditing, isEditError, editError])

    return <>
        <Dropdown trigger={["click"]} menu={{items, onClick: items => onActionClickHandler(record.id, items.key)}}>
            <Button>Больше <DownOutlined /></Button>
        </Dropdown>
        <Modal
            title={"Вы точно хотите удалить пользователя?"}
            open={deleteModal}
            onCancel={onCloseHandler}
            onOk={onDeleteHandler}
            confirmLoading={isDeleting}
            okText={"Удалить"}
            cancelText={"Отменить"}
        />
        {/*<Modal*/}
        {/*    title={"Изменить пользователя"}*/}
        {/*    open={editModal}*/}
        {/*    onCancel={onCloseHandler}*/}
        {/*    okText={"Изменить"}*/}
        {/*    cancelText={"Отменить"}*/}
        {/*    okButtonProps={{*/}
        {/*        htmlType: "submit",*/}
        {/*        form: "client-form",*/}
        {/*        loading: isEditing*/}
        {/*    }}*/}
        {/*>*/}
        {/*    <ClientForm onFinish={onEditHandler} initialValues={record} />*/}
        {/*</Modal>*/}
    </>
}

export default OrderActionButton