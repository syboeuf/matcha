import React, { Component } from "react"
import { withRouter } from "react-router-dom"

import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import ChatWithUser from "./components/ChatWithUser"
import Avatar from "@material-ui/core/Avatar"
import { withStyles } from "@material-ui/core/styles"

import { getListMatch } from "utils/fileProvider"
import { UserConsumer } from "store/UserProvider"

const styles = {
    avatar: {
        width: 60,
        height: 60,
    },
    match: {
        padding: 20,
        transition: 'all .6s ease',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, .05)',
            cursor: 'pointer'
        }
    }
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
        const { classes } = this.props
        if (listMatch === null) {
            return <div />
        }
        if (dataUser === undefined) {
            return <div />
        }
        return (
            <Container maxWidth="xl">
                <Grid container style={{ marginTop: 20 }}>
                    <Grid item xs={ 12 } sm={ 4 }>
                        <Grid direction="column" container style={{ boxShadow: '0px 5px 10px rgba(0, 0, 0, .1)' }}>
                            {
                                listMatch.map((match) => (
                                    <Grid item key={ `match-${match.person}` } xs={ 12 } sm={ 6 } className={ classes.match } onClick={ () => this.setState({ profilYourMatch: match.person }) }>
                                        <Avatar alt={ `avatar${match.person}` } style={ styles.avatar } src={ process.env.PUBLIC_URL + `/imageProfil/${match.id}/${match.picture}` } />
                                        { match.person }
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

export default withRouter(withStyles(styles)(Messages))
