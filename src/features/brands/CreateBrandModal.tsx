import React, {useEffect} from "react"
import {CreateBrandRequest, useCreateBrandMutation} from "./brandsApi"
import {Modal, notification} from "antd"
import BrandForm from "./BrandForm"

interface CreateBrandModalProps {
    modal: boolean
    setModal: (value: boolean) => void
}

const CreateBrandModal: React.FC<CreateBrandModalProps> = ({modal, setModal}) => {
    const [newBrand, {
        isSuccess: isBrandCreated,
        isLoading: isBrandCreating,
        isError: isBrandCreateError,
        error: brandCreateError
    }] = useCreateBrandMutation()

    const onCreateNewBrand = (formValues: CreateBrandRequest) => {
        if (formValues.brand_name) {
            newBrand({
                brand_name: formValues.brand_name,
                brand_icon: formValues.brand_icon
            })
        } else {
            notification.error({
                message: "Ошибка",
                description: "Для создания бренда заполните все поля"
            })

        }
    }

    useEffect(() => {
        if (!isBrandCreating && isBrandCreated) {
            notification.success({
                message: "Успешно",
                description: "Бренд успешно создан"
            })
            setModal(false)
        }
        if (!isBrandCreating && isBrandCreateError) {
            notification.error({
                message: "Ошибка",
                // @ts-ignore
                description: brandCreateError?.data.message.ru
            })
        }
    }, [isBrandCreating, isBrandCreated, isBrandCreateError, brandCreateError])

    return (
        <Modal
            okText={"Создать"}
            cancelText={"Отменить"}
            title={"Создание бренда"}
            open={modal}
            onCancel={() => setModal(false)}
            okButtonProps={{
                disabled: isBrandCreating,
                form: "brand-form",
                htmlType: "submit"
            }}
        >
            <BrandForm onFinish={onCreateNewBrand} />
        </Modal>
    )
}

export default CreateBrandModal