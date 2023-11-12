import React, {useEffect, useRef, useState} from "react"
import {createUseStyles, useTheme} from "react-jss"
import {BaseOptionType} from "rc-select/lib/Select"
import {GlobalToken} from "antd/es/theme/interface"
import {DownOutlined} from "@ant-design/icons"
import {motion, Variants} from "framer-motion"

const useStyles = createUseStyles<string, {isOpen: boolean}, GlobalToken>(theme => ({
    mainBlock: {
        position: "relative"
    },
    wrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: `1px solid ${theme.colorBorder}`,
        borderRadius: theme.borderRadius,
        overflow: "hidden",
        padding: ".5rem .75rem",
        "&[aria-invalid='true']": {
            borderColor: `${theme.colorError}`
        },
        "& *": {
            fontSize: theme.fontSizeSM
        },
        cursor: "pointer"
    },
    label: {
        fontSize: theme.fontSizeSM,
        whiteSpace: "nowrap",
        padding: ".5rem"
    },
    list: {
        position: "absolute",
        top: "calc(100% + 10px)",
        left: 0,
        width: "100%",
        zIndex: 1,
        backgroundColor: theme.colorWhite,
        border: `1px solid ${theme.colorBorder}`,
        borderRadius: theme.borderRadius,
        overflow: "hidden",
        padding: ".5rem .75rem",
        display: "flex",
        flexDirection: "column",
        "& p": {
            fontSize: theme.fontSizeSM,
            whiteSpace: "nowrap",
            padding: ".75rem .5rem",
            borderBottom: `1px solid ${theme.colorBorder}`,
            marginRight: "auto",
            display: "block",
            width: "100%",
            "&:last-child": {
                borderBottom: "none"
            }
        }
    },
    sub: {
        display: "flex",
        gap: ".25rem",
        alignItems: "center"
    },
    listBlock: {
        gap: ".25rem",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: theme.colorBgTextHover
        },
        borderRadius: theme.borderRadius,
        padding: ".25rem .5rem",
        border: `1px solid ${theme.colorBorder}`,
        marginBottom: "1rem",
        "&:last-child": {
            marginBottom: 0
        }
    }
}))

const container: Variants = {
    hidden: {opacity: 0, y: -10, visibility: "hidden"},
    visible: {opacity: 1, y: 0, visibility: "visible"}
}

interface MenuDrawerProps extends BaseOptionType {
    label: string
    defaultPlaceholder?: string
    options: {
        label: React.ReactNode | string
    }[]
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({label, options, defaultPlaceholder}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const theme = useTheme<GlobalToken>()
    const classes = useStyles({theme, isOpen})
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref])

    return (
        <div ref={ref} onClick={() => setIsOpen(!isOpen)} className={classes.mainBlock}>
            <label className={classes.wrapper}>
                <span className={classes.label}>{label}</span>
                <div className={classes.sub}>
                    {
                        defaultPlaceholder ?
                            <p>{defaultPlaceholder}</p> :
                            <p>{options[0].label}</p>
                    }
                    {options.length > 1 && <DownOutlined />}
                </div>
            </label>
            <motion.div
                variants={container}
                initial="hidden"
                animate={isOpen ? "visible" : "hidden"}
                className={classes.list}
            >
                {options.map((option, index) => {
                    return (
                        <div className={classes.listBlock} key={index}>{option.label}</div>
                    )
                })}
            </motion.div>
        </div>
    )
}

export default MenuDrawer
