import React from "react"
import { withRouter } from "react-router-dom"
import { FaRegHeart, FaRegEnvelope, FaAlignJustify } from "react-icons/fa"
import { UserConsumer } from "store/UserProvider"

import { withStyles } from "@material-ui/core/styles"
import Hidden from '@material-ui/core/Hidden'
import Grid from '@material-ui/core/Grid'

import Notifications from "./components/Notifications"
import Menu from "./components/Menu"

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
}

const menuProfil = ["EditProfil", "ListProfilBlock"]

const limitNotificationNumber = 20

class Header extends React.Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        this.state = { isOpen: false }
    }

    pageComponent = (highResolution) => {
        const { history, classes } = this.props
        const stylesGrid = { display: "flex", float: "right", alignItems: "center" }
        return (
            <div style={ (highResolution === true) ? { ...stylesGrid, ...styles.headerLinks } : null }>
                <span onClick={ () => history.push("/Discover") } className={ classes.headerLink }><FaRegHeart />Discover</span>
                <span onClick={ () => history.push("/Messages") } className={ classes.headerLink }><FaRegEnvelope />Messages</span>
                <span className={ classes.headerLink }><Notifications /></span>
                <span className={ classes.headerLink }><Menu /></span>
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
            <div style={{marginBottom: 20}}>
                <Grid container direction="row" style={ styles.header }>
                    <Grid item xs>
                        <img src={ process.env.PUBLIC_URL + "img/header.png" } onClick={ () => history.push("/") } className={ classes.logo } alt="header" style={{ width: 200 }} />
                    </Grid>
                    <Hidden only={ ["xs", "sm"] }>
                        <Grid item xs>
                            { this.pageComponent(true) }
                        </Grid>
                    </Hidden>
                    <button className="dropdown-lowres-button" onClick={() => this.toggleDropdownLowRes()}>Menu</button>
                </Grid>
                <div className="dropdown-lowres">
                    <div className="dropdown-lowres-item" onClick={ (e) => { history.push(`/`); this.toggleDropdownItem(e) }}>Home</div>
                    <div className="dropdown-lowres-item" onClick={ (e) => { history.push(`/discover`); this.toggleDropdownItem(e) }}>Discover</div>
                    <div className="dropdown-lowres-item" onClick={ (e) => { history.push(`/messages`); this.toggleDropdownItem(e) }}>Messages</div>
                    <div className="dropdown-lowres-item">Notifications</div>
                    <div className="dropdown-lowres-item" onClick={ (e) => { history.push(`/editprofil`); this.toggleDropdownItem(e) }}>Edit profile</div>
                    <div className="dropdown-lowres-item" onClick={ (e) => { history.push(`/listprofilblock`); this.toggleDropdownItem(e) }}>Blocked profiles</div>
                    <div className="dropdown-lowres-item" onClick={ (e) => { history.push(`/loginaccount`); this.toggleDropdownItem(e) }}>Disconnect</div>
                </div>
            </div>
        )
    }
    
}

export default withRouter((withStyles(styles)(Header)))
