import React, {useState} from "react"
import {useGetTokenUsagePerDateQuery} from "./tokenUsageApi"
import LoadingBlock from "../../components/LoadingBlock"
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js"
import {Bar} from "react-chartjs-2"
import moment from "moment"
import styles from "./style.module.css"
import {Tag} from "antd"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

interface TokenUsageProps {

}

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const
        },
        title: {
            display: true,
            text: "Статистика использования чат-бота в $"
        }
    }
}

const dayList = [
    {
        value: 3,
        label: "3 дня"
    },
    {
        value: 5,
        label: "5 дней"
    },
    {
        value: 7,
        label: "7 дней"
    },
    {
        value: 14,
        label: "14 дней"
    },
    {
        value: 30,
        label: "30 дней"
    }
]

const TokenUsage: React.FC<TokenUsageProps> = ({}) => {
    const [days, setDays] = useState(7)
    const {data, isLoading, isFetching} = useGetTokenUsagePerDateQuery(days, {refetchOnMountOrArgChange: true})

    const labels = data ? data.data.map(i => moment(i.date).format("DD.MM.YYYY")) : []

    if (isLoading) return <LoadingBlock/>

    if (data) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.filterListWrapper}>
                    {dayList.map(day => <Tag color={days === day.value ? "green" : "default"} style={{cursor: "pointer"}} onClick={() => setDays(day.value)}>{day.label}</Tag>)}
                </div>
                {isLoading || isFetching ?
                    <LoadingBlock/>
                    :
                    <Bar
                        options={options}
                        data={{
                            labels,
                            datasets: [
                                {
                                    label: "Использовано средств в $",
                                    data: data.data.map(i => i.total_cost),
                                    backgroundColor: "#0078FF",
                                    borderRadius: 8
                                }
                            ]
                        }}
                    />}
            </div>
        )
    }

    return <div></div>
}

export default TokenUsage