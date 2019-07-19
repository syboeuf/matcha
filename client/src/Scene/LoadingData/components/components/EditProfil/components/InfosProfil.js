import React, { Component } from "react"
// import PropTypes from "prop-types"

import { updateInfosProfil } from "utils/fileProvider"

import Form from "components/Form"

class InfosProfil extends Component {

    constructor(props) {
        super(props)
        const {
            lastName, firstName, userName, email,
        } = props.infosUser
        this.state = {
            inputArray: [
                { name: "lastName", type: "text", value: lastName, placeholder: "lastName" },
                { name: "firstName", type: "text", value: firstName, placeholder: "firstName" },
                { name: "userName", type: "text", value: userName, placeholder: "userName" },
                { name: "newPassword", type: "password", value: "", placeholder: "New password" },
                { name: "email", type: "email", value: email, placeholder: "email" },
            ],
        }
    }
    
    onClick = (id, userName, inputArray) => {
        const { updateDataUser } = this.props
        let newDataUser = {}
        inputArray.forEach((data) => {
            newDataUser = {
                ...newDataUser,
                [data.name]: data.value,
            }
        })
        updateInfosProfil(id, userName, inputArray)
            .then((response) => {
                if (response === 1) {
                    updateDataUser(newDataUser)
                } else {
                    alert("This username or email are already use !")
                }
            })
            .catch((error) => console.log(error))
    }

    onChangeValue = (e, index) => {
        const { inputArray } = this.state
        inputArray[index].value = e.target.value
        this.setState({ inputArray })
    }

    render() {
        const { id, userName } = this.props.infosUser
        const { inputArray } = this.state
        return (
            <div>
                <Form inputArray={ inputArray } onChangeValue={ this.onChangeValue } />
                <button onClick={ () => this.onClick(id, userName, inputArray) }>Save</button>
            </div>
        )
    }

}

InfosProfil.protoType = {}

export default InfosProfil