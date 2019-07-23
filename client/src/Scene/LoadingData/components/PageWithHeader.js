import React from "react"
import { Route } from "react-router-dom"

import Header from "components/Header"
import Home from "./components/Home"
import Messages from "./components/Messages"
import ListProfilBlock from "./components/ListProfilBlock"
import EditProfil from "./components/EditProfil"
import Discover from "./components/Discover"
import InfosPerson from "./components/InfosPerson"

const PageWithHeader = () => {
    return (
        <div>
            <Header />
            <main>
                <Route path="/Home" component={ Home } />
                <Route path="/Messages" component={ Messages } />
                <Route path="/EditProfil" component={ EditProfil } />
                <Route path="/Discover" component={ Discover } />
                <Route path="/InfosPerson" component={ InfosPerson } />
                <Route path="/ListProfilBlock" component={ ListProfilBlock } />
            </main>
        </div>
    )
}

export default PageWithHeader