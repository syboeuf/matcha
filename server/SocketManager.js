const mysql = require("mysql")

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "matcha",
	multipleStatements: true,
})

connection.connect(err => {
	if (err) {
		return err
	}
})

const io = require("./index.js").io

const uniqueId = () => {
	return `${Date.now()}${Math.floor(Math.random() * 10000)}`
}

let connectedUsers = {}
let userNotifications = {}
let allChat = []

module.exports = (socket) => {

    console.log("connect")

    let sendMessageToChatFromUser
    let sendNotificationToUser

    // Verifiy if user is inline or not
    socket.on("VERIFY_USER", (userName, callback) => {
        if (isUser(connectedUsers, userName)) {
            callback({ isUser: true, user: userName })
        } else {
            callback({ isUser: false, user: createUser({ name: userName, socketId: socket.id }) })
        }
    })

    socket.on("USER_CONNECTED", (user) => {
        user.socketId = socket.id
        connectedUsers = addUser(connectedUsers, user)
        socket.user = user
        sendMessageToChatFromUser = sendMessageToChat(user.name)
        sendNotificationToUser = sendNotification(user.name)
        io.emit("USER_CONNECTED", connectedUsers)
        //console.log(connectedUsers, " user connected")
    })

    socket.on("CHECK_IF_USER_CONNECTED", (userName) => {
        const recieverSocket = connectedUsers[userName].socketId
        //console.log(socket.user, recieverSocket, " 1")
        //socket.user.socketId = newSocketId
        connectedUsers[userName].socketId = socket.id
        socket.user = connectedUsers[userName]
        //console.log(connectedUsers[userName], socket.user, " 2")
        socket.to(recieverSocket).emit("USER_ALREAY_CONNECTED", true)
    })

    socket.on("disconnect", () => {
        if ("user" in socket) {
            connectedUsers = removeUser(connectedUsers, socket.user.name)
            io.emit("USER_DISCONNECTED", connectedUsers)
            //console.log(connectedUsers, " disconnect")
        }
    })

    socket.on("LOGOUT", () => {
        connectedUsers = removeUser(connectedUsers, socket.user.name)
        userNotifications = removeUser(userNotifications, socket.user.name)
        io.emit("USER_DISCONNECTED", connectedUsers)
    })

    socket.on("INLINE_USER_CONNECTED", () => {
        const inlineUsers = []
        Object.entries(connectedUsers).forEach((user) => {
            inlineUsers.push(user[0])
        })
        socket.emit("INLINE_USER_CONNECTED", inlineUsers)
    })

    socket.on("PRIVATE_MESSAGE", ({ reciever, sender, activeChat, chatId }) => {
        if (activeChat === null) {
            const id = checkChatId(chatId)
            let newChat
            if (id === false) {
                const getAllMessages = `SELECT *, DATE_FORMAT(date, "%m-%d-%y %H:%i:%s") as date FROM messages WHERE (fromUser='${reciever}' OR fromUser='${sender}') AND (toUser='${sender}' OR toUser='${reciever}')`
                connection.query(getAllMessages, (error, results) => {
                    if (error) {
                        return error
                    } else {
                        newChat = createChat({ id: chatId, messages: results, name: `${reciever}&${sender}`, users: [reciever, sender] })
                        allChat.push(newChat)
                        socket.emit("PRIVATE_MESSAGE", newChat)
                    }
                })
            } else {
                newChat = allChat[id]
                socket.emit("PRIVATE_MESSAGE", newChat)
            }
        } else {
            if (reciever in connectedUsers) {
                const recieverSocket = connectedUsers[reciever].socketId
                socket.to(recieverSocket).emit("PRIVATE_MESSAGE", activeChat)
            }
        }
    })

    socket.on("GET_NOTIFICATIONS", ({ reciever, activeNotifications }) => {
        if (activeNotifications === null) {
            const getAllNotifications = `SELECT notificationType FROM notifications WHERE notificationUser='${reciever}' AND notificationRead=0 ORDER BY id DESC`
            connection.query(getAllNotifications, (error, results) => {
                if (error) {
                    return error
                } else {
                    const notificationArray = []
                    results.forEach((notif) => {
                        notificationArray.push(notif.notificationType)
                    })
                    userNotifications = { ...userNotifications, [reciever]: getNotifications({ notificationArray }) }
                    socket.emit("GET_NOTIFICATIONS", userNotifications[reciever])
                }
            })
        } else {
            if (reciever in connectedUsers) {
                const recieverSocket = connectedUsers[reciever].socketId
                socket.to(recieverSocket).emit("GET_NOTIFICATIONS", userNotifications[reciever])
            }
        }
    })

    socket.on("SEND_LIKE", ({ reciever, sender, valueLike }) => {
        const searchLikeProfil = `SELECT * FROM likeuser WHERE (userName, profilName) IN (('${sender}', '${reciever}'))`
        connection.query(searchLikeProfil, (error, results) => {
            if (error) {
                return
            } else {
                let likeProfil
                if (results.length === 0) {
                    likeProfil = `INSERT INTO likeuser (userName, profilName, likeUser) VALUES('${sender}', '${reciever}', ${valueLike});`
                } else {
                    likeProfil = `UPDATE likeuser SET likeUser=${valueLike} WHERE(userName, profilName) IN (('${sender}', '${reciever}'));`
                }
                likeProfil += `SELECT likeUser FROM likeuser WHERE (userName, profilName) IN (('${reciever}', '${sender}'))`
                connection.query(likeProfil, (error, results) => {
                    if (error) {
                        return
                    } else {
                        console.log(results[1].length, results[1][0].likeUser === 1)
                        socket.emit("SEND_LIKE", results[1][0].likeUser)
                        if (results[1].length > 0 && results[1][0].likeUser === 1) {
                            console.log("match")
                        } else {
                            console.log("like")
                        }
                    }
                })
            }
        })
    })

    socket.on("NOTIFICATIONS_SENT", ({ reciever, notification }) => {
        sendNotificationToUser(reciever, notification)
    })

    socket.on("MESSAGE_SENT", ({ chatId, message, reciever }) => {
        sendMessageToChatFromUser(chatId, message, reciever)
    })
}

