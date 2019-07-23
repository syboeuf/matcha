import React, { Component } from "react"

import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"

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
            <Container maxWidth="md">
                {
                    listMessages.map((data) => (
                        <Grid
                            key={ `message-${data.id}` }
                            container
                            justify={ (data.fromUser === userName) ? "flex-end" : "flex-start" }
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
                        </Grid>
                    ))
                }
            </Container>
        )
    }

}

export default ReceiveMessage
