import React, { Component } from "react"
import { withRouter } from "react-router-dom"

import CollectionView from "./components/CollectionView"
import InfosPerson from "./components/InfosPerson"

import { blockList, getAllOtherDataOfProfil, visitProfil, blockProfil } from "utils/fileProvider"
import { UserConsumer } from "store/UserProvider"

class Discover extends Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        this.state = {
            listPerson: null,
            dataPerson: null,
        }
    }

    componentWillMount() {
        const { dataUser } = this.context
        blockList(dataUser.userName)
            .then((response) => this.setState({ listPerson: response.blockList }))
            .catch((error) => console.log(error))
    }

    getListUser = (userName, profilName) => {
        blockProfil(userName, profilName)
            .then((response) => this.setState({ listPerson: response.blockList }))
            .catch((error) => console.log(error))
    }

    chooseDataPerson = (dataPerson) => {
        const { dataUser } = this.context
        visitProfil(dataUser.userName, dataPerson.userName)
        getAllOtherDataOfProfil(dataUser.userName, dataPerson.userName)
            .then((response) => this.setState({ dataPerson: response.otherData }))
            .catch((error) => console.log(error))
    }

    render() {
        const { dataUser } = this.context
        if (dataUser === undefined) {
            return <div />
        }
        const {
            age, biography, gender, orientation, listInterest,
        } = dataUser
        if (!age || !biography || !gender || !orientation || !listInterest) {
            return (
                <div>
                    Vous devez remplir votre profil pour acceder a cette page !
                </div>
            )
        }
        const { dataPerson, listPerson } = this.state
        if (listPerson === null) {
            return <div />
        }
        return (
            <div>
                <CollectionView
                    dataUser={ dataUser }
                    listPerson={ listPerson }
                    chooseDataPerson={ this.chooseDataPerson }
                />
                <InfosPerson
                    dataUser={ dataUser }
                    dataPerson={ dataPerson }
                    getListUser={ this.getListUser }
                />
            </div>

        )
    }

}

export default withRouter(Discover)
