import React from "react"
import {useGetTokenUsagePerConversationQuery} from "./tokenUsageApi"
import LoadingBlock from "../../components/LoadingBlock"
import {Table} from "antd"
import {ColumnsType} from "antd/es/table"
import {TokenUsageConversation} from "../../types/Usage"

interface TokenUsageByAdminProps {

}

const columns: ColumnsType<TokenUsageConversation> = [
    {
        title: "ID беседы",
        dataIndex: "conversation_id",
        key: "conversation_id"
    },
    {
        title: "Использовано токенов (всего)",
        dataIndex: "total_tokens",
        key: "total_tokens",
        render: (value) => new Intl.NumberFormat("ru-RU").format(value)
    },
    {
        title: "Использовано токенов (запрос)",
        dataIndex: "total_completion_tokens",
        key: "completion_tokens",
        render: (value) => new Intl.NumberFormat("ru-RU").format(value)
    },
    {
        title: "Использовано токенов (ответ)",
        dataIndex: "total_prompt_tokens",
        key: "prompt_tokens",
        render: (value) => new Intl.NumberFormat("ru-RU").format(value)
    },
    {
        title: "Сумма, использованная за все время",
        dataIndex: "total_cost",
        key: "total_cost",
        render: (value) => <span>{value.toFixed(2)}$</span>
    }
]

const TokenUsageByAdmin: React.FC<TokenUsageByAdminProps> = ({}) => {
    const {data, isLoading} = useGetTokenUsagePerConversationQuery()

    if (isLoading) return <LoadingBlock />

    if (data) {
        return (
            <Table columns={columns} dataSource={data.data} />
        )
    }

    return <div></div>
}

export default TokenUsageByAdmin