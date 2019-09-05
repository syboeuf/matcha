import React, { Component } from "react"

import { getListMatch } from "utils/fileProvider"
import { UserConsumer } from "store/UserProvider"

import { ReactComponent as Conversation } from './conversation.svg'

import './Messages.css'

const limits = 20

class Messages extends Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        this.state = {
            chats: [],
            activeChat: null,
            listMatch: null,
            profilYourMatch: "",
            listMessages: null,
            loadingMatch: false,
            messageValue: "",
            isTyping: false,
            limitMessages: limits,
            dataProfilPersonal: [],
            typingUsers: [],
        }
        this.selector = React.createRef()
        this.valueScroll = 0
        this.onLoad = false
        this.lastUpdateTime = 0
    }

    componentWillMount() {
        const { dataUser, socket } = this.context
        socket.on("PRIVATE_MESSAGE", this.addChat)
        socket.on("LOAD_MORE_MESSAGE", this.addMessagesToChat)
        getListMatch(dataUser.userName)
            .then((list) => {
                const { activeChat, limitMessages } = this.state
                const dataProfilPersonal = []
                list.listMatch.forEach((match) => {
                    socket.emit("PRIVATE_MESSAGE", {
                        reciever: match.person,
                        sender: dataUser.userName,
                        activeChat,
                        chatId: match.chatId,
                        limitMessages,
                        loadMoreMessages: false,
                    })
                    dataProfilPersonal.push({ age: match.age, pictureProfil: match.picture, profilId: match.id })
                })
                this.setState({ dataProfilPersonal, loadingMatch: true })
            })
            .catch((error) => console.log(error))
    }

    componentWillUnmount() {
        const { socket, dataUser } = this.context
        this.stopCheckingTyping()
        socket.off("PRIVATE_MESSAGE")
        socket.off("LOAD_MORE_MESSAGE")
        getListMatch(dataUser.userName)
            .then((list) => {
                list.listMatch.forEach((match) => {
                    socket.off(`MESSAGE_RECIEVED-${match.chatId}`)
                    socket.off(`TYPING-${match.chatId}`)
                })
            })
            .catch((error) => console.log(error))
    }

    scrollToBottom = () => {
        if (this.selector.current) {
            this.selector.current.scrollTop = this.selector.current.scrollHeight
        }
    }

    sendOpenPrivateMessage = (reciever) => {
        const { socket, dataUser } = this.context
        const { activeChat, limitMessages } = this.state
        socket.emit("PRIVATE_MESSAGE", {
            reciever,
            sender: dataUser.userName,
            activeChat,
            limitMessages,
            loadMoreMessages: false,
        })
        this.setState({ profilYourMatch: reciever })
    }

    resetChat = (chat) => {
        return this.addChat(chat, true)
    }

    addMessagesToChat = (chat) => {
        const { chats } = this.state
        const index = chats.findIndex(u => u.id === chat.id)
        let newChats = chats
        newChats[index] = chat
        this.setState({ newChats, activeChat: chat }, () => {
            this.selector.current.scrollTop = this.selector.current.scrollHeight - this.valueScroll
        })
    }

    addChat = (chat, reset = false) => {
        const { socket } = this.context
        const { chats } = this.state
        const newChats  = reset ? [chat] : [...chats, chat]
        this.setState({ chats: newChats })
        socket.on(`TYPING-${chat.id}`, this.updateTypingInChat(chat.id))
        socket.on(`MESSAGE_RECIEVED-${chat.id}`, this.addMessageToChat(chat.id))
    }

    addMessageToChat = (chatId) => {
        return message => {
            const { chats } = this.state
            let newChats = chats.map((chat) => {
                if (chat.id === chatId) {
                    chat.messages.push(message)
                }
                return chat
            })
            this.setState({ chats: newChats }, () => this.scrollToBottom())
        }
    }

    updateTypingInChat = (chatId) => {
        return ({ isTyping, user }) => {
            const { dataUser } = this.context
            if (user !== dataUser.userName) {
                const { chats } = this.state
                let array = []
                let newChats = chats.map((chat) => {
                    if (chat.id === chatId) {
                        if (isTyping && !array.includes(user)) {
                            array.push(user)
                        } else if (!isTyping && array.includes(user)) {
                            array = array.filter(u => u !== user)
                        }
                    }
                    return chat
                })
                this.setState({ chats: newChats, typingUsers: array })
            }
        }
    }

    setActiveChat = (activeChat, reciever) => {
        this.setState({ activeChat, profilYourMatch: reciever, limitMessages: limits }, () => this.scrollToBottom())
    }

    sendMessage = (chatId, message) => {
        const { socket, dataUser } = this.context
        const { profilYourMatch } = this.state
        if (message.trim() !== "") {
            socket.emit("NOTIFICATIONS_SENT", {reciever: profilYourMatch, notification: `${dataUser.userName} send you a message` })
            socket.emit("MESSAGE_SENT", { chatId, message, reciever: profilYourMatch })
            this.setState({ messageValue: "" })
        }
    }

    sendTyping = (chatId, isTyping) => {
        const { socket } = this.context
        socket.emit("TYPING", { chatId, isTyping })
    }

    typingIsProgress = (e, activeChatId) => {
        if (e.keyCode !== 13) {
            this.lastUpdateTime = Date.now()
            if (!this.state.isTyping) {
                this.setState({ isTyping: true }, () => {
                    this.startCheckingTyping(activeChatId)
                    this.sendTyping(activeChatId, true)
                })
            }
        }
    }

    startCheckingTyping = (activeChatId) => {
        this.typingInterval = setInterval(() => {
            if ((Date.now() - this.lastUpdateTime) > 300) {
                this.setState({ isTyping: false }, () => this.stopCheckingTyping(activeChatId))
            }
        })
    }

    stopCheckingTyping = (activeChatId) => {
        if (this.typingInterval) {
            clearInterval(this.typingInterval)
            this.sendTyping(activeChatId, false)
        }
    }

    moreMessages = () => {
        const { activeChat, profilYourMatch } = this.state
        const { socket, dataUser } = this.context
        this.valueScroll = this.selector.current.scrollHeight
        socket.emit("LOAD_MORE_MESSAGE", {
            reciever: profilYourMatch,
            sender: dataUser.userName,
            activeChat,
            limitMessages: this.state.limitMessages + limits,
        })
        this.setState({ limitMessages: this.state.limitMessages + limits })
    }

    render() {
        const {
            messageValue, activeChat, chats, loadingMatch, dataProfilPersonal, typingUsers,
        } = this.state
        const { dataUser } = this.context
        if (dataUser === undefined) {
            return <div />
        }
        if (loadingMatch === false) {
            return <div />
        }
        return (
            <div className="main-messages-container col center">
                <div className="discussions-chat-container row">
                    <div className="discussions-container col">
                        <span className="title row">Last Messages</span>
                        { 
                            chats.map((chat, index) => {
                                if (chat.name) {
                                    const lastMessage = chat.messages[chat.messages.length - 1]
                                    const chatSideName = chat.users.find((name)=>{
                                        return name !== dataUser.userName
                                    })
                                    return (
                                        <div
                                            key={ index }
                                            className="discussion row"
                                            onClick={ () => this.setActiveChat(chat, chatSideName) }
                                        >
                                            <img src={ process.env.PUBLIC_URL + `/imageProfil/${dataProfilPersonal[index].profilId}/${dataProfilPersonal[index].pictureProfil}` } alt={ `avatar-${chatSideName}` } />
                                            <div className="col">
                                                <span className="disc-name">{ chatSideName } - { dataProfilPersonal[index].age } ans</span>
                                                { lastMessage && <span className="disc-last-message">This is the last message: { lastMessage.message }</span> }
                                                {
                                                    typingUsers.map((user, index) => (
                                                        (user === chatSideName)
                                                            ? <div key={ index }>{ `${user} is typing ...` }</div>
                                                            : null
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                                return <div key={ index } style={ { width: 100, height: 100, backgroundColor: "red" } } />
                            })
                        }
                    </div>
                    <div className="chat-container col">
                        {
                            (activeChat !== null)
                                ? (
                                    <div ref={ this.selector } className="chat-sub-container col">
                                        <span className="title row">Chat with { activeChat.name }</span>
                                        <div
                                            className="pointer"
                                            style={{ textAlign: 'center', color: '#1DA1F2', border: '1px solid #1DA1F2', borderRadius: 10, padding: 10, margin: 10 }}
                                            onMouseDown={ () => { this.onLoad = true } }
                                            onMouseUp={ () => { this.onLoad = false } }
                                            onClick={ () => this.moreMessages() }
                                        >
                                            Load more messages
                                        </div>
                                        {
                                            (activeChat.messages.length > 2) ? (
                                                activeChat.messages.map((message, index) => (
                                                    <div key={ `message-${index}` } className={ (message.fromUser === dataUser.userName) ? "chat-message sent right" : "chat-message received left" }>
                                                        <p>{ message.message }</p>
                                                        <p>{ `Sent ${message.date}` }</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <div style={{textAlign: 'center', color: 'gray', fontSize: '1.2em', padding: 20}}>
                                                    No messages here
                                                </div>
                                            )
                                        }
                                        <input
                                            className="message-input"
                                            placeholder="Start a new message"
                                            value={ messageValue }
                                            onKeyUp={ (e) => this.typingIsProgress(e, activeChat.id) }
                                            onChange={ (e) => this.setState({ messageValue: e.target.value }) }
                                        />
                                        <button onClick={ () => (activeChat !== null) ? this.sendMessage(activeChat.id, messageValue) : null }>Send</button>
                                    </div>
                                )
                                : (
                                    <div>
                                        <div style={{textAlign: 'center', color: 'gray', fontSize: '1.2em', padding: 20}}>
                                            <p style={{marginBottom: 50}}>Select a discussion on left panel</p>
                                            <Conversation width="400" height="400" />
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Messages
