const mysql = require("mysql")

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "input305",
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

module.exports = (socket) => {

    let sendMessageToChatFromUser
    let sendNotificationToUser
    let sendTypingFromUser

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
        sendTypingFromUser = sendTypingToChat(user.name)
        sendNotificationToUser = sendNotification(user.name)
        io.emit("USER_CONNECTED", connectedUsers)
    })

    socket.on("CHECK_IF_USER_CONNECTED", (userName) => {
        const recieverSocket = connectedUsers[userName].socketId
        connectedUsers[userName].socketId = socket.id
        socket.user = connectedUsers[userName]
        socket.to(recieverSocket).emit("USER_ALREAY_CONNECTED", true)
    })

    socket.on("disconnect", () => {
        if ("user" in socket) {
            updateLastConnection(socket.user.name)
            connectedUsers = removeUser(connectedUsers, socket.user.name)
            userNotifications = removeUser(userNotifications, socket.user.name)
            io.emit("USER_DISCONNECTED", connectedUsers)
        }
    })

    socket.on("LOGOUT", () => {
        updateLastConnection(socket.user.name)
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

    socket.on("USERNAME_UPDATED", ({ newUserName }) => {
        if (socket.user.name !== newUserName) {
            console.log(userNotifications)
            userNotifications[newUserName] = userNotifications[socket.user.name]
            delete userNotifications[socket.user.name]
            connectedUsers[newUserName] = { ...connectedUsers[socket.user.name], name: newUserName }
            delete connectedUsers[socket.user.name]
            socket.user.name = newUserName
            socket.emit("GET_NOTIFICATIONS", userNotifications[newUserName])
            sendMessageToChatFromUser = sendMessageToChat(newUserName)
            sendTypingFromUser = sendTypingToChat(newUserName)
            sendNotificationToUser = sendNotification(newUserName)
        }
    })

    socket.on("PRIVATE_MESSAGE", ({ reciever, sender, activeChat, chatId, loadMoreMessages, limitMessages }) => {
        if (activeChat === null) {
            const getAllMessages = `SELECT *, DATE_FORMAT(date, "%m-%d-%y %H:%i:%s") as date FROM (SELECT * FROM messages WHERE (fromUser='${reciever}' OR fromUser='${sender}') AND (toUser='${sender}' OR toUser='${reciever}') ORDER BY id DESC LIMIT ${limitMessages}) sub ORDER BY id ASC`
            connection.query(getAllMessages, (error, results) => {
                if (error) {
                    return error
                } else {
                    newChat = createChat({ id: chatId, messages: results, name: `${reciever}`, users: [reciever, sender] })
                    socket.emit("PRIVATE_MESSAGE", newChat)
                }
            })
        } else {
            if (loadMoreMessages === true) {
                const getMoreMessages = `SELECT *, DATE_FORMAT(date, "%m-%d-%y %H:%i:%s") as date FROM (SELECT * FROM messages WHERE (fromUser='${reciever}' OR fromUser='${sender}') AND (toUser='${sender}' OR toUser='${reciever}') ORDER BY id DESC LIMIT ${limitMessages}) sub ORDER BY id ASC`
                connection.query(getMoreMessages, (error, results) => {
                    if (error) {
                        return error
                    } else {
                        let chatWithMoreMessages = activeChat
                        chatWithMoreMessages.messages = results
                        socket.emit("PRIVATE_MESSAGE", chatWithMoreMessages)
                    }
                })
            }
            if (reciever in connectedUsers) {
                const recieverSocket = connectedUsers[reciever].socketId
                socket.to(recieverSocket).emit("PRIVATE_MESSAGE", activeChat)
            }
        }
    })

    socket.on("GET_NOTIFICATIONS", ({ reciever, activeNotifications, maxNotifications, loadMoreNotifications }) => {
        if (activeNotifications === null || loadMoreNotifications === true) {
            const getAllNotifications = `SELECT notificationType, notificationRead FROM notifications WHERE notificationUser='${reciever}' ORDER BY id DESC LIMIT ${maxNotifications}`
            connection.query(getAllNotifications, (error, results) => {
                if (error) {
                    return error
                } else {
                    const notificationArray = []
                    results.forEach((notif) => {
                        notificationArray.push({ message: notif.notificationType, read: notif.notificationRead })
                    })
                    userNotifications = { [reciever]: getNotifications({ notificationArray }) }
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
                        populareScore(reciever, valueLike)
                        if (results[1].length > 0 && results[1][0].likeUser === 1 && valueLike === 1) {
                            socket.emit("SEND_LIKE", 1)
                        } else if (valueLike === -1) {
                            socket.emit("SEND_LIKE", -1)
                        } else {
                            socket.emit("SEND_LIKE", 0)
                        }
                    }
                })
            }
        })
    })

    socket.on("TYPING", ({ chatId, isTyping }) => {    
        sendTypingFromUser(chatId, isTyping)
    })

    socket.on("NOTIFICATIONS_SENT", ({ reciever, notification }) => {
        sendNotificationToUser(reciever, notification)
    })

    socket.on("MESSAGE_SENT", ({ chatId, message, reciever }) => {
        sendMessageToChatFromUser(chatId, message, reciever)
    })

    socket.on("LOAD_MORE_MESSAGE", ({ reciever, sender, limitMessages, activeChat }) => {
        const getMoreMessages = `SELECT *, DATE_FORMAT(date, "%m-%d-%y %H:%i:%s") as date FROM (SELECT * FROM messages WHERE (fromUser='${reciever}' OR fromUser='${sender}') AND (toUser='${sender}' OR toUser='${reciever}') ORDER BY id DESC LIMIT ${limitMessages}) sub ORDER BY id ASC`
        connection.query(getMoreMessages, (error, results) => {
            if (error) {
                return error
            } else {
                let newChat = activeChat
                newChat.messages = results
                socket.emit("LOAD_MORE_MESSAGE", newChat)
            }
        })
    })

}

