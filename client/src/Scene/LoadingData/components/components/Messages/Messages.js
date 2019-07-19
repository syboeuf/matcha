import React, { Component } from "react"
import { Container, Row, Col } from "reactstrap"

import ChatWithUser from "./components/ChatWithUser"
import { withRouter } from "react-router-dom"

import { getListMatch } from "utils/fileProvider"
import { UserConsumer } from "store/UserProvider"

class Messages extends Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        this.state = {
            listMatch: null,
            profilYourMatch: null,
        }
    }

    componentWillMount() {
        const { dataUser } = this.context
        getListMatch(dataUser.userName)
            .then((list) => this.setState({ listMatch: list.listMatch }))
            .catch((error) => console.log(error))
    }

    render() {
        const { listMatch, profilYourMatch } = this.state
        const { dataUser } = this.context
        if (listMatch === null) {
            return <div />
        }
        if (dataUser === undefined) {
            return <div />
        }
        return (
            <Container fluid style={{width: "80%"}}>
                <Row>
                    <Col md="3">
                        <div style={ { borderBottom: "1px solid gray" } } >
                            {
                                listMatch.map((match) => (
                                    <button
                                        key={ `match-${match}` }
                                        onClick={ () => this.setState({ profilYourMatch: match }) }
                                    >
                                        { match }
                                    </button>
                                ))
                            }
                        </div>
                    </Col>
                    <Col md="8">
                        {
                            (profilYourMatch !== null)
                                ? (
                                    <ChatWithUser
                                        userName={ dataUser.userName }
                                        profilMatchName={ profilYourMatch }
                                    />
                                )
                                : null
                        }
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default withRouter(Messages)
