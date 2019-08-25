import React from "react"
import { withRouter } from "react-router-dom"
import {
    FaRegBell, FaRegHeart, FaRegEnvelope, FaAlignJustify,
} from "react-icons/fa"
import { UserConsumer } from "store/UserProvider"

import { withStyles } from "@material-ui/core/styles"
import Hidden from '@material-ui/core/Hidden'
import Grid from '@material-ui/core/Grid'
import Menu from "./Menu"

import Disconnect from "./Disconnect"

import DropdownMenu from "components/DropdownMenu"

const styles = {
    header: {
        borderBottom: '1px solid rgba(0, 0, 0, .1)',
        padding: '25px'
    },
    logo: {
        '&:hover': {
            cursor: 'pointer'
        }
    },
    headerLinks: {
        fontSize: '1.3em'
    },
    headerLink: {
        marginRight: '1em',
        '&:hover': {
            color: '#c31e27',
            cursor: 'pointer'
        }
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: '50%',
        border: '3px solid rgba(0, 0, 0, .1)',
        '&:hover': {
            cursor: 'pointer'
        }
    },
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

const pagesArray = [
    { page: "Discover", icon: <FaRegHeart /> },
    { page: "Messages", icon: <FaRegEnvelope /> },
    { page: "Notifications", icon: <div><FaRegBell /><span style={ styles.dotGrey }></span></div>, iconUnread: <div><FaRegBell /><span style={ styles.dotBlue }></span></div> },
]

const menuProfil = ["EditProfil", "ListProfilBlock"]

const limitNotificationNumber = 20

class Header extends React.Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            openDropDown: false,
            notificationsArray: null,
            maxNotification: limitNotificationNumber,
            openMenu: false
        }
    }

    componentWillMount() {
        const { dataUser, socket } = this.context
        const { notificationsArray } = this.state
        socket.on("GET_NOTIFICATIONS", this.addNotifications)
        socket.emit("GET_NOTIFICATIONS", { reciever: dataUser.userName, activeNotifications: notificationsArray })
    }

    componentWillUnmount() {
        const { socket, dataUser } = this.context
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

    logout = () => {
        const { socket } = this.context
        socket.emit("LOGOUT")
    }

    moreNotification = () => {
        this.setState({ maxNotification: this.state.maxNotification + limitNotificationNumber })
    }

    pageComponent = (highResolution) => {
        const { history, classes } = this.props
        const { dataUser } = this.context
        const { notificationsArray } = this.state
        const stylesGrid = { display: "flex", float: "right", alignItems: "center" }
        const newNotificationsArray = []
        const newMenuProfil = []
        if (notificationsArray === null) {
            return <div />
        }
        notificationsArray.notificationArray.forEach((notification) => {
            newNotificationsArray.push(<p>{ notification }</p>)
        })
        if (dataUser.admin === 1) {
            newMenuProfil.push(<p onClick={ () => { history.push("/Admin") } }>Admin</p>)
        }
        menuProfil.forEach((menu) => {
            newMenuProfil.push(<p onClick={ () => { history.push(`/${menu}`) } }>{ menu }</p>)
        })
        newMenuProfil.push(<Disconnect logout={ this.logout } />)
        return (
            <div style={ (highResolution === true) ? { ...stylesGrid, ...styles.headerLinks } : null }>
                {
                    pagesArray.map((dataPage) => (
                        (dataPage.page === "Notifications")
                            ? <div style={ { display: 'flex' } } className={ classes.headerLink } key={ `page-${dataPage.page}` }><Menu title={ newNotificationsArray.length > 0 ? dataPage.iconUnread : dataPage.icon } array={ newNotificationsArray } /></div>
                            : (
                                <div className={ classes.headerLink } key={ `page-${dataPage.page}` } onClick={ () => { history.push(`/${dataPage.page}`) } }>
                                    { dataPage.icon } { dataPage.page }
                                </div>
                            )
                        ))
                }
                <DropdownMenu items={ [{ title: 'Edit profile', link: '42.fr' }, { title: 'Block list', link: '42.fr' }, { title: 'Logout', link: '42.fr' }] } />
                <Menu
                    title={
                        <img
                            src={
                                (dataUser.pictures.length === 0)
                                ? process.env.PUBLIC_URL + "noImage.png"
                                : process.env.PUBLIC_URL + `/imageProfil/${dataUser.pictures[0].userId}/${dataUser.pictures[0].picture}`
                            }
                            alt="picProfile"
                            className={ classes.profilePic }
                        />
                    }
                    array={ newMenuProfil }
                />
                <button onClick={ () => this.moreNotification() }>Test notification</button>
            </div>
        )
    }

    render() {
        const { history, classes } = this.props
        const { isOpen } = this.state
        const { dataUser } = this.context
        if (dataUser === undefined) {
            return <div />
        }
        return (
            <div>
                <Grid container direction="row" style={ styles.header }>
                    <Grid item xs>
                        <img src={ process.env.PUBLIC_URL + "img/header.png" } onClick={ () => history.push("/") } className={ classes.logo } alt="header" style={{ width: 200 }} />
                    </Grid>
                    <Hidden only={ ["xs", "sm"] }>
                        <Grid item xs>
                            { this.pageComponent(true) }
                        </Grid>
                    </Hidden>
                </Grid>
                <Hidden only={ ["md", "lg", "xl"] }>
                    <Grid container direction="column">
                        <FaAlignJustify onClick={ () => this.setState({ isOpen: !this.state.isOpen }) } />
                        {
                            (isOpen)
                                ? this.pageComponent(false)
                                : null
                        }
                    </Grid>
                </Hidden>
            </div>
        )
    }
    
}

export default withRouter((withStyles(styles)(Header)))
