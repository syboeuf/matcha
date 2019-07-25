import React, { Component } from "react"
import { withRouter, Link } from "react-router-dom"
import { UserConsumer } from "store/UserProvider"

import Avatar from "@material-ui/core/Avatar"
import StyledButton from "components/StyledButton"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"

import { checkLogIn, userIsLog } from "utils/fileProvider"

import Form from "components/Form"
import ForgetPassword from "./components/ForgetPassword"

const styles = (theme) => ({
    "@global": {
        body: { backgroundColor: theme.palette.common.white },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
})

class LogIn extends Component {

    static contextType = UserConsumer

   constructor(props) {
        super(props)
        this.state = {
            inputArray: [
                { name: "userName", type: "text", value: "", placeholder: "userName" },
                { name: "password", type: "password", value: "", placeholder: "password" },
            ],
            showForgetPassword: false,
        }
    }

    onChangeValue = (e, index) => {
        const { inputArray } = this.state
        inputArray[index].value = e.target.value
        this.setState({ inputArray })
    }

    checkIfUserExist = () => {
        const { history } = this.props
        const { inputArray } = this.state
        checkLogIn(inputArray)
            .then((response) => {
                if (response !== undefined) {
                    userIsLog(response.userName)
                    this.context.setNewDataUser(response)
                    history.push("/", { dataUser: { ...response } })
                } else {
                    alert("Wrong userName or password or the user is already log !!!")
                }
            })
            .catch((error) => console.log(error))
    }

    hideForgetPassword = () => {
        this.setState({ showForgetPassword: false })
    }

    MadeWithLove = () => (
        <Typography variant="body2" color="textSecondary" align="center">
            Built with love by the matcha team.
        </Typography>
    )

    render() {
        const { showForgetPassword, inputArray } = this.state
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={ styles.paper }>
                    <Avatar className={ styles.avatar }>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <div>
                        <Form inputArray={ inputArray } onChangeValue={ this.onChangeValue } />
                        <StyledButton
                            color="primary"
                            text="Log"
                            functionOnClick={ () => this.checkIfUserExist() }
                        />
                        <StyledButton
                            color="primary"
                            text="Forget password"
                            functionOnClick={ () => this.setState({ showForgetPassword: !this.state.showForgetPassword }) }
                        />
                        {
                            (showForgetPassword)
                                ? <ForgetPassword hideForgetPassword={ this.hideForgetPassword } />
                                : null
                        }
                    </div>
                    <Grid container>
                        <Grid item xs>
                            { /* Link or Button ? */ }
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            { /* Link or button with onclick history.push */ }
                            <Link href="#" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
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