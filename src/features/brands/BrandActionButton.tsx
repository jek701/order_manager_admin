import React, {useEffect, useState} from "react"
import {Brand} from "../../types/Products"
import {Button, Dropdown, MenuProps, Modal, notification} from "antd"
import {DeleteOutlined, DownOutlined, EditOutlined} from "@ant-design/icons"
import {CreateBrandRequest, useDeleteBrandMutation, useEditBrandMutation} from "./brandsApi"
import BrandForm from "./BrandForm"

interface BrandActionButtonProps {
    record: Brand["data"][0]
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

const BrandActionButton: React.FC<BrandActionButtonProps> = ({record}) => {
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [currentBrandId, setCurrentBrandId] = useState<number | undefined>(undefined)

    const [deleteBrand, {
        isLoading: isDeleting,
        isSuccess: isDeleted,
        isError: isDeleteError,
        error: deleteError
    }] = useDeleteBrandMutation()
    const [editBrand, {
        isLoading: isEditing,
        isSuccess: isEdited,
        isError: isEditError,
        error: editError
    }] = useEditBrandMutation()

    const onActionClickHandler = (clientId: number, key: string) => {
        setCurrentBrandId(clientId)
        if (key === "delete") {
            setDeleteModal(true)
        }
        if (key === "update") {
            setEditModal(true)
        }
    }

    const onDeleteHandler = () => {
        if (currentBrandId) {
            deleteBrand(currentBrandId)
        }
    }

    const onEditHandler = (value: CreateBrandRequest) => {
        if (currentBrandId) {
            editBrand({
                id: currentBrandId,
                ...value
            })
        }
    }

    const onCloseHandler = () => {
        setDeleteModal(false)
        setEditModal(false)
        setCurrentBrandId(undefined)
    }

    useEffect(() => {
        if (!isDeleting) {
            if (isDeleted) {
                notification.success({
                    message: "Успешно",
                    description: "Бренд успешно удален"
                })
                onCloseHandler()
            }
            if (isDeleteError) {
                notification.error({
                    message: "Ошибка",
                    // @ts-ignore
                    description: deleteError.data.message.ru
                })
            }
        }
    }, [isDeleted, isDeleting, isDeleteError, deleteError])

    useEffect(() => {
        if (!isEditing) {
            if (isEdited) {
                notification.success({
                    message: "Успешно",
                    description: "Бренд успешно изменен"
                })
                onCloseHandler()
            }
            if (isEditError) {
                notification.error({
                    message: "Ошибка",
                    // @ts-ignore
                    description: editError.data.message.ru
                })
            }
        }
    }, [isEdited, isEditing, isEditError, editError])

    return <>
        <Dropdown trigger={["click"]} menu={{items, onClick: items => onActionClickHandler(record.id, items.key)}}>
            <Button>Больше <DownOutlined/></Button>
        </Dropdown>
        <Modal
            title={"Вы точно хотите удалить бренд?"}
            open={deleteModal}
            onCancel={onCloseHandler}
            onOk={onDeleteHandler}
            confirmLoading={isDeleting}
            okText={"Удалить"}
            cancelText={"Отменить"}
        />
        <Modal
            title={"Изменить бренд"}
            open={editModal}
            onCancel={onCloseHandler}
            okButtonProps={{
                htmlType: "submit",
                form: "brand-form",
                loading: isEditing
            }}
            confirmLoading={isEditing}
            okText={"Изменить"}
            cancelText={"Отменить"}
        >
            <BrandForm onFinish={onEditHandler} initialValues={record}/>
        </Modal>
    </>
}

export default BrandActionButton