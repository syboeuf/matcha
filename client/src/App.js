import React, { useContext } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { UserConsumer } from "store/UserProvider"
import io from "socket.io-client"

import Confirm from "./Scene/Confirm"
import Forgot from "./Scene/Forgot"
import LoginAccount from "./Scene/LoginAccount"
import LoadingData from "./Scene/LoadingData"

const App = () => {
    const user = useContext(UserConsumer)
    const socketUrl = "localhost:4000"
    if (user.socket === null) {
        const socket = io(socketUrl)
        socket.on("connect", () => {
            // console.log("connected in client")
        })
        user.setSocket(socket)
    }
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={ LoginAccount } />
                <Route path="/confirm/:key" component={ Confirm } />
                <Route path="/forgot/:key" component={ Forgot } />
                <Route component={ LoadingData } />
            </Switch>
        </BrowserRouter>
    )
}

export default App
