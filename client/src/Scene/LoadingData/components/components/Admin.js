import React, { Component } from 'react'

import { banUser, getAllProfilName } from "utils/fileProvider"

import Form from "components/Form"

import { withStyles } from "@material-ui/core/styles"
import { UserConsumer } from 'store/UserProvider'

const styles = {
    searchBarResult: {
        borderBottom: '1px solid rgba(0, 0, 0, .05)',
        transition: 'all .6s ease',
        padding: 15,
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, .05)',
            cursor: 'pointer'
        }
    }
}

class Admin extends Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        this.state = {
            searchUser: "",
            banForm: [
                { name: "banUser", value: "", placeholder: "Enter username", type: "text" },
                { name: "banTime", value: "", placeholder: "Days duration", type: "number" }
            ]
        }
    }

    componentWillMount() {
        getAllProfilName()
            .then((response) => this.setState({ arrayProfilName: response.allProfilName }))
            .catch((error) => console.log(error))
    }

    onChangeValue = (e, index) => {
        const { banForm } = this.state
        banForm[index].value = e.target.value
        this.setState({ banForm })
    }

    banUser = () => {
        const { dataUser, socket } = this.context
        const { banForm } = this.state
        const banTime = (24*60*60) * banForm[1].value
        const timestampUnban = Math.floor(Date.now() / 1000) + banTime
        if (banForm[0].value !== dataUser.userName) {
            socket.emit("BAN", { banUserName: banForm[0].value })
            banUser(banForm[0].value, timestampUnban) 
        }
    }

    render() {
        const { banForm } = this.state
        return(
            <div style={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: '5%' }}>
                <h1>Admin Panel</h1>
                <Form inputArray={ banForm } onChangeValue={ this.onChangeValue } />
                <button onClick={ () => this.banUser() }>Ban</button>
                <br />
                <div
                    style={{
                        width: '100%',
                        maxHeight: 200,
                        overflowY: 'auto',
                        boxShadow: '0px 5px 10px rgba(0, 0, 0, .1)',
                        overflowX: 'hidden'
                    }}
                >
                </div>
            </div>
        )
    }
}

export default (withStyles(styles)(Admin))
