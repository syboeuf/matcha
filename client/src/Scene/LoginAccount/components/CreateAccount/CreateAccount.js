import React, { Component } from "react"
import { withRouter } from "react-router-dom"

import { addNewUser } from "utils/fileProvider"

import Form from "components/Form"
import ConfirmKey from "./components/ConfirmKey"

class CreateAccount extends Component {

    constructor(props) {
        super(props)
        this.state = {
            inputArray: [
                { name: "lastName", type: "text", value: "", placeholder: "lastName" },
                { name: "firstName", type: "text", value: "", placeholder: "firstName" },
                { name: "userName", type: "text", value: "", placeholder: "userName" },
                { name: "password", type: "password", value: "", placeholder: "password" },
                { name: "confirmPassword", type: "password", value: "", placeholder: "Confirm password" },
                { name: "email", type: "email", value: "", placeholder: "email" },
            ],
            showConfirmKey: false,
            userName: "",
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
            .then((response) => {
                if (response) {
                    this.setState({ showConfirmKey: true, userName: response.userName })
                }
            })
            .catch((error) => console.log(error))
    }

    toggleShowConfirmKey = () => {
        this.setState({ showConfirmKey: !this.state.showConfirmKey })
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

    render() {
        const { inputArray, showConfirmKey, userName } = this.state
        return (
            <div>
                <Form inputArray={ inputArray } onChangeValue={ this.onChangeValue } />
                <span> { this.doesPasswordMatch() ? null : "Password doesn't match" }</span>
                <button onClick={ () => (this.checkEmptyForm() && this.doesPasswordMatch()) ? this.checkIfUserExist() : null }>Create your account</button>
                <button onClick={ () => (this.checkEmptyForm() && this.doesPasswordMatch()) ? this.setState({ showConfirmKey: true }) : null }>Show modal</button>
                {
                    (showConfirmKey && this.checkEmptyForm() && this.doesPasswordMatch())
                        ? (
                            <ConfirmKey
                                userName={ userName }
                                closeModal={ this.toggleShowConfirmKey }
                            />
                        )
                        : null
                }
            </div>
        )
    }

}

export default withRouter(CreateAccount)
