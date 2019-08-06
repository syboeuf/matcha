import React, { Component } from "react"

import { sendMessage } from "utils/fileProvider"

import { FaRegPaperPlane } from "react-icons/fa"

const styles = {
    container: { display: "flex" },
    inputBar: {
        padding: 20,
        boxShadow: '0px 5px 10px rgba(0, 0, 0, .1)',
        border: 0,
        width: '100%'
    },
    sendButton: {
        backgroundColor: 'rgb(0, 123, 255)',
        border: 0,
        color: 'white',
        padding: 30
    }
}

class SendMessage extends Component {

    constructor(props) {
        super(props)
        this.state = { messageValue: "" }
    }

    send = (userName, profilMatchName, messageValue) => {
        if (messageValue.trim() !== '')
            sendMessage(userName, profilMatchName, messageValue)
    }

    render() {
        const { userName, profilMatchName } = this.props
        const { messageValue } = this.state
        return (
            <div style={ styles.container }>
                <input
                    type="text"
                    value={ messageValue }
                    onChange={ (e) => this.setState({ messageValue: e.target.value }) }
                    placeholder="Put your message here"
                    style={ styles.inputBar }
                />
                <button style={ styles.sendButton } onClick={ () => this.send(userName, profilMatchName, messageValue) }><FaRegPaperPlane /></button>
            </div>
        )
    }

}

export default SendMessage