const sendTypingToChat = (user) => {
    return (chatId, isTyping) => {
        io.emit(`TYPING-${chatId}`, { user, isTyping })
    }
}

const sendMessageToChat = (sender) => {
    return (chatId, message, reciever) => {
        const checkuserBlock = `SELECT * FROM listblockprofil WHERE user='${reciever}' AND blockProfil='${sender}'`
        connection.query(checkuserBlock, (error, results) => {
            if (error) {
                return error
            } else {
                if (results.length === 0) {
                    const dataMessage = createMessage({ message, sender })
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
        })
    }
}

const sendNotification = (sender) => {
    return (reciever, notification) => {
        const query = `SELECT * FROM listblockprofil WHERE user='${reciever}' AND blockProfil='${sender}'`
        connection.query(query, (error, results) => {
            if (error) {
                return error
            } else {
                if (results.length === 0) {
                    io.emit(`NOTIFICATION_RECIEVED-${reciever}`, notification)
                    const sql = `INSERT INTO notifications (notificationUser, notificationType, notificationRead, date) VALUES('${reciever}', '${notification.replace(/'/g, "\\'")}', 0, NOW())`
                    connection.query(sql, (error, results) => {
                        if (error) {
                            return error
                        } else {
                            return
                        }
                    })
                } else {
                    return 
                }
            }
        })
    }
}

const removeUser = (userList, userName) => {
    let newList = Object.assign({}, userList)
    delete newList[userName]
    return newList
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
    id, name, messages, users, typingUsers: [],
})

const createMessage = ({ message = "", sender = "" } = {}) => ({
    id: uniqueId() + uniqueId() + uniqueId(), date: getDate(), message, fromUser: sender,    
})

const getNotifications = ({ notificationArray = [] } = {}) => ({
    id: uniqueId() + uniqueId() + uniqueId(), notificationArray, 
})

const updateLastConnection = (userName) => {
    const sql = `UPDATE profil set lastConnection=NOW() WHERE userName='${userName}'`
    connection.query(sql, (error, results) => {
        if (error) {
            return error
        } else {
            return
        }
    })
}

const populareScore = (profilName, like) => {
	const selectScore = `SELECT likeUser FROM likeuser WHERE profilName='${profilName}'`
	connection.query(selectScore, (error, results) => {
		if (error) {
			return
		} else {
			const valueLike = (1 / results.length) * 100
			let populareScore = 100
			results.forEach((like) => {
				if (like.likeUser === 1) {
					populareScore += valueLike
				} else {
					populareScore -= valueLike
                }
            })
            if (populareScore <= 0) {
                populareScore = 0
            }
            if (populareScore >= 100) {
                populareScore = 100
            }
			const insertPopulareScore = `UPDATE userinfos SET populareScore=${populareScore} WHERE userName='${profilName}';`
			connection.query(insertPopulareScore, (error, results) => {
				if (error) {
						return false
				} else {
						return true
				}
			})
		}
	})
}
