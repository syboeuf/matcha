import React, { Component } from "react"

import CreateAccount from "./components/CreateAccount"
import LogIn from "./components/LogIn"

const styles = {
    container: {
        minHeight: '100vh',
        backgroundImage: `url(background.png)`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    logo: { maxWidth: 180 },
    logIn: {
        marginTop: '40px',
        maxWidth: 90,
        padding: 20,
        backgroundColor: '#c31e27',
        borderRadius: '5px',
        color: 'white',
        border: 'none',
    },
    title1: { fontSize: '1.4em' },
    title2: { fontSize: '1.8em' },
    hr: {
        border: 0,
        borderTop: '1px solid #000',
        opacity: .1,
    },
    buttonCreateAccount: {
        marginTop: '40px',
        width: '90%',
        padding: '20px',
        backgroundColor: '#c31e27',
        borderRadius: '5px',
        color: 'white',
        border: 'none',
    },
    span: { color: '#c31e27', cursor: 'pointer' },
}

class LoginAccount extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            showLogin: false,
            showCreateAccount: false,
        }
    }

    hideLoginAndCreateAccount = () => {
        this.setState({ showLogin: false, showCreateAccount: false })
    }

    showLogin = () => {
        this.setState({ showLogin: !this.state.showLogin, showCreateAccount: false })
    }

    showCreateAccount = () => {
        this.setState({ showLogin: false, showCreateAccount: !this.state.showCreateAccount })
    }

    render() {
        const { showLogin, showCreateAccount } = this.state
        return (
            <div style={ styles.container }>
                <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,.1)', justifyContent: 'space-between', paddingLeft: 30, paddingRight: 30 }}>
                    <div style={{ height: 70 }}>
                        <img
                            src="logo.png"
                            alt="background"
                            onClick={ () => this.hideLoginAndCreateAccount() }
                            className="pointer"
                            style={{ ...styles.logo, paddingTop: 30 }}
                        />
                    </div>
                    <div style={{ display: 'flex', fontSize: '1.2em', color: '#fff', fontWeight: 'bold' }}>
                        <div className="header-link" style={{ marginRight: 50 }} onClick={ () => this.showCreateAccount() }>
                            Create account
                        </div>
                        <div className="header-link" onClick={ () => this.showLogin() }>
                            Sign in
                        </div>
                    </div>
                </div>
                {
                    (showCreateAccount || showLogin )
                    ? null
                    :
                    <div className="welcome-box">
                        <h1 style={ styles.title1 }>Bonjour, vous cherchez l'amour ?</h1>
                        <h2 style={ styles.title2 }>Alors vous êtes au bon endroit, inscrivez-vous dès maintenant.</h2>
                        <hr style={ styles.hr } />
                        <div
                            onClick={ () => this.showCreateAccount() }
                            style={ styles.buttonCreateAccount }
                        >
                            Create account
                        </div>
                        <span style={ styles.span } onClick={ () => this.showLogin() }>Already have an account ?</span>
                    </div>
                }
                {
                    (showCreateAccount)
                        ? <CreateAccount showLogin={ this.showLogin } />
                        : null
                }
                {
                    (showLogin)
                        ? <LogIn showCreateAccount={ this.showCreateAccount } />
                        : null
                }
            </div>
        )
    }

}

export default LoginAccount
