import React, {useState} from "react"
import {useGetBrandsQuery} from "./brandsApi"
import {ColumnsType} from "antd/es/table"
import {Brand} from "../../types/Products"
import {Button, Table} from "antd"
import LoadingBlock from "../../components/LoadingBlock"
import CreateBrandModal from "./CreateBrandModal"
import BrandActionButton from "./BrandActionButton"
import Title from "antd/es/typography/Title"
import {useNavigate} from "react-router-dom"

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
        key: "count",
        render: (value: number) => value > 0 ? <span>{value} шт.</span> : <span>-</span>
    },
    {
        title: "Логотип бренда",
        dataIndex: "brand_icon",
        key: "logo",
        render: (value: string) => value ? <img width={200} src={value} alt="brand logo"/> : <span>-</span>
    },
    {
        title: "Продано товаров",
        dataIndex: "sold_items_count",
        key: "sold",
        render: (value: number) => value > 0 ? <span>{value} шт.</span> : <span>-</span>
    },
    {
        title: "Действия",
        key: "actions",
        render: (_, record) => {
            return <BrandActionButton record={record}/>
        }
    }
]

const Brands: React.FC<BrandsProps> = ({}) => {
    const {data, isLoading, isFetching} = useGetBrandsQuery()
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()

    if (isLoading) return <LoadingBlock/>

    return <>
        <Title level={1} style={{textAlign: "center"}}>Бренды</Title>
        <Button type={"primary"} onClick={() => setModal(true)}>Добавить новый бренд</Button>
        <br/>
        <br/>
        <Table
            onRow={record => ({
                onClick: () => navigate(`/brands/${record.id}`)
            })}
            loading={isFetching}
            columns={columns}
            dataSource={data?.data}
        />
        <CreateBrandModal modal={modal} setModal={setModal}/>
    </>
}

export default Brands