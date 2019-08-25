import React, { Component } from "react"

import { getListMatch } from "utils/fileProvider"
import { UserConsumer } from "store/UserProvider"

import './Messages.css'

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
            dataProfilPersonal: [],
        }
    }

    componentWillMount() {
        const { dataUser, socket } = this.context
        socket.on("PRIVATE_MESSAGE", this.addChat)
        getListMatch(dataUser.userName)
            .then((list) => {
                const { activeChat } = this.state
                const dataProfilPersonal = []
                list.listMatch.forEach((match) => {
                    socket.emit("PRIVATE_MESSAGE", {
                        reciever: match.person,
                        sender: dataUser.userName,
                        activeChat,
                        chatId: match.chatId,
                    })
                    dataProfilPersonal.push({ age: match.age, pictureProfil: match.picture, profilId: match.id })
                })
                this.setState({ dataProfilPersonal, loadingMatch: true })
            })
            .catch((error) => console.log(error))
    }

    componentWillUnmount() {
        const { socket } = this.context
        socket.off("PRIVATE_MESSAGE")
    }

    sendOpenPrivateMessage = (reciever) => {
        const { socket, dataUser } = this.context
        const { activeChat } = this.state
        socket.emit("PRIVATE_MESSAGE", { reciever, sender: dataUser.userName, activeChat })
        this.setState({ profilYourMatch: reciever })
    }

    resetChat = (chat) => {
        return this.addChat(chat, true)
    }

    addChat = (chat, reset = false) => {
        const { socket } = this.context
        const { chats } = this.state
        const newChats  = reset ? [chat] : [...chats, chat]
        this.setState({ chats: newChats })
        //const typingEvent = `TYPING-${chat.id}`
        //socket.on(typingEvent, this.updateTypingInChat(chat.id))
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
            this.setState({ chats: newChats })
        }
    }

    updateTypingInChat = (chatId) => {
        return ({ isTyping, user }) => {
            if (user!==this.props.user.name) {
                const { chats } = this.state
                let newChats = chats.map((chat) => {
                    if (chat.id === chatId) {
                        if (isTyping && !chat.typingUsers.includes(user)) {
                            chat.typingUsers.push(user)
                        } else if (!isTyping && chat.typingUsers.includes(user)) {
                            chat.typingUsers = chat.typingUsers.filter(u => u !== user)
                        }
                    }
                    return chat
                })
                this.setState({ chats: newChats })
            }
        }
    }

    setActiveChat = (activeChat, reciever) => {
        this.setState({ activeChat, profilYourMatch: reciever })
    }

    sendMessage = (chatId, message) => {
        const { socket, dataUser } = this.context
        const { profilYourMatch } = this.state
        if (message.trim() !== "") {
            socket.emit("NOTIFICATIONS_SENT", { reciever: profilYourMatch, notification: `${dataUser.userName} send you a message` })
            socket.emit("MESSAGE_SENT", { chatId, message, reciever: profilYourMatch })
            this.setState({ messageValue: "" })
        }
    }

    sendTyping = (chatId, isTyping) => {
        const { socket } = this.context
        socket.emit("TYPING", { chatId, isTyping })
    }

    render() {
        const {
            messageValue, activeChat, chats, loadingMatch, dataProfilPersonal,
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
                                            </div>
                                        </div>
                                    )
                                }
                                return <div style={ { width: 100, height: 100, backgroundColor: "red" } } />
                            })
                        }
                    </div>
                    <div className="chat-container col">
                        {
                            (activeChat !== null)
                                ? (
                                    <div className="chat-sub-container col">
                                        <span className="title row">Chat { activeChat.name }</span>
                                        {
                                            activeChat.messages.map((message, index) => (
                                                <div key={ `message-${index}` } className={ (message.fromUser === dataUser.userName) ? "chat-message sent right" : "chat-message received left" }>
                                                    <p>{ message.message }</p>
                                                    <p>{ `Sent ${message.date}` }</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                                : null
                        }
                        <input
                            className="message-input"
                            placeholder="Start a new message"
                            value={ messageValue }
                            onChange={ (e) => this.setState({ messageValue: e.target.value }) }
                        />
                        <button onClick={ () => (activeChat !== null) ? this.sendMessage(activeChat.id, messageValue) : null }>Send</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Messages