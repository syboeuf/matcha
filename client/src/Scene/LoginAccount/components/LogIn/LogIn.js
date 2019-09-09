import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { UserConsumer } from "store/UserProvider"

import Avatar from "@material-ui/core/Avatar"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"

import Swal from "sweetalert2"

import { checkLogIn } from "utils/fileProvider"

import Form from "components/Form"
import ForgotPassword from "./components/ForgotPassword"

const styles = (theme) => ({
    "@global": {
        body: { backgroundColor: theme.palette.common.white },
    },
    container: {
        background: 'white',
        padding: 50,
        borderRadius: 10,
        marginTop: 50
    },
    buttonLogIn: {
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#c31e27',
        borderRadius: '5px',
        color: 'white',
        border: 'none',
        textAlign: 'center',
    },
    span: { color: '#c31e27' },
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#c31e27",
    },
})

class LogIn extends Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        this.state = {
            inputArray: [
                { name: "userName", type: "text", value: "", placeholder: "Username" },
                { name: "password", type: "password", value: "", placeholder: "Password" },
            ],
            showForgotPassword: false,
        }
    }

    onChangeValue = (e, index) => {
        const { inputArray } = this.state
        inputArray[index].value = e.target.value
        this.setState({ inputArray })
    }

    checkIfUserExist = () => {
        const { history } = this.props
        const { setNewDataUser } = this.context
        const { inputArray } = this.state
        checkLogIn(inputArray)
            .then((response) => {
                if (response !== undefined) {
                    setNewDataUser(response)
                    history.push("/", { dataUser: { ...response } })
                } else {
                    Swal.fire(
                        'Error',
                        'Invalid password or username',
                        'error'
                    )
                }
            })
            .catch((error) => console.log(error))
    }

    hideForgotPassword = () => {
        this.setState({ showForgotPassword: false })
    }

    MadeWithLove = () => (
        <Typography variant="body2" color="textSecondary" align="center">
            Built with love by the matcha team.
        </Typography>
    )

    render() {
        const { showCreateAccount, classes } = this.props
        const { showForgotPassword, inputArray } = this.state
        return (
            <Container component="main" maxWidth="xs" className={ classes.container }>
                <div className={ classes.paper }>
                    <Avatar className={ classes.avatar }>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <div>
                        <Form inputArray={ inputArray } onChangeValue={ this.onChangeValue } />
                        <div
                            onClick={ () => this.checkIfUserExist() }
                            className={ classes.buttonLogIn }
                        >
                            Login
                        </div>
                        {
                            (showForgotPassword)
                                ? <ForgotPassword hideForgotPassword={ this.hideForgotPassword } />
                                : null
                        }
                    </div>
                    <Grid container>
                        <Grid item xs>
                            <span style={{ color: '#c31e27' }} onClick={ () => this.setState({ showForgotPassword: !this.state.showForgotPassword }) }>
                                Forgot password ?
                            </span>
                        </Grid>
                        <Grid item>
                            <span onClick={ () => showCreateAccount() } className={ classes.span }>
                                Don't have an account ? Sign up
                            </span>
                        </Grid>
                    </Grid>
                </div>
                <Box mt={ 5 }>
                    { this.MadeWithLove() }
                </Box>
            </Container>
        )
    }

}

export default withRouter((withStyles(styles)(LogIn)))
