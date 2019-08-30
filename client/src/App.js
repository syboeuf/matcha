import React, { useContext } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { UserConsumer } from "store/UserProvider"
import io from "socket.io-client"

import ConfirmKey from "./Scene/ConfirmKey"
import LoginAccount from "./Scene/LoginAccount"
import LoadingData from "./Scene/LoadingData"

const App = () => {
    const user = useContext(UserConsumer)
    const socketUrl = "localhost:4000"
    if (user.socket === null) {
        const socket = io(socketUrl)
        socket.on("connect", () => {
            console.log("connected in client")
        })
        user.setSocket(socket)
    }
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/LoginAccount" component={ LoginAccount } />
                <Route path="/ConfirmKey" component={ ConfirmKey } />
                <Route component={ LoadingData } />
            </Switch>
        </BrowserRouter>
    )
}

export default App
