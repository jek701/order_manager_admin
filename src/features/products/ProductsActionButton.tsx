import React, {useEffect, useState} from "react"
import {Product} from "../../types/Products"
import {Button, Dropdown, MenuProps, Modal, notification} from "antd"
import {DeleteOutlined, DownOutlined, EditOutlined} from "@ant-design/icons"
import {CreateProductRequest, useDeleteProductMutation, useEditProductMutation} from "./productsApi"
import ProductsForm from "./ProductsForm"

interface ProductsActionButtonProps {
    record: Product
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

const ProductsActionButton: React.FC<ProductsActionButtonProps> = ({record}) => {
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [currentProductId, setCurrentProductId] = useState<string | undefined>(undefined)

    const [deleteProduct, {
        isLoading: isDeleting,
        isSuccess: isDeleted,
        isError: isDeleteError,
        error: deleteError
    }] = useDeleteProductMutation()
    const [editProduct, {
        isLoading: isEditing,
        isSuccess: isEdited,
        isError: isEditError,
        error: editError
    }] = useEditProductMutation()

    const onActionClickHandler = (productId: string, key: string) => {
        setCurrentProductId(productId)
        if (key === "delete") {
            setDeleteModal(true)
        }
        if (key === "update") {
            setEditModal(true)
        }
    }

    const onDeleteHandler = () => {
        if (currentProductId) {
            deleteProduct(currentProductId)
        }
    }

    const onEditHandler = (value: CreateProductRequest) => {
        if (currentProductId) {
            editProduct({
                id: currentProductId,
                ...value
            })
        }
        console.log(value)
    }

    const onCloseHandler = () => {
        setDeleteModal(false)
        setEditModal(false)
        setCurrentProductId(undefined)
    }

    useEffect(() => {
        if (!isDeleting) {
            if (isDeleted) {
                notification.success({
                    message: "Успешно",
                    description: "Продукт успешно удален"
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
                    description: "Продукт успешно обновлено"
                })
                onCloseHandler()
            }
            if (isEditError) {
                notification.error({
                    message: "Ошибка",
                    // @ts-ignore
                    description: deleteError.data.message.ru
                })
            }
        }
    }, [isEdited, isEditing, isEditError, editError])

    return <>
        <Dropdown trigger={["click"]} menu={{items, onClick: items => onActionClickHandler(record.id, items.key)}}>
            <Button>Больше <DownOutlined/></Button>
        </Dropdown>
        <Modal
            title={"Вы точно хотите удалить продукт"}
            open={deleteModal}
            onCancel={onCloseHandler}
            onOk={onDeleteHandler}
            confirmLoading={isDeleting}
            okText={"Удалить"}
            cancelText={"Отменить"}
        />
        <Modal
            title={"Изменить пользователя"}
            open={editModal}
            onCancel={onCloseHandler}
            confirmLoading={isEditing}
            okText={"Изменить"}
            cancelText={"Отменить"}
            okButtonProps={{
                htmlType: "submit",
                form: "product-form",
                loading: isEditing
            }}
        >
            <ProductsForm onFinish={onEditHandler} initialValues={record}/>
        </Modal>
    </>
}

export default ProductsActionButton