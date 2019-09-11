import React, { Component } from "react"

import Swal from "sweetalert2"

import Form from "components/Form"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import { withStyles } from "@material-ui/core/styles"

import { verifyKeyForgot, recoverPassword } from "utils/fileProvider"
import { checkPassword } from "utils/utils"

const styles = (theme) => ({
    container: {
        background: 'white',
        padding: 50,
        borderRadius: 10,
        textAlign: 'center'
    },
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    submit: {
        marginTop: '40px',
        padding: '20px',
        width: "100%",
        backgroundColor: '#c31e27',
        borderRadius: '5px',
        color: 'white',
        border: 'none',
        textAlign: 'center',
    }
  })

class Confirm extends Component {

    constructor(props) {
        super(props)
        this.state = {
			key: this.props.match.params.key,
            user: {},
            inputArray: [
                { name: "newPassword", type: "password", value: "", placeholder: "New password" },
                { name: "confirmPassword", type: "password", value: "", placeholder: "Confirm password" },
            ]
        }
        this._isMounted = true
    }

    componentWillMount() {
        this.confirmKey();
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    onChangeValue = (e, index) => {
        const { inputArray } = this.state
        inputArray[index].value = e.target.value
        this.setState({ inputArray })
    }

    setNewPassword = () => {
        const { history } = this.props
        const { key, inputArray } = this.state;
        const password = inputArray[0].value;
        const confirmPassword = inputArray[1].value;
        if (password.trim() !== "" && confirmPassword !== "" && password === confirmPassword) {
            if (checkPassword(password)) {
                recoverPassword(password, key)
                Swal.fire(
                    'Success',
                    'Your password has been updated',
                    'success'
                ).then(() => history.push('/')).catch((error) => console.log(error))
            } else {
                Swal.fire(
                    'Error',
                    'Please choose a more safe password',
                    'error'
                )
            }
        } else {
            Swal.fire(
                'Error',
                'Passwords don\'t match or empty fields',
                'error'
            )
        }
    }

    confirmKey = () => {
        const { key } = this.state;
        verifyKeyForgot(key)
            .then((res) => {
                if (res.success && this._isMounted) {
					this.setState({ confirmed: true })
                    this.setState({ user: res.user })
                }
            })
	}

    render() {
        const { confirmed, user, inputArray } = this.state;
        const { classes, history } = this.props;
        return (
            <div style={{ height: '100vh', backgroundImage: 'url(../../background.png)', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',backgroundSize: 'cover' }}>
            {
                (confirmed) ? (
                    <div style={{ paddingTop: 80 }}>
                        <Container component="main" maxWidth="xs" className={ classes.container }>
                            <div className={ classes.paper }>
                                <Typography component="h1" variant="h5">
                                    Hi <span style={{ fontWeight: 'bold' }}>{user.userName}</span>, reset your password
                                </Typography>
                                <Form inputArray={ inputArray } onChangeValue={ this.onChangeValue } />
                                <button onClick={() => this.setNewPassword()} className={ classes.submit }>Submit</button>
                            </div>
                        </Container>
                    </div>
                ) : history.push("/Login")
            }
            </div>
        )
    }

}

export default (withStyles(styles)(Confirm))
