import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { UserConsumer } from "store/UserProvider"

import { checkLogIn, userIsLog } from "utils/fileProvider"

import Form from "components/Form"
import ForgetPassword from "./components/ForgetPassword"

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

    render() {
        const { showForgetPassword, inputArray } = this.state
        return (
            <div>
                <Form inputArray={ inputArray } onChangeValue={ this.onChangeValue } />
                <button onClick={ () => this.checkIfUserExist() } >Log</button>
                <button onClick={ () => this.setState({ showForgetPassword: !this.state.showForgetPassword }) }>Mot de passe oublié</button>
                {
                    (showForgetPassword)
                        ? <ForgetPassword hideForgetPassword={ this.hideForgetPassword } />
                        : null
                }
            </div>
        )
    }

}

export default withRouter(LogIn)