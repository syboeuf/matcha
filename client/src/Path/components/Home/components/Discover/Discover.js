import React, { Component } from "react"

import CollectionView from "./components/CollectionView"
import InfosPerson from "./components/InfosPerson"

import { Container, Row, Col } from "reactstrap"

import { blockList, getAllOtherDataOfProfil, visitProfil, blockProfil } from "utils/fileProvider"

class Discover extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listPerson: null,
            dataPerson: null,
        }
    }

    componentWillMount() {
        const { dataUser } = this.props
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
        const { dataUser } = this.props
        visitProfil(dataUser.userName, dataPerson.userName)
        getAllOtherDataOfProfil(dataUser.userName, dataPerson.userName)
            .then((response) => this.setState({ dataPerson: response.otherData }))
            .catch((error) => console.log(error))
    }

    render() {
        const { dataUser } = this.props
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
            <Container fluid style={ { width: "80%" } }>
                <Row>
                    <Col md="7">
                        <CollectionView
                            dataUser={ dataUser }
                            listPerson={ listPerson }
                            chooseDataPerson={ this.chooseDataPerson }
                        />
                    </Col>
                    <Col md="3">
                        <InfosPerson
                            dataUser={ dataUser }
                            dataPerson={ dataPerson }
                            getListUser={ this.getListUser }
                        />
                    </Col>
                </Row>
            </Container>

        )
    }

}

export default Discover
