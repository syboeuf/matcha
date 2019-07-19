import React, { Component, useContext } from "react"
import { withRouter } from "react-router-dom"
//import PropTypes from "prop-types"

import InfosProfil from "./components/InfosProfil"
import InfosPersonal from "./components/InfosPersonal"
import { UserConsumer } from "store/UserProvider"

const EditProfil = () => {
    const user = useContext(UserConsumer)
    if (user.dataUser === undefined) {
        return <div />
    }
    return (
        <div>
            <InfosProfil
                infosUser={ user.dataUser }
                updateDataUser={ user.setNewDataUser }
            />
            <InfosPersonal
                infosUser={ user.dataUser }
                updateDataUser={ user.setNewDataUser }
            />
        </div>
    )
}

EditProfil.propTypes = {
    //dataUser: PropTypes.objectOf().isRequired,
}

export default withRouter(EditProfil)