import React from "react"
import {useGetAdminsQuery} from "./adminsApi"
import {ColumnsType} from "antd/es/table"
import {Admin as AdminType} from "../../types/Admin"
import {Table} from "antd"
import LoadingBlock from "../../components/LoadingBlock"

const columns: ColumnsType<AdminType> = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id"
    },
    {
        title: "Имя",
        dataIndex: "name",
        key: "name"
    },
    {
        title: "Номер",
        dataIndex: "phone_number",
        key: "number"
    },
    {
        title: "Роль",
        dataIndex: "role",
        key: "role"
    }
]

const Admin = () => {
    const {data, isLoading, isFetching} = useGetAdminsQuery()

    if (isLoading) return <LoadingBlock />

    if (data) {
        return (
            <Table loading={isFetching} columns={columns} dataSource={data.data} rowKey={"id"} />
        )
    }

    return <div></div>
}

export default Admin