import React, {useEffect, useState} from "react"
import {Button, Input} from "antd"
import {Message} from "../../types/Conversation"
import {useGetConversationQuery, useNewConversationMutation, useSendMessageMutation} from "./conversationApi"
import LoadingBlock from "../../components/LoadingBlock"
import Title from "antd/es/typography/Title"
import styles from "./style.module.css"
import moment from "moment"
import cn from "classnames"

interface ConversationProps {
    order_id: string
    customer_id?: string
}

const Conversation: React.FC<ConversationProps> = ({order_id, customer_id}) => {
    const messageBlockRef = React.useRef<HTMLDivElement>(null)
    const [conversation, setConversation] = useState<Message[]>([])
    const [noConversation, setNoConversation] = useState<boolean>(false)
    const [messageSendError, setMessageSendError] = useState<string | undefined>(undefined)
    const [message, setMessage] = useState<string>("")
    const [newConversation, {
        isLoading: isNewConversationLoading
    }] = useNewConversationMutation()
    const {
        data,
        isSuccess: isConversationSuccess,
        isLoading: isConversationLoading,
        isError: isConversationError,
        isFetching: isConversationFetching
    } = useGetConversationQuery(order_id)
    const [sendMessage, {
        isSuccess: isSendMessageSuccess,
        isLoading: isSendMessageLoading,
        isError: isSendMessageError,
        data: newMessage,
        error
    }] = useSendMessageMutation()

    useEffect(() => {
        if (!isConversationLoading) {
            if (isConversationSuccess && data) {
                setConversation(data.data.rows)
                setNoConversation(false)
            } else if (isConversationError) {
                setNoConversation(true)
            }
        }
    }, [data, isConversationLoading, isConversationFetching, isConversationError, isConversationSuccess])

    const sendMessageHandler = () => {
        setMessageSendError(undefined)
        setConversation((prevState) => {
            const newState = Array.isArray(prevState) ? [...prevState] : []
            newState.push({
                id: "1",
                message,
                created_at: new Date().toISOString(),
                role: "user",
                conversation_id: "1"
            }, {
                id: "2",
                message: "typing",
                created_at: new Date().toISOString(),
                role: "system",
                conversation_id: "1"
            })
            setMessage("")
            return newState
        })
        sendMessage({order_id, message})
    }

    const newConversationHandler = () => {
        if (customer_id) newConversation({order_id, customer_id})
    }

    useEffect(() => {
        if (!isSendMessageLoading) {
            if (isSendMessageSuccess && newMessage) {
                setConversation((prevState) => {
                    const slicedState = prevState.slice(0, prevState.length - 1)
                    return [...slicedState, newMessage.data[0]]
                })
            } else if (isSendMessageError) {
                setConversation((prevState) => {
                    const slicedState = prevState.slice(0, prevState.length - 1)
                    return [...slicedState]
                })
                // @ts-ignore
                setMessageSendError(error?.data.message.ru)
            }
        }
    }, [newMessage, isSendMessageLoading, isSendMessageError, isSendMessageSuccess])

    useEffect(() => {
        if (messageBlockRef.current) {
            messageBlockRef.current.scrollTop = messageBlockRef.current.scrollHeight
        }
    }, [conversation])

    if (isConversationLoading || isConversationFetching || isNewConversationLoading) return <LoadingBlock/>

    return (
        <div className={styles.chatWrapper}>
            {!noConversation ? <div>
                    <div ref={messageBlockRef} className={styles.messageListWrapper}>
                        {conversation.length > 0 ? <>
                                {conversation.map(message => {
                                    if (message.message === "typing") {
                                        return (
                                            <div className={styles.typingBlock}>
                                                <span className={styles.dot}/>
                                                <span className={styles.dot}/>
                                                <span className={styles.dot}/>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div title={moment(message.created_at).format("DD.MM.YYYY - HH:mm")}
                                                 className={cn(styles.messageBlock, {[styles.system]: message.role === "system"})}>
                                                <p>{message.message}</p>
                                            </div>
                                        )
                                    }
                                })}
                                {messageSendError &&
                                    <div className={styles.messageSendError}>
                                        <p>{messageSendError}</p>
                                    </div>
                                }
                            </>
                            :
                            <div className={styles.noMessagesBlock}>
                                <Title level={5}>Нет сообщений</Title>
                            </div>
                        }
                    </div>
                    <div className={styles.newMessageBlock}>
                        <Input.TextArea
                            value={message}
                            autoSize={{
                                minRows: 2,
                                maxRows: 6
                            }}
                            maxLength={100}
                            placeholder={"Введите ваше сообщение"}
                            onChange={(value) => {
                                setMessage(value.target.value)
                            }}
                            showCount={true}
                        />
                        <Button disabled={message.length > 100 || message.length <= 0} type={"primary"}
                                loading={isSendMessageLoading}
                                onClick={() => sendMessageHandler()}>Отправить</Button>
                    </div>
                </div>
                :
                <div className={styles.noConversationBlock}>
                    <Title level={5}>Беседа для этого заказа не был найден</Title>
                    <Button onClick={newConversationHandler} block type={"primary"}>Начать беседу</Button>
                </div>
            }
        </div>
    )
}

export default Conversation