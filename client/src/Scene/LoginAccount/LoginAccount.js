import React, { Component } from "react"

import CreateAccount from "./components/CreateAccount"
import LogIn from "./components/LogIn"

class LoginAccount extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            showLogIn: false,
            showCreateAccount: false,
        }
    }

    render() {
        const { showLogIn, showCreateAccount } = this.state
        return (
            <div>
                <button
                    onClick={ () => this.setState({ showLogIn: !this.state.showLogIn, showCreateAccount: false }) }
                >
                    Log In
                </button>
                <button
                    onClick={ () => this.setState({ showLogIn: false, showCreateAccount: !this.state.showCreateAccount }) }
                >
                    Create account
                </button>
                {
                    (showCreateAccount)
                        ? <CreateAccount />
                        : null
                        
                }
                {
                    (showLogIn)
                        ? <LogIn />
                        : null
                }
            </div>
        )
    }

}

export default LoginAccount