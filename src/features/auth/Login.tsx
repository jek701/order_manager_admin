import React, {useEffect} from "react"
import {Button, Form, Input, notification} from "antd"
import {useLoginMutation} from "./authApi"
import {LockOutlined, UserOutlined} from "@ant-design/icons"
import styles from "./Login.module.css"
import Title from "antd/es/typography/Title"
import {useNavigate} from "react-router-dom"
import {getToken, setToken} from "../../utils/token"

interface LoginProps {

}

const Login: React.FC<LoginProps> = ({}) => {
    const [api, contextHolder] = notification.useNotification()
    const [login, {data, isSuccess, isLoading, isError, error}] = useLoginMutation()
    const navigate = useNavigate()
    const token = getToken()

    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [token])

    const onSubmitHandler = (values: {
        phone_number: string,
        password: string
    }) => {
        if (values.phone_number && values.password) {
            login({
                password: values.password,
                phone_number: values.phone_number
            })
        }
    }

    useEffect(() => {
        if (!isLoading && isSuccess && data) {
            setToken(data.token)
            api.success({
                type: "success",
                message: "Успешно",
                description: "Вы успешно вошли в свой профиль. Вы будете перенаправлены на главную страницу через 3 секунды"
            })
            setTimeout(() => {
                navigate("/")
            }, 3000)
        }
        if (!isLoading && isError) {
            api.error({
                type: "error",
                message: "Ошибка",
                // @ts-ignore
                description: error && "data" in error ? error.data?.message : "Произошла ошибка при входе в систему. Пожалуйста, попробуйте еще раз"
            })
        }
    }, [isLoading, isSuccess, data])

    return <>
        <div className={styles.formModal}>
            <Title level={3}>Добро пожаловать в систему менеджера заказов</Title>
            <Form
                layout={"vertical"}
                name="normal_login"
                className="login-form"
                initialValues={{remember: true}}
                onFinish={onSubmitHandler}
            >
                <Form.Item
                    label={"Номер телефона"}
                    name="phone_number"
                    rules={[{required: true, message: "Пожалуйста, введите номер телефона!"}]}
                >
                    <Input
                        size={"large"}
                        prefix={<UserOutlined className="site-form-item-icon"/>}
                        placeholder="Введите ваш номер телефона"/>
                </Form.Item>
                <Form.Item
                    label={"Пароль"}
                    name="password"
                    rules={[{required: true, message: "Пожалуйста, введите пароль!"}]}
                >
                    <Input
                        size={"large"}
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Введите ваш пароль"
                    />
                </Form.Item>

                <Form.Item>
                    <Button size={"large"} block type="primary" htmlType="submit" className="login-form-button">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
        {contextHolder}
    </>
}

export default Login