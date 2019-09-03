import React, { useContext } from "react"
import { withRouter } from "react-router-dom"

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
            <div className="edit-profil">
                <div className="row center" style={{width: '70%', marginTop: 80}}>
                    <div className="col" style={{width: '25%', boxShadow: "0px 5px 15px rgba(0,0,0,.2)", borderRadius: 10, padding: 50}}>
                        <InfosProfil
                            infosUser={ user.dataUser }
                            updateDataUser={ user.setNewDataUser }
                        />
                    </div>
                    <div className="col" style={{width: '75%', boxShadow: "0px 5px 15px rgba(0,0,0,.2)", borderRadius: 10, padding: 50, margin: 20}}>
                        <InfosPersonal
                            infosUser={ user.dataUser }
                            updateDataUser={ user.setNewDataUser }
                        />
                    </div>
                </div>
            </div>
            <div className="edit-profil-lowres">
                <div className="row" style={{width: '100%'}}>
                    <InfosProfil
                        infosUser={ user.dataUser }
                        updateDataUser={ user.setNewDataUser }
                    />
                </div>
                <div className="row" style={{width: '100%'}}>
                    <InfosPersonal
                        infosUser={ user.dataUser }
                        updateDataUser={ user.setNewDataUser }
                    />
                </div>
            </div>
        </div>
    )
}

export default withRouter(EditProfil)
