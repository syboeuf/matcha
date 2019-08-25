import React, { Component } from "react"
import { withRouter } from "react-router-dom"

import CollectionView from "./components/CollectionView"

import {
    blockList, getAllOtherDataOfProfil, visitProfil, blockProfil,
} from "utils/fileProvider"
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
        const { dataUser, socket } = this.context
        socket.on("INLINE_USER_CONNECTED", this.inlineUserConnected)
        socket.emit("INLINE_USER_CONNECTED")
        blockList(dataUser.userName)
            .then((response) => this.setState({ listPerson: response.blockList }))
            .catch((error) => console.log(error))
    }

    componentWillUnmount() {
        const { socket } = this.context
        socket.off("INLINE_USER_CONNECTED")
    }

    inlineUserConnected = (inlineUsers) => {
        this.setState({ inlineUsers })
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
        visitProfil(dataUser.userName, dataPerson.userName)
        getAllOtherDataOfProfil(dataUser.userName, dataPerson.userName)
        .then((response) => {
            const { inlineUsers } = this.state
            const inline = inlineUsers.find(name => name === response.otherData.userName)
            return history.push("/InfosPerson", { dataPerson: { ...response.otherData, inline: (inline === undefined) ? 0 : 1 } })
        })
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
        const { listPerson } = this.state
        if (listPerson === null) {
            return <div />
        }
        return (
            <CollectionView
                dataUser={ dataUser }
                listPerson={ listPerson }
                chooseDataPerson={ this.chooseDataPerson }
            />
        )
    }

}

export default withRouter(Discover)
