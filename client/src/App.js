import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import UserProvider from "store/UserProvider"

import ConfirmKey from "./Scene/ConfirmKey"
import LoginAccount from "./Scene/LoginAccount"
import LoadingData from "./Scene/LoadingData"

import Admin from "./Admin"

/*
const App = () => (
    <Admin />
)
*/

const App = () => (
    <UserProvider>
        <BrowserRouter>
            <Switch>
                <Route exact path="/LoginAccount" component={ LoginAccount } />
                <Route path="/ConfirmKey" component={ ConfirmKey } />
                <Route component={ LoadingData } />
            </Switch>
        </BrowserRouter>
    </UserProvider>
)

export default App