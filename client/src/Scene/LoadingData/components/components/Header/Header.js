import React from "react"
import { withRouter } from "react-router-dom"
import { FaRegHeart, FaRegEnvelope } from "react-icons/fa"
import { UserConsumer } from "store/UserProvider"
import { ReactComponent as MenuIcon } from '../../../../../menu.svg'

import Grid from '@material-ui/core/Grid'

import Notifications from "./components/Notifications"
import Menu from "./components/Menu"

class Header extends React.Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        this.state = { width: window.innerWidth }
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimension)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimension)
    }

    updateDimension = () => {
        this.setState({ width: window.innerWidth })
    }

    toggleDropdownLowRes = () => {
        const dropdownLowRes = document.getElementsByClassName('dropdown-lowres')[0];
        if (dropdownLowRes) {
            if (dropdownLowRes.style.display === 'block')
                dropdownLowRes.style.display = 'none';
            else
                dropdownLowRes.style.display = 'block';
        }
    }
    toggleDropdownItem = (e) => {
        const active = document.getElementsByClassName('dropdown-lowres-item-active')[0];
        if (active)
            active.classList.remove('dropdown-lowres-item-active');
        e.target.classList.add('dropdown-lowres-item-active');
    }

    render() {
        const { history } = this.props
        const { dataUser } = this.context
        if (dataUser === undefined) {
            return <div />
        }
        const { width } = this.state
        return (
            <div>
                <Grid container direction="row" className="header">
                    <Grid item xs>
                        <div style={{ height: 103 }}><img src={ window.location.origin + "/img/header.png" } onClick={ () => history.push("/") } className="logo" alt="Logo" style={{ width: 200 }} /></div>
                    </Grid>
                    <div className="header-navigation">
                        <div style={ { display: "flex", float: "right", alignItems: "center", fontSize: "1.3em" } }>
                            <span onClick={ () => history.push("/Discover") } className="header-link"><span style={{ verticalAlign: 'middle', marginRight: 5 }}><FaRegHeart /></span>Discover</span>
                            <span onClick={ () => history.push("/Messages") } className="header-link"><span style={{ verticalAlign: 'middle', marginRight: 5 }}><FaRegEnvelope /></span>Messages</span>
                            { (width > 767) ? <span className="header-link"><Notifications /></span> : null }
                            <span style={{ marginRight: 20, height: 70 }}><Menu /></span>
                        </div>
                    </div>
                    <div style={{alignItems: 'center'}} className="dropdown-lowres-wrapper row">
                        { (width < 768) ? <Notifications /> : null }
                        <div onClick={() => this.toggleDropdownLowRes()} className="pointer" style={{ marginRight: 50, marginLeft: 50 }}>
                            <MenuIcon width="35" height="35" fill="#000" />
                        </div>
                    </div>
                </Grid>
                <div className="dropdown-lowres">
                    <div className="dropdown-lowres-item" onClick={ (e) => { history.push(`/`); this.toggleDropdownItem(e) }}>Home</div>
                    <div className="dropdown-lowres-item" onClick={ (e) => { history.push(`/discover`); this.toggleDropdownItem(e) }}>Discover</div>
                    <div className="dropdown-lowres-item" onClick={ (e) => { history.push(`/messages`); this.toggleDropdownItem(e) }}>Messages</div>
                    <div className="dropdown-lowres-item" onClick={ (e) => { history.push(`/editprofil`); this.toggleDropdownItem(e) }}>Edit profile</div>
                    <div className="dropdown-lowres-item" onClick={ (e) => { history.push(`/listprofilblock`); this.toggleDropdownItem(e) }}>Blocked profiles</div>
                    <div className="dropdown-lowres-item" onClick={ (e) => { history.push(`/loginaccount`); this.toggleDropdownItem(e) }}>Disconnect</div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)
