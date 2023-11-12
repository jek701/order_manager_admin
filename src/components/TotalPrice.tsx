import React from "react"
import {Button} from "antd"

interface TotalPriceProps {
    itemsTotalPrice: number
    deliveryPrice: number
    profitPrice: number
    setTotalPrice: () => void
}

const TotalPrice: React.FC<TotalPriceProps> = ({
                                                   itemsTotalPrice,
                                                   deliveryPrice,
                                                   profitPrice,
                                                   setTotalPrice
                                               }) => {
    return (
        <div style={{marginTop: "25px"}}>
            <p>Цена продуктов: <strong>{itemsTotalPrice}$</strong></p>
            {/*<p>Цена доставки: <strong>{deliveryPrice}$</strong></p>*/}
            <p>Чистая прибыль: <strong>{profitPrice}$</strong></p>
            {itemsTotalPrice && deliveryPrice ? <p>Предложенная итоговая цена: <strong>{itemsTotalPrice + deliveryPrice + profitPrice}$</strong> <Button onClick={setTotalPrice}>Применить</Button></p> : ""}
        </div>
    )
}

export default TotalPrice