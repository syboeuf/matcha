import React, { Component } from "react"

import { findEmail } from "utils/fileProvider"

import TextInput from "components/TextInput"
import SetNewPassword from "./components/SetNewPassword"

class LogIn extends Component {

    constructor(props) {
        super(props)
        this.state = {    
            value: "",
            setModal: false
        }
    }

    onClick = () => {
        const { value } = this.state
        findEmail(value)
            .then((response) => {
                if (response && value.trim() !== "") {
                    this.setState({ setModal: true })
                }
            })
            .catch((error) => console.error(error))
    }

    closeModal = () => {
        const { hideForgetPassword } = this.props
        this.setState({ setModal: false }, () => hideForgetPassword())
    }

    render() {
        const { value, setModal } = this.state
        return (
            <div>
                <TextInput
                    value={ value }
                    placeholder="Put your mail address here !!"
                    onChangeValue={ (e) => this.setState({ value: e.target.value }) }
                    type="text"
                />
                <button onClick={ () => this.onClick() }>Send</button>
                {
                    (setModal)
                        ? <SetNewPassword closeModal={ this.closeModal } />
                        : null
                }
            </div>
        )
    }

}

export default LogIn
