import React from "react"
import {createUseStyles} from "react-jss"
import Title from "antd/es/typography/Title"

interface ColWithTitleProps {
    title: string
    children?: React.ReactNode | string
    addInfo?: React.ReactNode | string
}

const useStyles = createUseStyles({
    mainWrapper: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        alignItems: "flex-start",
        width: "100%",
        padding: "17px 20px",
        marginBottom: "20px",
        "&:last-child": {
            marginBottom: 0
        },
    },
    children: {
        width: "100%",
        fontWeight: 400,
        "& *": {
            margin: 0
        }
    }
})

const ColWithTitle: React.FC<ColWithTitleProps> = ({title, children, addInfo}) => {
    const classes = useStyles()
    return (
        <div className={classes.mainWrapper}>
            <Title level={4}>{title}</Title>
            {addInfo}
            <div className={classes.children}>{children}</div>
        </div>
    )
}

export default ColWithTitle