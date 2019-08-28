import React, { useContext } from "react"
import { withRouter } from "react-router-dom"
import { UserConsumer } from "store/UserProvider"

import { deleteCookie } from "utils/fileProvider"

const Disconnect = ({ history }) => {
    const user = useContext(UserConsumer)

    const logout = () => {
        user.socket.emit("LOGOUT")
    }

    return (
        <div
            onClick={ () => {
                deleteCookie()
                logout()
                user.setNewDataUser(undefined)
                history.push("/LoginAccount")
            } }
        >
            Disconnect
        </div>
    )
}

export default withRouter(Disconnect)
