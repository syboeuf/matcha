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
        width: 60,
        padding: 20,
        backgroundColor: '#c31e27',
        borderRadius: '5px',
        color: 'white',
        border: 'none',
        textAlign: 'center'
    },
    createAccount: {
        backgroundColor: 'white',
        width: '400px',
        padding: '30px',
        borderRadius: '10px',
        position: 'absolute',
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
            showLogIn: false,
            showCreateAccount: false,
        }
    }

    render() {
        const { showLogIn, showCreateAccount } = this.state
        return (
            <div
                style={ styles.container }
            >
                <img
                    src="logo.png"
                    onClick={ () => this.setState({ showLogIn: false, showCreateAccount: false }) }
                    style={ styles.logo }
                >
                </img>
                <div
                    onClick={ () => this.setState({ showLogIn: !this.state.showLogIn, showCreateAccount: false }) }
                    style={ styles.logIn }
                >
                    Log In
                </div>
                {
                    (showCreateAccount || showLogIn )
                    ? null
                    :
                    <div
                        style={ styles.createAccount }
                    >
                        <h1 style={ styles.title1 }>Bonjour, vous cherchez l'amour ?</h1>
                        <h2 style={ styles.title2 }>Alors vous êtes au bon endroit, inscrivez-vous dès maintenant.</h2>

                        <hr style={ styles.hr } />

                        <div
                            onClick={ () => this.setState({ showLogIn: false, showCreateAccount: !this.state.showCreateAccount }) }
                            style={ styles.buttonCreateAccount }
                        >
                            Create account
                        </div>
                        <span style={ styles.span } onClick={ () => this.setState({ showLogIn: true }) }>Already have an account ?</span>
                    </div>
                }
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
