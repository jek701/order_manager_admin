import React from "react"
import {useGetTokenUsagePerAdminQuery} from "./tokenUsageApi"
import LoadingBlock from "../../components/LoadingBlock"
import {Table} from "antd"
import {ColumnsType} from "antd/es/table"
import {TokenUsageAdmin} from "../../types/Usage"
import {numberToDecimal} from "../../utils/numberToDecimal"

interface TokenUsageByAdminProps {

}

const columns: ColumnsType<TokenUsageAdmin> = [
    {
        title: "ID админа",
        dataIndex: "admin_id",
        key: "admin_id"
    },
    {
        title: "Имя админа",
        dataIndex: "admin",
        key: "name",
        render: (_, record) => <span>{record.admin.name}</span>
    },
    {
        title: "Использовано токенов (всего)",
        dataIndex: "total_tokens",
        key: "total_tokens",
        render: (value) => numberToDecimal(value)
    },
    {
        title: "Использовано токенов (запрос)",
        dataIndex: "total_completion_tokens",
        key: "completion_tokens",
        render: (value) => numberToDecimal(value)
    },
    {
        title: "Использовано токенов (ответ)",
        dataIndex: "total_prompt_tokens",
        key: "prompt_tokens",
        render: (value) => numberToDecimal(value)
    },
    {
        title: "Сумма, использованная за все время",
        dataIndex: "total_cost",
        key: "total_cost",
        render: (value) => <span>{value.toFixed(2)}$</span>
    }
]

const TokenUsageByAdmin: React.FC<TokenUsageByAdminProps> = ({}) => {
    const {data, isLoading} = useGetTokenUsagePerAdminQuery()

    if (isLoading) return <LoadingBlock />

    if (data) {
        return (
            <Table columns={columns} dataSource={data.data} />
        )
    }

    return <div></div>
}

export default TokenUsageByAdmin