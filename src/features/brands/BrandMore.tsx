import React, {useState} from "react"
import {useGetBrandByIDQuery} from "./brandsApi"
import {useParams} from "react-router-dom"
import {useGetAllProductsQuery} from "../products/productsApi"
import LoadingBlock from "../../components/LoadingBlock"
import LeftArrowButton from "../../components/LeftArrowButton"
import {Col, Row, Table} from "antd"
import InfoBlock from "../../components/InfoBlock"
import moment from "moment/moment"
import ColWithTitle from "../../components/ColWithTitle"
import {productColumns} from "../products/Products"

interface BrandMoreProps {

}

const BrandMore: React.FC<BrandMoreProps> = ({}) => {
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 5
    })
    const params = useParams<{ id: string }>()
    const {data: brand, isLoading: isBrandLoading} = useGetBrandByIDQuery(params.id, {
        skip: !params.id,
        refetchOnMountOrArgChange: true
    })
    const {data: products, isLoading: isProductsLoading, isFetching: isProductsFetching} = useGetAllProductsQuery({
        page: pagination.page,
        pageSize: pagination.pageSize,
        brand_id: params.id
    }, {
        skip: !params.id,
        refetchOnMountOrArgChange: true
    })

    if (isBrandLoading || isProductsLoading) return <LoadingBlock />

    if (products && brand) {
        return (
            <div>
                <LeftArrowButton onClick={() => window.history.back()}/>
                <ColWithTitle title={"Информация о бренде"}>
                    <Row gutter={[10, 10]}>
                        <Col span={12}>
                            <InfoBlock title={"ID бренда:"}>{brand.data[0].id}</InfoBlock>
                            <InfoBlock title={"Название бренда:"}>{brand.data[0].brand_name}</InfoBlock>
                        </Col>
                        <Col span={12}>
                            <InfoBlock title={"Количество товаров:"}>{brand.data[0].item_count}</InfoBlock>
                            <InfoBlock title={"Когда был создан:"}>{moment(brand.data[0].created_at).format("DD.MM.YYYY")}</InfoBlock>
                        </Col>
                    </Row>
                </ColWithTitle>
                <ColWithTitle title={"Товары"}>
                    <Table
                        onChange={(pagination) => {
                            setPagination({
                                page: pagination.current || 1,
                                pageSize: pagination.pageSize || 10
                            })
                        }}
                        pagination={{
                            current: products?.data.currentPage || pagination.page,
                            total: products?.data.total || 1,
                            pageSize: products?.data.pageSize || pagination.pageSize,
                            showSizeChanger: true,
                            pageSizeOptions: [5, 10, 15, 20, 30, 50]
                        }}
                        loading={isProductsFetching}
                        columns={productColumns}
                        dataSource={products?.data.items}
                    />
                </ColWithTitle>
            </div>
        )
    }

    return <div></div>
}

export default BrandMore