import React from "react"
import {Avatar, Dropdown, Modal} from "antd"
import {PoweroffOutlined, UserOutlined} from "@ant-design/icons"
import {createUseStyles} from "react-jss"
import {useGetMeQuery} from "../../features/auth/authApi"
import {formatPhone} from "../../utils/phoneNumberFormatter"
import {removeToken} from "../../utils/token"
import {useNavigate} from "react-router-dom"


const useStyles = createUseStyles({
    firstNavBlock: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "15px"
    }
})

interface HeaderRightBlockProps {
    extra?: React.ReactNode
}

const HeaderRightBlock: React.FC<HeaderRightBlockProps> = ({extra}) => {
    const classes = useStyles()
    const {data, isSuccess} = useGetMeQuery()
    const navigate = useNavigate()

    // Выйти из системы
    const onLogoutHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите выйти?",
            onOk: () => {
                removeToken()
                navigate("/login")
            }
        })
    }

    const items = [
        {
            label: <>
                {data?.data.name}
                <br />
                {data && formatPhone(data?.data.phone_number)}
            </>,
            key: "name",
            disabled: true
        },
        {
            label: "Выйти",
            key: "logout",
            icon: <PoweroffOutlined />,
            onClick: onLogoutHandler
        }
    ]

    if (isSuccess && data) {
        return (
            <div className={classes.firstNavBlock}>
                {extra}
                <Dropdown menu={{items}} arrow>
                    <Avatar
                        icon={<UserOutlined />}
                        style={{verticalAlign: "middle", background: "#016f4d"}}
                    />
                </Dropdown>
            </div>
        )
    }

    return (
        <div className={classes.firstNavBlock}>
            {extra}
        </div>
    )
}

export default HeaderRightBlock
