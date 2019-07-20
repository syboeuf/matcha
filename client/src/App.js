import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import UserProvider from "store/UserProvider"

import LoginAccount from "./Scene/LoginAccount"
import LoadingData from "./Scene/LoadingData"

const App = () => (
    <UserProvider>
        <BrowserRouter>
            <Switch>
                <Route exact path="/LoginAccount" component={ LoginAccount } />
                <Route component={ LoadingData } />
            </Switch>
        </BrowserRouter>
    </UserProvider>
)

export default App
