import React, { Component } from "react"
import { Row, Col } from "reactstrap"

import { getAllMessages } from "utils/fileProvider"

const styles = {
    messages: {
        padding: 20,
        borderRadius: "10px",
        boxShadow: "0px 0px 4px rgba(0, 0, 0, .2)",
        wordWrap: "break-word",
        marginBottom: 20
    },
}

class ReceiveMessage extends Component {

    constructor(props) {
        super(props)
        this.state = { listMessages: null }
        this.mounted = true
    }

    componentWillMount() {
        this.showAllMessages()
    }

    componentDidMount() {
        this.timeout = setInterval(() => this.showAllMessages(), 1000)
    }

    componentWillUnmount() {
        this.mounted = false
        clearInterval(this.timeout)
    }

    showAllMessages = () => {
        const { userName, profilMatchName } = this.props
        getAllMessages(userName, profilMatchName)
            .then((listMessages) => {
                if (this.mounted === true) {
                    this.setState({ listMessages: listMessages.results })
                }
            })
            .catch((error) => console.log(error))
    }

    render() {
        const { userName } = this.props
        const { listMessages } = this.state
        if (listMessages === null) {
            return <div />
        }
        return (
            <Row>
                {
                    listMessages.map((data) => (
                        <Col
                            key={ `message-${data.id}` }
                            sm={ { size: 5, offset: (data.fromUser === userName) ? 7 : 0} }
                            md={ { size: 5, offset: (data.fromUser === userName) ? 7 : 0} }
                        >
                            <div
                                style={
                                    {
                                        ...styles.messages,
                                        marginLeft: (data.fromUser === userName) ? "auto" : null,
                                        textAlign: (data.fromUser === userName) ? "right" : "left",
                                        backgroundColor: (data.fromUser === userName) ? "#007bff" : "rgb(0, 0, 0, .05)",
                                        color: (data.fromUser === userName) ? "white" : "black",
                                    }
                                }
                            >
                                <p>{ `${data.message}` }</p>
                                <p>{ `Send ${data.date}` }</p>
                            </div>
                        </Col>
                    ))
                }
            </Row>
        )
    }

}

export default ReceiveMessage
