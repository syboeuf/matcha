import React, { Component } from "react"

import Images from "./components/Images"
import ProfilBar from "./components/ProfilBar"
import DataProfil from "./components/DataProfil"
import StyledButton from "components/StyledButton"
import Interest from "./components/Interest"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"

import { reportingFakeProfil } from "utils/fileProvider"

import { UserConsumer } from "store/UserProvider"

class InfosPerson extends Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        this.state = {
            blocked: false,
            fake: false,
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
            biography, listInterest, gender, orientation, populareScore,
        }
        return (
            <div>
                {
                    (blocked === false)
                        ? (
                            <Container maxWidth="lg">
                                <Grid container direction="row" spacing={ 4 }>
                                    <Grid item xs={ 12 } sm={ 4 }>
                                        <DataProfil
                                            dataProfil={ dataProfil }
                                            dataPersonal={ dataPersonal }
                                            id={ id }
                                            date={ date }
                                            likeUser={ likeUser }
                                            user={ dataUser.userName }
                                            profilName={ userName }
                                        />
                                        <StyledButton
                                            text="Block this profil"
                                            color="primary"
                                            functionOnClick={ () => this.onClick() }
                                        />
                                        {
                                            (fakeUser !== undefined || fake === true)
                                                ? <p>This profil is potentially a fake Profil</p>
                                                : (
                                                    <StyledButton
                                                        text="Report this user like a fake profil"
                                                        color="primary"
                                                        functionOnClick={ () => this.setState({ fake: true }, () => reportingFakeProfil(userName)) }
                                                    />
                                                )
                                        }
                                    </Grid>
                                    <Grid item xs={ 12 } sm={ 8 }>
                                        <ProfilBar
                                            userName={ userName }
                                            age={ age }
                                            date={ date }
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

export default InfosPerson