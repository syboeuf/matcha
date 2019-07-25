import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { UserConsumer } from "store/UserProvider"

import Form from "components/Form"
import StyledButton from "components/StyledButton"

import { checkKey, userIsLog } from "utils/fileProvider"

class ConfirmKey extends Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        this.state = {
            inputArray: [
                { name: "userName", type: "type", value: "", placeholder: "Username" },
                { name: "key", type: "text", value: "", placeholder: "Key" },
            ],
        }
    }

    onChangeValue = (e, index) => {
        const { inputArray } = this.state
        inputArray[index].value = e.target.value
        this.setState({ inputArray })
    }

    confirmKey = () => {
        const { history } = this.props
        const { inputArray } = this.state
        const userName = inputArray.find(x => x.name === "userName").value
        const valueKey = inputArray.find(x => x.name === "key").value
        checkKey(userName, Number(valueKey))
            .then((response) => {
                if (response.dataUser !== undefined && response.dataUser.userName === userName) {
                    userIsLog(userName)
                    this.context.setNewDataUser(response.dataUser)
                    history.push("/", { dataUser: { ...response.dataUser } })
                } else if (response.results === false) {
                    alert("Wrong key")
                }
            })
            .catch((error) => console.log(error))
    }

    render() {
        const { inputArray } = this.state
        return (
            <div>
                <Form inputArray={ inputArray } onChangeValue={ this.onChangeValue } />
                <StyledButton
                    color="primary"
                    text="Confirm key"
                    functionOnClick={ () => this.confirmKey() }
                />
            </div>
        )
    }

}

export default withRouter(ConfirmKey)