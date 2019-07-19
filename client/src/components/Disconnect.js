import React, { useContext } from "react"
import { withRouter } from "react-router-dom"
import { UserConsumer } from "store/UserProvider"

import { userIsDeLog } from "utils/fileProvider"

const Disconnect = ({ history }) => {
    const user = useContext(UserConsumer)
    return (
        <div
            onClick={ () => {
                userIsDeLog(user.dataUser.userName)
                    .then(() => {
                        user.setNewDataUser(undefined)
                        history.push("/LoginAccount")
                    })
                    .catch((error) => console.log(error))
            } }
        >
            Disconnect
        </div>
    )
}

export default withRouter(Disconnect)
