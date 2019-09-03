import React, { Component } from "react"

import { verifyKeyForgot, recoverPassword } from "utils/fileProvider"
import { checkPassword } from "utils/utils"

class Confirm extends Component {

    constructor(props) {
        super(props)
        this.state = {
			key: this.props.match.params.key,
			user: {}
        }
    }

    componentWillMount() {
        this.confirmKey();
    }

    setNewPassword = () => {
        const { key } = this.state;
        const password = document.getElementsByClassName('newPassword')[0].value;
        const confirmPassword = document.getElementsByClassName('confirmPassword')[0].value;
        if (password.trim() !== "" && confirmPassword !== "" && password === confirmPassword) {
            if (checkPassword(password)) {
                recoverPassword(password, key)
                alert("Password updated")
            } else {
                alert("Password not safe, please retry")
            }
        } else {
            alert("Passwords don't match or empty")
        }
    }

    confirmKey = () => {
        const { key } = this.state;
        verifyKeyForgot(key)
            .then((res) => {
                if (res.success) {
					this.setState({ confirmed: true })
					this.setState({ user: res.user })
                }
            })
	}

    render() {
        const { confirmed, user } = this.state;
        return (
            <div>
            {
                (confirmed) ? (
                    <div>
						Hello, {user.userName}
                        <input className="newPassword" type="password" placeholder="New password" />
						<input className="confirmPassword" type="password" placeholder="Confirm password" />
						<button onClick={() => this.setNewPassword()}>Submit</button>
                    </div>
                ) : (
                    <div>
                        ...
                    </div>
                )
            }
            </div>
        )
    }

}

export default Confirm
