import React, { Component } from "react"

import { findEmail } from "utils/fileProvider"

import TextInput from "components/TextInput"

class LogIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
    }

    onClick = () => {
        const { value } = this.state
        findEmail(value)
    }

    render() {
        const { value } = this.state
        return (
            <div>
                <TextInput
                    value={ value }
                    placeholder="E-mail"
                    onChangeValue={ (e) => this.setState({ value: e.target.value }) }
                    type="text"
                />
                <button className="red-btn" style={{ width: '100%', fontSize: '16px' }} onClick={ () => this.onClick() }>Send</button>
            </div>
        )
    }

}

export default LogIn
