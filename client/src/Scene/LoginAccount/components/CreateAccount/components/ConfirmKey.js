import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { UserConsumer } from "store/UserProvider"

import Modal from "components/Modal"

import { checkKey, userIsLog } from "utils/fileProvider"

class ConfirmKey extends Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        this.state = { valueKey: "" }
    }

    confirmKey = () => {
        const { userName, history } = this.props
        const { valueKey } = this.state
        checkKey(userName, Number(valueKey))
            .then((response) => {
                if (response.dataUser !== undefined && response.dataUser.userName === userName) {
                    userIsLog(userName)
                    this.context.setNewDataUser(response.dataUser)
                    history.push("/", { dataUser: { ...response.dataUser } })
                } else if (response.results !== undefined && response.results === false) {
                    alert("Wrong key")
                }
            })
            .catch((error) => console.log(error))
    }

    render() {
        const { closeModal } = this.props
        const { valueKey } = this.state
        return (
            <Modal>
                <input
                    type="number"
                    value={ valueKey }
                    onChange={ (e) => this.setState({ valueKey: e.target.value }) }
                    placeholder="Put your key here"
                />
                <button onClick={ () => this.confirmKey() }>Confirm key !</button>
                <button onClick={ () => closeModal() }>Close confirmKey</button>
            </Modal>
        )
    }

}

export default withRouter(ConfirmKey)
