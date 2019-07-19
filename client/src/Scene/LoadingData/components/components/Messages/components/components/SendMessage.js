import React, { Component } from "react"
import { Input, Button } from "reactstrap"

import { sendMessage } from "utils/fileProvider"

import { FaRegPaperPlane } from "react-icons/fa"

const styles = {
    container: {
        display: "flex",
    },
}

class SendMessage extends Component {

    constructor(props) {
        super(props)
        this.state = { messageValue: "" }
    }

    render() {
        const { userName, profilMatchName } = this.props
        const { messageValue } = this.state
        return (
            <div style={ styles.container }>
                <Input
                    type="text"
                    value={ messageValue }
                    onChange={ (e) => this.setState({ messageValue: e.target.value }) }
                    placeholder="Put your message here"
                />
                <Button color="primary" onClick={ () => sendMessage(userName, profilMatchName, messageValue) }><FaRegPaperPlane /></Button>
            </div>
        )
    }

}

export default SendMessage
