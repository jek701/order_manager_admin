import React, {useEffect} from "react"
import {CreateProductRequest, useCreateNewProductMutation} from "./productsApi"
import {Modal, notification} from "antd"
import ProductsForm from "./ProductsForm"

interface CreateProductModalProps {
    modal: boolean
    setModal: (value: boolean) => void
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({modal, setModal}) => {
    const [newProduct, {
        isSuccess: isProductCreated,
        isLoading: isProductCreating,
        isError: isProductCreateError,
        error: productCreateError
    }] = useCreateNewProductMutation()

    const onCreateNewProduct = (value: CreateProductRequest) => {
        if (value.brand_id && value.item_name && value.item_original_price) {
            newProduct(value)
        } else {
            notification.error({
                message: "Ошибка",
                description: "Для создания продукта заполните все поля"
            })
        }
    }

    useEffect(() => {
        if (!isProductCreating && isProductCreated) {
            notification.success({
                message: "Успешно",
                description: "Продукт успешно создан"
            })
            setModal(false)
        }
        if (!isProductCreating && isProductCreateError) {
            notification.error({
                message: "Ошибка",
                // @ts-ignore
                description: productCreateError?.data.message.ru
            })
        }
    }, [isProductCreating, isProductCreated, isProductCreateError, productCreateError, setModal])

    return (
        <Modal
            okText={"Создать"}
            cancelText={"Отменить"}
            onCancel={() => setModal(false)}
            title={"Добавить новый продукт"}
            open={modal}
            confirmLoading={isProductCreating}
            okButtonProps={{
                disabled: isProductCreating,
                form: "product-form",
                htmlType: "submit"
            }}
        >
            <ProductsForm onFinish={onCreateNewProduct}/>
        </Modal>
    )
}

export default CreateProductModal