const sendMessageToChat = (sender) => {
    return (chatId, message, reciever) => {
        const dataMessage = createMessage({ message, sender })
        allChat[checkChatId(chatId)].messages.push(dataMessage)
        io.emit(`MESSAGE_RECIEVED-${chatId}`, dataMessage)
        const sql = `INSERT INTO messages (fromUser, toUser, message, date) VALUES('${sender}', '${reciever}', '${message.replace(/'/g, "\\'")}', NOW());`
        connection.query(sql, (error, results) => {
            if (error) {
                return error
            } else {
                return
            }
        })
    }
}

const sendNotification = () => {
    return (reciever, notification) => {
        io.emit(`NOTIFICATION_RECIEVED-${reciever}`, notification)
        const sql = `INSERT INTO notifications (notificationUser, notificationType, notificationRead, date) VALUES('${reciever}', '${notification.replace(/'/g, "\\'")}', 0, NOW())`
        connection.query(sql, (error, results) => {
            if (error) {
                return error
            } else {
                console.log("notification send")
            }
        })
    }
}

const removeUser = (userList, userName) => {
    let newList = Object.assign({}, userList)
    delete newList[userName]
    return newList
}

const checkChatId = (chatId) => {
    for (let i = 0; i < allChat.length; i++) {
        if (allChat[i].id === chatId) {
            return i
        }
    }
    return false
}

const checkZero = (data) => {
    if (data.toString().length === 1) {
        data = "0" + data
    }
    return data
}

const getDate = () => {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth() + 1
    const hour = today.getHours()
    const year = today.getFullYear()
    const minutes = today.getMinutes()
    const seconds = today.getSeconds()
    return `${checkZero(month)}-${checkZero(day)}-${checkZero(year)} ${checkZero(hour)}:${checkZero(minutes)}:${checkZero(seconds)}`
}

const addUser = (userList, user) => {
    let newList = Object.assign({}, userList)
    newList[user.name] = user
    return newList
}

const createUser = ({ name = "", socketId = null } = {}) => ({
    id: uniqueId() + uniqueId() + uniqueId(), name, socketId,
})

const isUser = (userList, userName) => {
    return userName in userList
}

const createChat = ({ id, messages = [], name = "Chat", users = [] } = {}) => ({
    id, name, messages, users,
})

const createMessage = ({ message = "", sender = "" } = {}) => ({
    id: uniqueId() + uniqueId() + uniqueId(), date: getDate(), message, fromUser: sender,    
})

const getNotifications = ({ notificationArray = [] } = {}) => ({
    id: uniqueId() + uniqueId() + uniqueId(), notificationArray, 
})

const createNotification = ({ notification = "" } = {}) => ({
    id: uniqueId() + uniqueId() + uniqueId(), notification,
})