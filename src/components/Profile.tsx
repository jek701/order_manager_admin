import React from "react"
import {createUseStyles, useTheme} from "react-jss"
import {Avatar} from "antd"
import {UserOutlined} from "@ant-design/icons"
import {GlobalToken} from "antd/es/theme/interface"
import {formatPhone} from "../utils/phoneNumberFormatter"

const useStyles = createUseStyles<string, unknown, GlobalToken>(theme => ({
    profile: {
        lineHeight: 1,
        display: "flex",
        alignItems: "center",
        gap: ".5rem",
        textAlign: "center"
    },
    details: {
        textAlign: "center",
        width: "100%"
    },
    phone: {
        fontSize: theme.fontSizeSM,
        color: theme.colorText
    },
    phoneGreen: {
        color: theme.colorPrimary
    }
}))

interface ProfileProps {
    name?: string;
    image?: string;
    phone?: string;
    showImage?: boolean;
}

const Profile: React.FC<ProfileProps> = (
    {
        name,
        phone,
        image,
        showImage = false
    }
) => {
    const theme = useTheme<GlobalToken>()
    const classes = useStyles({theme})

    return (
        <div className={classes.profile}>
            {showImage && <Avatar icon={<UserOutlined/>} src={image}/>}
            <div className={classes.details}>
                {name && <div>{name}</div>}
                {phone && formatPhone(phone)}
            </div>
        </div>
    )
}

export default Profile
