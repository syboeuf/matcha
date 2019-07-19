import React, { Component } from "react"

import Images from "./components/Images"
import DataProfil from "./components/DataProfil"
import DataPersonal from "./components/DataPersonal"
import LikeUser from "./components/LikeUser"

import { reportingFakeProfil, getPopularScoreOfProfil } from "utils/fileProvider"

class InfosPerson extends Component {

    constructor(props) {
        super(props)
        this.state = {
            blocked: false,
            fake: false,
        }
    }
    
    componentWillReceiveProps(nextProps) {
        const { dataPerson } = nextProps
        if (this.props.dataPerson !== dataPerson) {
            this.setState({ blocked: false, fake: false })
        }
    }

    onClick = () => {
        const { dataPerson, dataUser, getListUser } = this.props
        this.setState({ blocked: true }, () => getListUser(dataUser.userName, dataPerson.userName))
    }

    render() {
        const { dataPerson, dataUser } = this.props
        if (dataPerson === null) {
            return <div />
        }
        const { blocked, fake } = this.state
        const {
            id, userName, lastName, firstName, biography,
            listInterest, gender, orientation, likeUser,
            fakeUser, inline, date, age, populareScore,
        } = dataPerson
        const dataProfil = { userName, lastName, firstName }
        const dataPersonal = {
            age, biography, listInterest, gender, orientation, populareScore,
        }
        return (
            <div>
                {
                    (blocked === false)
                        ? (
                            <div>
                                <Images id={ id } />
                                <DataProfil dataProfil={ dataProfil } />
                                <DataPersonal dataPersonal={ dataPersonal } />
                                <LikeUser
                                    id={ id }
                                    likeUser={ likeUser }
                                    user={ dataUser.userName }
                                    profilName={ userName }
                                />
                                <p>
                                    {
                                        (inline === 0)
                                            ? `This user is deconnected. His last connection are ${date}`
                                            : `This user is connected`
                                    }
                                </p>
                                <button onClick={ () => this.onClick() }>
                                    Block this profil
                                </button>
                                {
                                    (fakeUser !== undefined || fake === true)
                                        ? "This profil is potentially a fake Profil"
                                        : (
                                            <button onClick={ () => this.setState({ fake: true }, () => reportingFakeProfil(userName)) }>
                                                Report this user like a fake profil
                                            </button>
                                        )
                                }
                                <button onClick={ () => getPopularScoreOfProfil(userName) }>Popular score</button>
                            </div>
                        )
                        : <div>This profil is blocked</div>
                }
            </div>
        )
    }

}

export default InfosPerson