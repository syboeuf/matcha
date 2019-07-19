import React, { Component } from "react"

import PreviewProfil from "./components/PreviewProfil"
import Form from "components/Form"

import { calculDistance } from "utils/fileProvider"

import { Container, Row, Col, Button } from "reactstrap"

const listTagArray = [
    "#Movie",
    "#Manga",
    "#Sport",
    "#NigthParty",
    "#data processing",
]

const defaultAgeMin = 10
const defaultAgeMax = 50
const defaultDistanceMin = 0
const defaultDistanceMax = 30
const defaultPopulareScoreMin = 30
const defaultPopulareScoreMax = 70

class CollectionView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listProfil: null,
            listTag: "",
            age: [
                { name: "ageMin", type: "number", placeholder: "ageMin", value: defaultAgeMin },
                { name: "ageMax", type: "number", placeholder: "ageMax", value: defaultAgeMax },
            ],
            distance: [
                { name: "distanceMin", type: "number", placeholder: "distanceMin", value: defaultDistanceMin },
                { name: "distanceMax", type: "number", placeholder: "distanceMax", value: defaultDistanceMax },
            ],
            score: [
                { name: "populareScoreMin", type: "number", placeholder: "Score Min", value: defaultPopulareScoreMin },
                { name: "populareScoreMax", type: "number", placeholder: "Score Max", value: defaultPopulareScoreMax },
            ],
        }
    }

    componentWillMount() {
        const { listPerson } = this.props
        this.filterList(listPerson)
    }

    componentWillReceiveProps(nextProps) {
        const { listPerson } = nextProps
        if (this.props.listPerson !== listPerson) {
            this.filterList(listPerson)
        }
    }

    filterList = (listPerson) => {
        let newListPerson = this.filterOrientation(listPerson)
        newListPerson = this.filterAge(newListPerson)
        newListPerson = this.filterLocation(newListPerson)
        newListPerson = this.filterTag(newListPerson)
        newListPerson = this.filterPopularScore(newListPerson)
        this.setState({ listProfil: newListPerson })
    }

    filterOrientation = (array) => {
        const { orientation } = this.props.dataUser
        if (orientation === "Bisexuelle") {
            return array
        }
        const newListPerson = []
        array.forEach((data) => {
            if (data.gender === orientation) {
                newListPerson.push(data)
            }
        })
        return array
    }

    filterAge = (array) => {
        const { age } = this.state
        const ageMin = (age.find((x) => x.name === "ageMin")).value
        const ageMax = (age.find((x) => x.name === "ageMax")).value
        if (ageMin <= 0 || ageMax <= 0) {
            return array
        }
        const newListPerson = []
        array.forEach((data) => {
            if (data.age >= ageMin && data.age <= ageMax) {
                newListPerson.push(data)
            }
        })
        return newListPerson
    }

    filterLocation = (array) => {
        const { userLocation, userApproximateLocation } = this.props.dataUser
        const { distance } = this.state
        const distanceMin = (distance.find((x) => x.name === "distanceMin")).value
        const distanceMax = (distance.find((x) => x.name === "distanceMax")).value
        if (distanceMin <= 0 || distanceMax <= 0) {
            return array
        }   
        const userCoords = (userLocation !== null) ? userLocation.split(", ") : userApproximateLocation.split(", ")
        const newListPerson = []
        array.forEach((data) => {
            const profilCoords = (data.userLocation !== null) ? data.userLocation.split(", ") : data.userApproximateLocation.split(", ")
            const distance = calculDistance(userCoords[0], userCoords[1], profilCoords[0], profilCoords[1])
            if (distanceMin <= distance && distanceMax >= distance) {
                newListPerson.push(data)
            }
        })
        return newListPerson
    }

    chooseTag = (tag) => {
        const { listPerson } = this.props
        const { listTag } = this.state
        if (listTag.indexOf(tag) === -1) {
            this.setState({ listTag: this.state.listTag + tag }, () => this.filterList(listPerson))
        } else {
            this.setState({ listTag: this.state.listTag.replace(tag, "") }, () => this.filterList(listPerson))
        }
    }

    filterTag = (array) => {
        const { listTag } = this.state
        if (listTag === "") {
            return array
        }
        const newListPerson = []
        array.forEach((data) => {
            if (data.listInterest !== null) {
                const listInterestProfil = listTag.split("#")
                listInterestProfil.splice(0, 1)
                let absTag = 1
                listInterestProfil.forEach((tag) => {
                    if (data.listInterest.indexOf(tag) === -1) {
                        absTag = 0
                    }
                })
                if (absTag === 1) {
                    newListPerson.push(data)
                }
            }
        })
        return newListPerson
    }

    filterPopularScore = (array) => {
        const { score } = this.state
        const populareScoreMin = (score.find((x) => x.name === "populareScoreMin")).value
        const populareScoreMax = (score.find((x) => x.name === "populareScoreMax")).value
        if (populareScoreMin <= 0 || populareScoreMax <= 0) {
            return array
        }
        const newListPerson = []
        array.forEach((data) => {
            if (populareScoreMin <= data.populareScore && populareScoreMax >= data.populareScore) {
                newListPerson.push(data)
            }
        })
        return newListPerson
    }

    onChangeAge = (e, index) => {
        const { age } = this.state
        if (e.target.value < 0) {
            age[index].value = ""
        }
        else {
            age[index].value = e.target.value
        }
        this.setState({ age })
    }

    onChangeDistance = (e, index) => {
        const { distance } = this.state
        if (e.target.value < 0) {
            distance[index].value = ""
        }
        else {
            distance[index].value = e.target.value
        }
        this.setState({ distance })
    }

    onChangeScore = (e, index) => {
        const { score } = this.state
        if (e.target.value < 0) {
            score[index].value = ""
        }
        else if (e.target.value > 100) {
            score[index].value = 100
        }
        else {
            score[index].value = e.target.value
        }
        this.setState({ score })
    }

    render() {
        const { chooseDataPerson, listPerson } = this.props
        const {
            listProfil, listTag, age, distance, score,
        } = this.state
        return (
            <Container fluid style={{border: "1px solid red"}}>
                <Row>
                    <Col md="3">
                        <Form inputArray={ age } onChangeValue={ this.onChangeAge } />
                    </Col>
                    <Col md="3">
                        <Form inputArray={ distance } onChangeValue={ this.onChangeDistance } />
                    </Col>
                    <Col md="3">
                        <Form inputArray={ score } onChangeValue={ this.onChangeScore } />                 
                    </Col>
                    <Col md="3">
                        <button onClick={ () => this.filterList(listPerson) }>Filter populare score</button>                    
                    </Col>
                </Row>
                <Row>
                    {
                        listTagArray.map((tag) => (
                            <Button
                                key={ `Btn-${tag}` }
                                onClick={ () => this.chooseTag(tag) }
                                style={ { marginRight: 5, color: (listTag.indexOf(tag) !== -1) ? "red" : null } }
                            >
                                { tag }
                            </Button>
                        ))
                    }
                </Row>
                <Row>
                    {
                        listProfil.map((data) => (
                            <Col key={ `PreviewProfil-${data.id}` } md="3">
                                <PreviewProfil
                                    data={ data }
                                    chooseDataPerson={ chooseDataPerson }
                                />
                            </Col>
                        ))
                    }               
                </Row>
            </Container>
        )
    }

}

export default CollectionView
