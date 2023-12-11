import React from "react"
import {useGetTotalTokenUsageQuery} from "./tokenUsageApi"
import LoadingBlock from "../../components/LoadingBlock"

interface TokenUsageTotalProps {

}

const TokenUsageTotal: React.FC<TokenUsageTotalProps> = ({}) => {
    const {data, isLoading} = useGetTotalTokenUsageQuery()

    if (isLoading) return <LoadingBlock />

    if (data) {
        return (
            <div>
                <p>Использовано токенов (всего): <strong>{new Intl.NumberFormat("ru-RU").format(Number(data.data[0].total_tokens))}</strong></p>
                <p>Использовано токенов (запрос): <strong>{new Intl.NumberFormat("ru-RU").format(Number(data.data[0].total_completion_tokens))}</strong></p>
                <p>Использовано токенов (ответ): <strong>{new Intl.NumberFormat("ru-RU").format(Number(data.data[0].total_prompt_tokens))}</strong></p>
                <p>Сумма за использование токенов: <strong>{data.data[0].total_cost.toFixed(2)}$</strong></p>
            </div>
        )
    }

    return <div></div>
}

export default TokenUsageTotal