import React, {useState} from "react"
import {useGetAllProductsQuery} from "./productsApi"
import {ColumnsType} from "antd/es/table"
import {Products as ProductType} from "../../types/Products"
import {Button, Table, Tag} from "antd"
import LoadingBlock from "../../components/LoadingBlock"
import Link from "antd/es/typography/Link"
import ProductsActionButton from "./ProductsActionButton"
import CreateProductModal from "./CreateProductModal"

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
        render: (value) => {
            return `${value}$`
        }
    },
    {
        title: "Цена (продажная)",
        dataIndex: "item_price_with_profit",
        key: "item_price_with_profit",
        render: (value, record) => {
            const profit_percent = record.item_price_with_profit / record.item_original_price * 100 - 100
            return `${value}$ (+${profit_percent.toFixed(2)}%)`
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
    },
    {
        title: "Действия",
        dataIndex: "actions",
        key: "actions",
        render: (_, record) => <ProductsActionButton record={record}/>
    }
]

const Products = () => {
    const {data, isLoading, isFetching} = useGetAllProductsQuery()
    const [modal, setModal] = useState(false)

    if (isLoading) {
        return <LoadingBlock/>
    }

    return <>
        <Button type={"primary"} onClick={() => setModal(true)}>Добавить нового клиента</Button>
        <br/>
        <br/>
        <Table loading={isFetching} columns={columns} dataSource={data?.data}/>
        <CreateProductModal modal={modal} setModal={setModal} />
    </>
}

export default Products