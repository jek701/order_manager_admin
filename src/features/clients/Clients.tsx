import React from "react"
import {useGetClientsQuery} from "./clientsApi"
import {Table, Tag} from "antd"
import {ColumnsType} from "antd/es/table"
import {Clients as ClientsType} from "../../types/Clients"
import Link from "antd/es/typography/Link"
import {formatPhone} from "../../utils/phoneNumberFormatter"

interface ClientsProps {

}

const columns: ColumnsType<ClientsType> = [
    {
        title: "Имя",
        dataIndex: "name",
        key: "name"
    },
    {
        title: "Фамилия",
        dataIndex: "surname",
        key: "surname"
    },
    {
        title: "Пол",
        dataIndex: "gender",
        key: "gender",
        render: value => value === "male" ? <Tag>Мужчина</Tag> : <Tag>Женщина</Tag>
    },
    {
        title: "Номер телефона",
        dataIndex: "phone_number",
        key: "phone_number",
        render: value => formatPhone(value)
    },
    {
        title: "Имя профиля",
        dataIndex: "profile_name",
        key: "profile_name"
    },
    {
        title: "Ссылка профиля",
        dataIndex: "profile_url",
        key: "profile_url",
        render: value => <Link target={"_blank"} href={value}>{value}</Link>
    }
]

const Clients: React.FC<ClientsProps> = ({}) => {
    const {data, isLoading} = useGetClientsQuery()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (data) {
        return (
            <Table columns={columns} dataSource={data} />
        )
    }

    return <div></div>
}

export default Clients