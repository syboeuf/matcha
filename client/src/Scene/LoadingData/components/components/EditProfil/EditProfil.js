import React, { Component } from "react"
import { withRouter } from "react-router-dom"

import InfosProfil from "./components/InfosProfil"
import InfosPersonal from "./components/InfosPersonal"
import { UserConsumer } from "store/UserProvider"

class EditProfil extends Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        this.state = { width: window.innerWidth }
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimension)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimension)
    }

    updateDimension = () => {
        this.setState({ width: window.innerWidth })
    }

    render() {
        const { dataUser, setNewDataUser } = this.context
        if (dataUser === undefined) {
            return <div />
        }
        const { width } = this.state
        return (
            <div>
                {
                    (width > 768)
                        ? (
                            <div className="edit-profil">
                                <div className="row center" style={{width: '70%', marginTop: 80}}>
                                    <div className="col" style={{width: '25%', boxShadow: "0px 5px 15px rgba(0,0,0,.2)", borderRadius: 10, padding: 50}}>
                                        <InfosProfil
                                            infosUser={ dataUser }
                                            updateDataUser={ setNewDataUser }
                                        />
                                    </div>
                                    <div className="col" style={{width: '75%', boxShadow: "0px 5px 15px rgba(0,0,0,.2)", borderRadius: 10, padding: 50, margin: 20}}>
                                        <InfosPersonal
                                            infosUser={ dataUser }
                                            updateDataUser={ setNewDataUser }
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                        : (
                            <div className="edit-profil-lowres">
                                <div className="row" style={{width: '100%'}}>
                                    <InfosProfil
                                        infosUser={ dataUser }
                                        updateDataUser={ setNewDataUser }
                                    />
                                </div>
                                <div className="row" style={{width: '100%'}}>
                                    <InfosPersonal
                                        infosUser={ dataUser }
                                        updateDataUser={ setNewDataUser }
                                    />
                                </div>
                            </div>
                        )
                }
            </div>
        )
    }

}

export default withRouter(EditProfil)
