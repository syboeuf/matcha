import React, { Component } from "react"
import { withRouter } from "react-router-dom"

import Avatar from "@material-ui/core/Avatar"
import StyledButton from "components/StyledButton"
import CssBaseline from "@material-ui/core/CssBaseline"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"


import { addNewUser } from "utils/fileProvider"

import Form from "components/Form"
import { textAlign } from "@material-ui/system";

const styles = (theme) => ({
    "@global": {
        body: { backgroundColor: theme.palette.common.white },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
  })

class CreateAccount extends Component {

    constructor(props) {
        super(props)
        this.state = {
            inputArray: [
                { name: "lastName", type: "text", value: "", placeholder: "Lastname" },
                { name: "firstName", type: "text", value: "", placeholder: "Firstname" },
                { name: "userName", type: "text", value: "", placeholder: "Username" },
                { name: "password", type: "password", value: "", placeholder: "Password" },
                { name: "confirmPassword", type: "password", value: "", placeholder: "Confirm password" },
                { name: "email", type: "email", value: "", placeholder: "Email" },
            ],
        }
    }

    onChangeValue = (e, index) => {
        const { inputArray } = this.state
        inputArray[index].value = e.target.value
        this.setState({ inputArray })
    }

    checkIfUserExist = () => {
        const { inputArray } = this.state
        addNewUser(inputArray)
    }

    checkEmptyForm = () => {
        const { inputArray } = this.state
        let isEmpty = true
        inputArray.forEach((inputData) => {
            if (inputData.value.trim() === "") {
                isEmpty = false
            }
        })
        return isEmpty
    }

    doesPasswordMatch = () => {
        const { inputArray } = this.state
        const password = inputArray.find(x => x.name === "password").value
        const confirmPassword = inputArray.find(x => x.name === "confirmPassword").value
        return password === confirmPassword
    }

    MadeWithLove = () => (
        <Typography variant="body2" color="textSecondary" align="center">
            Built with love by the matcha team.
        </Typography>
    )

    render() {
        const { inputArray } = this.state
        return (
            <Container component="main" maxWidth="xs" style={{ background: 'white', padding: 50, borderRadius: 10 }}>
                <CssBaseline />
                <div className={ styles.paper}>
                    <Avatar className={ styles.avatar }>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Form inputArray={ inputArray } onChangeValue={ this.onChangeValue } />
                    <span> { this.doesPasswordMatch() ? null : "Password doesn't match" }</span>
                    <div
                        onClick={ () => (this.checkEmptyForm() && this.doesPasswordMatch()) ? this.checkIfUserExist() : null }
                        style={{
                            marginTop: '40px',
                            padding: '20px',
                            backgroundColor: '#c31e27',
                            borderRadius: '5px',
                            color: 'white',
                            border: 'none',
                            textAlign: 'center'
                        }}
                    >
                        Create your account
                    </div>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2" style={{ color: '#c31e27' }}>
                                Already have an account ? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </div>
                <Box mt={5}>
                    { this.MadeWithLove() }
                </Box>
            </Container>
        )
    }

}

export default withRouter((withStyles(styles)(CreateAccount)))