import React, { Component } from "react"
import { withRouter } from "react-router-dom"

import CollectionView from "./components/CollectionView"

import { blockList, blockProfil } from "utils/fileProvider"
import { UserConsumer } from "store/UserProvider"

const limitProfil = 20

class Discover extends Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        this.state = {
            listPerson: null,
            dataPerson: null,
            maxShowProfil: limitProfil,
        }
    }

    componentWillMount() {
        this.getListPerson()
    }

    getListPerson = () => {
        const { maxShowProfil } = this.state
        const { dataUser } = this.context
        blockList(dataUser.userName, dataUser.orientation, maxShowProfil)
            .then((response) => this.setState({ listPerson: response.blockList }))
            .catch((error) => console.log(error))
    }

    getListUser = (userName, profilName) => {
        blockProfil(userName, profilName)
            .then((response) => this.setState({ listPerson: response.blockList }))
            .catch((error) => console.log(error))
    }

    chooseDataPerson = (dataPerson) => {
        const { history } = this.props
        const { dataUser, socket } = this.context
        socket.emit("NOTIFICATIONS_SENT", { reciever: dataPerson.userName, notification: `${dataUser.userName} visit you're profil` })
        history.push("/InfosPerson", { data: { id: dataPerson.id, userName: dataUser.userNames } })
    }

    loadMoreProfil = () => {
        this.setState({ maxShowProfil: this.state.maxShowProfil + limitProfil }, () => this.getListPerson())
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
        const { listPerson } = this.state
        if (listPerson === null) {
            return <div />
        }
        return (
            <CollectionView
                dataUser={ dataUser }
                listPerson={ listPerson }
                chooseDataPerson={ this.chooseDataPerson }
                loadMoreProfil={ this.loadMoreProfil }
            />
        )
    }

}

export default withRouter(Discover)
