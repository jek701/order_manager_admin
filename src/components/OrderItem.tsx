import React, {useMemo, useState} from "react"
import {Button} from "antd"
import {MinusOutlined, PlusOutlined} from "@ant-design/icons"

interface OrderItemProps {
    item: {
        id: string
        name: string
    }
}

const OrderItem: React.FC<OrderItemProps> = ({item}) => {
    const [amount, setAmount] = useState(1)
    const itemWithAmount = useMemo(() => {
        return {
            ...item,
            amount
        }
    }, [item, amount])

    const onAmountAddHandler = () => {
        setAmount(amount + 1)
    }

    const onAmountRemoveHandler = () => {
        if (amount > 1) {
            setAmount(amount - 1)
        }
    }

    return (
        <div>
            <p>{itemWithAmount.name} - {itemWithAmount.amount} шт.</p>
            <Button onClick={onAmountRemoveHandler} icon={<MinusOutlined />} />
            {amount}
            <Button onClick={onAmountAddHandler} icon={<PlusOutlined />} />
        </div>
    )
}

export default OrderItem