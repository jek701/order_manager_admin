import React, {useState} from "react"
import {useGetAllProductsQuery} from "./productsApi"
import {ColumnsType} from "antd/es/table"
import {Products as ProductType} from "../../types/Products"
import {Button, Table, Tag} from "antd"
import LoadingBlock from "../../components/LoadingBlock"
import Link from "antd/es/typography/Link"
import ProductsActionButton from "./ProductsActionButton"
import CreateProductModal from "./CreateProductModal"
import Title from "antd/es/typography/Title"

const columns: ColumnsType<ProductType["data"]["items"][0]> = [
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
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 5
    })
    const {data, isLoading, isFetching} = useGetAllProductsQuery({
        page: pagination.page,
        pageSize: pagination.pageSize
    }, {
        refetchOnMountOrArgChange: true
    })
    const [modal, setModal] = useState(false)

    if (isLoading) {
        return <LoadingBlock/>
    }

    return <>
        <Title level={1} style={{textAlign: "center"}}>Товары</Title>
        <Button type={"primary"} onClick={() => setModal(true)}>Добавить новый продукт</Button>
        <br/>
        <br/>
        <Table
            onChange={(pagination) => {
                setPagination({
                    page: pagination.current || 1,
                    pageSize: pagination.pageSize || 10
                })
            }}
            pagination={{
                current: data?.data.currentPage || pagination.page,
                total: data?.data.total || 1,
                pageSize: data?.data.pageSize || pagination.pageSize,
                showSizeChanger: true,
                pageSizeOptions: [5, 10, 15, 20, 30, 50]
            }}
            loading={isFetching}
            columns={columns}
            dataSource={data?.data.items}
        />
        <CreateProductModal modal={modal} setModal={setModal}/>
    </>
}

export default Products