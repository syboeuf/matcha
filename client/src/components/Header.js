import React from "react"
import { withRouter } from "react-router-dom"
import { FaRegBell, FaRegHeart, FaRegEnvelope, FaAlignJustify } from "react-icons/fa"
import { UserConsumer } from "store/UserProvider"

import Hidden from '@material-ui/core/Hidden'
import Grid from '@material-ui/core/Grid'
import Menu from "./Menu"

import { getNotificationsNoRead, getImageProfil } from "utils/fileProvider"

import Disconnect from "./Disconnect"

const pagesArray = [
    { page: "Discover", icon: <FaRegHeart /> },
    { page: "Messages", icon: <FaRegEnvelope /> },
    { page: "Notifications", icon: <FaRegBell /> },
]

const menuProfil = ["EditProfil", "ListProfilBlock"]

class Header extends React.Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            profilePic: "",
            openDropDown: false,
            notificationsArray: [],
        }
        this.mounted = true
    }

    componentWillMount() {
        const { dataUser } = this.context
        console.log(dataUser)
        getImageProfil(dataUser.id)
            .then((response) => this.setState({ profilePic: response.imageProfil[0].picture }))
            .catch((error) => console.error(error))
    }

    componentDidMount() {
        this.timeout = setInterval(() => this.showNotifications(), 1000)
    }

    componentWillUnmount() {
        this.mounted = false
        clearInterval(this.timeout)
    }

    showNotifications = () => {
        const { dataUser } = this.context
        if (dataUser === undefined) {
            return
        }
        getNotificationsNoRead(dataUser.userName)
            .then((notificationsArray) => {
                if (this.mounted === true) {
                    this.setState({ notificationsArray: notificationsArray.notifications })
                }
            })
            .catch((error) => console.log(error))
    }

    pageComponent = (highResolution) => {
        const { history } = this.props
        const { dataUser } = this.context
        const { profilePic, notificationsArray } = this.state
        const stylesGrid = { display: "flex", float: "right"  }
        const newNotificationsArray = []
        const newMenuProfil = []
        notificationsArray.forEach((notification) => {
            newNotificationsArray.push(<p>{ notification }</p>)
        })
        menuProfil.forEach((menu) => {
            newMenuProfil.push(<p onClick={ () => { history.push(`/${menu}`) } }>{ menu }</p>)
        })
        newMenuProfil.push(<Disconnect />)
        return (
            <div style={ (highResolution === true) ? stylesGrid : null }>
                {
                    pagesArray.map((dataPage) => (
                        (dataPage.page === "Notifications")
                            ? <div style={ { display: "flex" } } key={ `page-${dataPage.page}` }>{ dataPage.icon }<Menu title={ dataPage.page } array={ notificationsArray } /></div>
                            : (
                                <div key={ `page-${dataPage.page}` } onClick={ () => { history.push(`/${dataPage.page}`) } }>
                                    { dataPage.icon } { dataPage.page }
                                </div>
                            )
                        ))
                }
                <Menu
                    title={ <img src={ process.env.PUBLIC_URL + `/imageProfil/${dataUser.id}/${profilePic}` } alt="picProfile" style={ { width: 30 } } /> }
                    array={ newMenuProfil }
                />            
            </div>
        )
    }

    render() {
        const { history } = this.props
        const { isOpen } = this.state
        const { dataUser } = this.context
        if (dataUser === undefined) {
            return <div />
        }
        return (
            <div>
                <Grid container direction="row">
                    <Grid item xs>
                        <img src={ process.env.PUBLIC_URL + "img/header.png" } onClick={ () => history.push("/") } alt="header" style={ { width: 200 } } />
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

export default withRouter(Header)