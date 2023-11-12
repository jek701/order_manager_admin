import React from "react"
import {createUseStyles} from "react-jss"
import {GlobalToken} from "antd/es/theme/interface"

interface InfoBlockProps {
    title?: string | null
    children?: React.ReactNode | string
}

const useStyles = createUseStyles<string, {isTitle: boolean}, GlobalToken>({
    mainWrapper: {
        display: "grid",
        gridTemplateColumns: "1fr max-content",
        justifyContent: "space-between",
        gap: "5px",
        alignItems: "center",
        width: "100%",
        padding: ({isTitle}) => isTitle ? "17px 20px" : "17px 0",
        borderBottom: "1px solid #D9D9D9",
        fontWeight: 400,
        lineHeight: "16px",
        color: "#1E1E1E",
        "& p": {
            margin: 0
        },
        "& a": {
            fontSize: "12px",
            lineHeight: "16px"
        }
    },
    children: {
        width: "100%",
        fontWeight: 400,
        "& *": {
            margin: 0
        }
    }
})

const InfoBlock: React.FC<InfoBlockProps> = ({
                                                 title,
                                                 children
                                             }) => {
    const classes = useStyles({isTitle: title !== undefined})
    return (
        <div className={classes.mainWrapper}>
            {title ? <p>{title}</p> : null}
            <div className={classes.children}>{children}</div>
        </div>
    )
}

export default InfoBlock