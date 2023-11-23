import React, {useState} from "react"
import {useGetClientsQuery} from "./clientsApi"
import {Button, Table, Tag} from "antd"
import {ColumnsType} from "antd/es/table"
import {Clients as ClientsType} from "../../types/Clients"
import Link from "antd/es/typography/Link"
import {formatPhone} from "../../utils/phoneNumberFormatter"
import LoadingBlock from "../../components/LoadingBlock"
import CreateClientModal from "./CreateClientModal"
import ClientsActionButton from "./ClientsActionButton"

interface ClientsProps {

}

const columns: ColumnsType<ClientsType["data"][0]> = [
    {
        title: "Имя",
        dataIndex: "name",
        key: "name",
        render: (value, record) => <span onClick={() => navigator.clipboard.writeText(record.id.toString())}>{value}</span>
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
        render: value => <Link target={"_blank"} href={value}>Ссылка</Link>
    },
    {
        title: "Адрес",
        dataIndex: "address",
        key: "address"
    },
    {
        title: "Действия",
        key: "actions",
        render: (_, record) => {
            return <ClientsActionButton record={record} />
        }
    }
]

const Clients: React.FC<ClientsProps> = ({}) => {
    const {data, isLoading, isFetching} = useGetClientsQuery()
    const [modal, setModal] = useState(false)

    if (isLoading) {
        return <LoadingBlock />
    }

    return <>
        <Button type={"primary"} onClick={() => setModal(true)}>Добавить нового клиента</Button>
        <br/>
        <br/>
        <Table loading={isFetching} columns={columns} dataSource={data?.data} />
        <CreateClientModal modal={modal} setModal={setModal} />
    </>
}

export default Clients