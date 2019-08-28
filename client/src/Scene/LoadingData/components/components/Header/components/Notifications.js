import React, { Component } from "react"
import { UserConsumer } from "store/UserProvider"

import { FaRegBell } from "react-icons/fa"

const limitNotificationNumber = 20

const styles = {
    dotBlue: {
        height: 10,
        width: 10,
        marginLeft: 5,
        backgroundColor: '#4A90E2',
        borderRadius: '50%',
        display: 'inline-block'
    },
    dotGrey: {
        height: 10,
        width: 10,
        marginLeft: 5,
        backgroundColor: 'rgba(0, 0, 0, .1)',
        borderRadius: '50%',
        display: 'inline-block'
    }
}

class Notifications extends Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        this.state = {
            notificationsArray: null,
            maxNotifications: limitNotificationNumber,
            isOpen: false,
        }
        this.selector = React.createRef()
    }

    componentWillMount() {
        const { dataUser, socket } = this.context
        const { notificationsArray, maxNotifications } = this.state
        socket.on("GET_NOTIFICATIONS", this.addNotifications)
        socket.emit("GET_NOTIFICATIONS", {
            reciever: dataUser.userName,
            activeNotifications: notificationsArray,
            maxNotifications,
            loadMoreNotifications: false,
        })
    }

    componentDidMount() {
		window.addEventListener("mousedown", this.closeDropDown)
	}

    componentWillUnmount() {
        const { socket, dataUser } = this.context
        window.removeEventListener("mousedown", this.closeDropDown)
        socket.off(`NOTIFICATION_RECIEVED-${dataUser.userName}`)
        socket.off("GET_NOTIFICATIONS")
    }

    addNotifications = (notificationsArray) => {
        const { socket, dataUser } = this.context
        this.setState({ notificationsArray, activeNotifications: notificationsArray })
        socket.on(`NOTIFICATION_RECIEVED-${dataUser.userName}`, this.insertNotificationsToArray(notificationsArray.id))
    }

    insertNotificationsToArray = (notifId) => {
        return notification => {
            const { notificationsArray } = this.state
            if (notificationsArray.id === notifId) {
                notificationsArray.notificationArray = [notification, ...notificationsArray.notificationArray]
            }
            this.setState({ notificationsArray })
        }
    }

    moreNotification = () => {
        const { socket, dataUser } = this.context
        const { notificationsArray, maxNotifications } = this.state
        socket.emit("GET_NOTIFICATIONS", {
            reciever: dataUser.userName,
            activeNotifications: notificationsArray,
            maxNotifications: maxNotifications + 20,
            loadMoreNotifications: true,
        })
        this.setState({ maxNotifications: this.state.maxNotifications + limitNotificationNumber })
    }

    closeDropDown = (e) => {
		if (this.selector.current && !this.selector.current.contains(e.target)) {
			this.setState({ isOpen: false })
		}
	}

    render() {
        const { notificationsArray } = this.state
        if (notificationsArray === null) {
            return <div />
        }
        return (
            <div ref={ this.selector }>
				<span
                    onClick={ () => this.setState({ isOpen: !this.state.isOpen }) }
                    className="menu-icon"
                >
                    <div><FaRegBell /><span style={ (notificationsArray.notificationArray.length > 0) ? styles.dotBlue : styles.dotGrey }></span></div>
                </span>
				{
					(this.state.isOpen)
                        ? (
                            <div style={ { overflowY: "auto", height: "60%" } } className="menu">
                            {
                                notificationsArray.notificationArray.map((notification, index) => (
                                    <div key={ `Menu-${index}` } className="menu-item">
                                        { notification }
                                    </div>
                                ))
                            }
                                <div className="menu-item">
                                    <button onClick={ () => this.moreNotification() }>Load more notifications</button>
                                </div>
                            </div>
                        )
                        : null
				}
			</div>
        )
    }

}

export default Notifications
