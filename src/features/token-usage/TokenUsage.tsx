import React from "react"
import TokenUsageByDate from "./TokenUsageByDate"
import {Tabs, TabsProps} from "antd"
import Title from "antd/es/typography/Title"
import TokenUsageByAdmin from "./TokenUsageByAdmin"
import TokenUsageByConversation from "./TokenUsageByConversation"

interface TokenUsageProps {

}

const items: TabsProps["items"] = [
    {
        key: "by_date",
        label: "Статистика по датам",
        children: <TokenUsageByDate/>
    },
    {
        key: "by_admin",
        label: "Статистика по админам",
        children: <TokenUsageByAdmin />
    },
    {
        key: "by_conversation",
        label: "Статистика по беседам",
        children: <TokenUsageByConversation />
    }
]

const TokenUsage: React.FC<TokenUsageProps> = ({}) => {
    return <>
        <Title style={{textAlign: "center"}} level={1}>Статистика по использованию чат-бота</Title>
        <Tabs items={items}/>
    </>
}

export default TokenUsage