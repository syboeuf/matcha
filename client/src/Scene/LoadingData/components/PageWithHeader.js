import React from "react"
import { Route, Switch } from "react-router-dom"

import Header from "./components/Header"
import Home from "./components/Home"
import Messages from "./components/Messages"
import ListProfilBlock from "./components/ListProfilBlock"
import EditProfil from "./components/EditProfil"
import Discover from "./components/Discover"
import InfosPerson from "./components/InfosPerson"
import Admin from "./components/Admin"
import Error from "components/Error"

const PageWithHeader = () => {
    return (
        <div>
            <Header />
            <main>
                <Switch>
                    <Route exact path="/" component={ Home } />
                    <Route path="/Messages" component={ Messages } />
                    <Route path="/EditProfil" component={ EditProfil } />
                    <Route path="/Discover" component={ Discover } />
                    <Route path="/InfosPerson" component={ InfosPerson } />
                    <Route path="/ListProfilBlock" component={ ListProfilBlock } />
                    <Route path="/Admin" component={ Admin } />
                    <Route component={ Error } />
                </Switch>
            </main>
        </div>
    )
}

export default PageWithHeader
