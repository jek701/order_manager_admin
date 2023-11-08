import React from "react"
import {useGetBrandsQuery} from "./brandsApi"
import {ColumnsType} from "antd/es/table"
import {Brand} from "../../types/Products"
import {Table} from "antd"

interface BrandsProps {

}

const columns: ColumnsType<Brand["data"][0]> = [
    {
        title: "Название",
        dataIndex: "brand_name",
        key: "name"
    },
    {
        title: "Количество товаров",
        dataIndex: "item_count",
        key: "count"
    },
    {
        title: "Логотип бренда",
        dataIndex: "brand_icon",
        key: "logo",
        render: (value: string) => <img width={200} src={value} alt="brand logo" />
    },
    {
        title: "Продано товаров",
        dataIndex: "sold_items_count",
        key: "sold",
        render: (value: number) => value > 0 ? <span>{value} шт.</span> : <span>-</span>
    }
]

const Brands: React.FC<BrandsProps> = ({}) => {
    const {data} = useGetBrandsQuery()
    return (
        <Table columns={columns} dataSource={data?.data} />
    )
}

export default Brands