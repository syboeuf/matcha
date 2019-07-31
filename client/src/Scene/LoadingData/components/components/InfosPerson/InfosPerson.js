import React, { Component } from "react"

import Images from "./components/Images"
import ProfilBar from "./components/ProfilBar"
import DataProfil from "./components/DataProfil"
import StyledButton from "components/StyledButton"
import Interest from "./components/Interest"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"

import { withStyles } from "@material-ui/core/styles"

import { reportingFakeProfil } from "utils/fileProvider"

import { UserConsumer } from "store/UserProvider"

const styles = {
    blueBtnDisabled: {
        width: '100%',
        padding: '20px',
        backgroundColor: 'transparent',
        border: '1px solid #4A90E2',
        borderRadius: '5px',
        color: '#4A90E2',
        transition: 'background-color .2s ease-out',
        marginTop: 10,
        marginBottom: 10,
        fontSize: '1em',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    blueBtnEnabled: {
        width: '100%',
        padding: '20px',
        backgroundColor: '#4A90E2',
        border: '1px solid #4A90E2',
        borderRadius: '5px',
        color: 'white',
        transition: 'background-color .2s ease-out',
        marginTop: 10,
        marginBottom: 10,
        fontSize: '1em',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    redBtn: {
        width: '100%',
        padding: '20px',
        backgroundColor: 'transparent',
        border: '1px solid crimson',
        borderRadius: '5px',
        color: 'crimson',
        transition: 'background-color .2s ease-out',
        marginTop: 10,
        marginBottom: 10,
        fontSize: '1em',
        '&:hover': {
            transition: 'background-color .2s ease-in',
            backgroundColor: 'crimson',
            color: 'white',
            cursor: 'pointer'
        }
    }
}

class InfosPerson extends Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        this.state = {
            blocked: false,
            fake: false,
            like: false
        }
    }
    
    componentWillReceiveProps(nextProps) {
        const { dataPerson } = nextProps
        if (this.props.dataPerson !== dataPerson) {
            this.setState({ blocked: false, fake: false })
        }
    }

    onClick = () => {
        const { dataPerson, dataUser, getListUser } = this.props
        this.setState({ blocked: true }, () => getListUser(dataUser.userName, dataPerson.userName))
    }

    toggleLike = () => {
         this.setState({ like: !this.state.like })
    }

    render() {
        const { dataUser } = this.context
        if (dataUser === undefined) {
            return <div />
        }
        const { location } = this.props
        const { dataPerson } = location.state
        if (dataPerson === null) {
            return <div />
        }
        const { blocked, fake } = this.state
        const {
            id, userName, lastName, firstName, biography,
            listInterest, gender, orientation, likeUser,
            fakeUser, inline, date, age, populareScore,
        } = dataPerson
        const dataProfil = { userName, lastName, firstName }
        const dataPersonal = {
            biography, listInterest, gender, orientation, populareScore, id,
        }
        const { classes } = this.props
        return (
            <div>
                {
                    (blocked === false)
                        ? (
                            <Container maxWidth="xl">
                                <Grid container direction="row" style={{ marginTop: 100 }}>
                                    <Grid item xs={ 12 } sm={ 3 }>
                                        <DataProfil
                                            dataProfil={ dataProfil }
                                            dataPersonal={ dataPersonal }
                                            id={ id }
                                            date={ date }
                                            likeUser={ likeUser }
                                            user={ dataUser.userName }
                                            profilName={ userName }
                                        />
                                        <button className={ this.state.like ? classes.blueBtnEnabled : classes.blueBtnDisabled } onClick={ () => this.toggleLike() }>Like this user</button>
                                        <button className={ classes.redBtn } onClick={ () => this.onClick() }>Block this user</button>
                                        {
                                            (fakeUser !== undefined || fake === true)
                                                ? <p>This profil is potentially a fake Profil</p>
                                                : (<button className={ classes.redBtn } onClick={ () => this.setState({ fake: true }, () => reportingFakeProfil(userName)) }>Report as fake profile</button>)
                                        }
                                    </Grid>
                                    <Grid item xs={ 12 } sm={ 8 } style={{ marginLeft: 60, boxShadow: '0px 0px 5px rgba(0, 0, 0, .2)', borderRadius: '10px 10px 0px 0px', padding: 30, minHeight: '90vh' }}>
                                        <ProfilBar
                                            userName={ userName }
                                            age={ age }
                                            date={ date }
                                            gender={ gender }
                                            inline={ inline }
                                        />
                                        <Interest listInterest={ listInterest } />
                                        <Images id={ id } />
                                    </Grid>
                                </Grid>
                            </Container>
                        )
                        : <div>This profil is blocked</div>
                }
            </div>
        )
    }

}

export default (withStyles(styles)(InfosPerson))
