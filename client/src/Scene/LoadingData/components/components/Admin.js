import React, { Component } from 'react'

import { banUser, getAllProfilName } from "utils/fileProvider"

import Form from "components/Form"

import { withStyles } from "@material-ui/core/styles"

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

    constructor(props) {
        super(props)
        this.state = {
            searchUser: "",
            arrayProfilName: [],
            matchProfilName: [],
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

    onSearchUserChange = (e) => {
        let { searchUser, arrayProfilName, matchProfilName } = this.state
        searchUser = e.target.value
        if (searchUser.trim() !== '')
            matchProfilName = arrayProfilName.filter(name => name.userName.toLowerCase().startsWith(searchUser.toLowerCase()))
        else
            matchProfilName = []
        this.setState({ searchUser, matchProfilName })
    }

    banUser = () => {
        const { banForm } = this.state
        const banTime = (24*60*60) * banForm[1].value
        const timestampUnban = Math.floor(Date.now() / 1000) + banTime

        banUser(banForm[0].value, timestampUnban) 

        console.log(`${banForm[0].value} has been banned for ${banForm[1].value} days (${banTime} seconds)`)
        console.log(`He will be unban after timestamp: ${timestampUnban} / Current timestamp ${Math.floor(Date.now() / 1000)}`)
    }

    findUser = () => {
        const { searchUser } = this.state
        console.log(`Display ${searchUser} informations`)
    }

    render() {
        const { classes } = this.props
        const { banForm, searchUser, matchProfilName } = this.state
        return(
            <div style={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: '5%' }}>
                <h1>Admin Panel</h1>
                <Form inputArray={ banForm } onChangeValue={ this.onChangeValue } />
                <button onClick={ () => this.banUser() }>Ban</button>
                <br />
                {/* <button onClick={ () => this.findUser() }>Find</button> */}
                <div
                    style={{
                        width: '100%',
                        maxHeight: 200,
                        overflowY: 'auto',
                        boxShadow: '0px 5px 10px rgba(0, 0, 0, .1)',
                        overflowX: 'hidden'
                    }}
                >
                <input
                    type="text"
                    placeholder="Enter username"
                    value={ searchUser }
                    onChange={ (e) => this.onSearchUserChange(e) }
                    style={{
                        width: '100%',
                        boxShadow: '0px 5px 10px rgba(0, 0, 0, .1)',
                        border: 0,
                        fontSize: 20,
                        padding: 20
                    }}
                />
                {
                    (matchProfilName.length > 0)
                        ? (
                            matchProfilName.map((name) => (
                                <div className={ classes.searchBarResult } onClick={ () => this.setState({ searchUser: name.userName.trim() }) } key={ `name-${name.userName}` }>{ name.userName }</div>
                            ))
                        )
                        : null
                }
                </div>
            </div>
        )
    }
}

export default (withStyles(styles)(Admin))
