import React, { Component } from "react"

import DataPersonal from "./components/DataPersonal"
import LikeUser from "./components/LikeUser"

class DataProfil extends Component {

    render() {
        const { dataPersonal, id, likeUser, user, profilName } = this.props
        return (
            <div>
                <DataPersonal dataPersonal={ dataPersonal } />
                <LikeUser
                    id={ id }
                    likeUser={ likeUser }
                    user={ user }
                    profilName={ profilName }
                />
            </div>
        )
    }

}

export default DataProfil
