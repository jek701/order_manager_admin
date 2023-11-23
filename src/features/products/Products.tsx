import React from "react"
import {useGetAllProductsQuery} from "./productsApi"
import {ColumnsType} from "antd/es/table"
import {Products as ProductType} from "../../types/Products"
import {Table, Tag} from "antd"
import LoadingBlock from "../../components/LoadingBlock"
import Link from "antd/es/typography/Link"

const columns: ColumnsType<ProductType["data"][0]> = [
    {
        title: "Название",
        dataIndex: "item_name",
        key: "item_name",
        render: (value, record) => <span onClick={() => navigator.clipboard.writeText(record.id)}>{value}</span>
    },
    {
        title: "Цена (оригинальная)",
        dataIndex: "item_original_price",
        key: "item_original_price",
        render: (value, record) => {
            return `${value} ${record.currency_sign || record.currency_name}`
        }
    },
    {
        title: "Цена (продажная)",
        dataIndex: "item_price_with_profit",
        key: "item_price_with_profit",
        render: (value, record) => {
            const profit_percent = record.item_price_with_profit / record.item_original_price * 100 - 100
            return `${value} ${record.currency_sign} (+${profit_percent.toFixed(2)}%)`
        }
    },
    {
        title: "Ссылка на товар",
        dataIndex: "item_url",
        key: "item_url",
        render: value => <Link target={"_blank"} href={value}>Ссылка на продукт</Link>
    },
    {
        title: "Вес товара (гр.)",
        dataIndex: "item_weight",
        key: "item_weight",
        render: value => `${value} гр.`
    },
    {
        title: "Доступность",
        dataIndex: "is_available",
        key: "is_available",
        render: value => value ? <Tag color={"green"}>Доступен</Tag> : <Tag color={"red"}>Не доступен</Tag>
    },
    {
        title: "Бренд",
        dataIndex: "brand_name",
        key: "brand"
    }
]

const Products = () => {
    const {data, isLoading, isFetching} = useGetAllProductsQuery()

    if (isLoading) {
        return <LoadingBlock />
    }

    return (
        <Table loading={isFetching} columns={columns} dataSource={data?.data} />
    )
}

export default Products