import React, { Component } from "react"
import { withRouter } from "react-router-dom"

import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import ChatWithUser from "./components/ChatWithUser"
import Avatar from "@material-ui/core/Avatar"

import { getListMatch } from "utils/fileProvider"
import { UserConsumer } from "store/UserProvider"

const styles = {
    avatar: {
        width: 60,
        height: 60,
    },
}

class Messages extends Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        this.state = {
            listMatch: null,
            profilYourMatch: null,
        }
    }

    componentWillMount() {
        const { dataUser } = this.context
        getListMatch(dataUser.userName)
            .then((list) => this.setState({ listMatch: list.listMatch }))
            .catch((error) => console.log(error))
    }

    render() {
        const { listMatch, profilYourMatch } = this.state
        const { dataUser } = this.context
        if (listMatch === null) {
            return <div />
        }
        if (dataUser === undefined) {
            return <div />
        }
        return (
            <Container maxWidth="lg">
                <Grid container spacing={ 4 }>
                    <Grid item xs={ 12 } sm={ 4 }>
                        <Grid direction="row" container spacing={ 4 }>
                            {
                                listMatch.map((match) => (
                                    <Grid item key={ `match-${match.person}` } xs={ 12 } sm={ 6 }>
                                        <Avatar alt={ `avatar${match.person}` } style={ styles.avatar } src={ process.env.PUBLIC_URL + `/imageProfil/${match.id}/${match.picture}` } />
                                        <button onClick={ () => this.setState({ profilYourMatch: match.person }) }>{ match.person }</button>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Grid>
                    <Grid item xs={ 12 } sm={ 8 }>
                        {
                            (profilYourMatch !== null)
                                ? (
                                    <ChatWithUser
                                        userName={ dataUser.userName }
                                        profilMatchName={ profilYourMatch }
                                    />
                                )
                                : null
                        }
                    </Grid>
                </Grid>
            </Container>
        )
    }

}

export default withRouter(Messages)
