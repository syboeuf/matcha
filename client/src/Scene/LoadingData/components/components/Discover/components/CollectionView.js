import React, { Component } from "react"

import PreviewProfil from "./components/PreviewProfil"
import Form from "components/Form"

import { calculDistance } from "utils/fileProvider"

import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"

const styles = (theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    searchBtn: {
        width: '100%',
        padding: '20px',
        backgroundColor: 'transparent',
        border: '1px solid #4A90E2',
        borderRadius: '5px',
        color: '#4A90E2',
        transition: 'background-color .2s ease-out',
        marginTop: 10,
        marginBottom: 10,
        fontSize: '1em',
        textAlign: 'center',
        '&:hover': {
            transition: 'background-color .2s ease-in',
            backgroundColor: '#4A90E2',
            color: 'white',
            cursor: 'pointer'
        }
    },
    container: { display: "flex", flexWrap: "wrap" },
    tagDisabled: {
        color: '#4A90E2',
        backgroundColor: 'transparent',
        borderRadius: 20,
        padding: '5px 10px 5px 10px',
        border: '1px solid #4A90E2',
        marginRight: 10,
        marginBottom: 10,
        fontSize: '1.3em',
        fontWeight: 'bold',
        transition: 'background-color .3s',
        '&:hover': {
            backgroundColor: 'rgba(74, 144, 226, .1)',
            cursor: 'pointer'
        }
    },
    tagEnabled: {
        color: 'white',
        backgroundColor: '#4A90E2',
        borderRadius: 20,
        padding: '5px 10px 5px 10px',
        border: '1px solid #4A90E2',
        marginRight: 10,
        marginBottom: 10,
        fontSize: '1.3em',
        fontWeight: 'bold',
        transition: 'background-color .3s',
        '&:hover': {
            cursor: 'pointer'
        }
    }
})

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
const defaultPopulareScoreMin = 10
const defaultPopulareScoreMax = 100

class CollectionView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listProfil: null,
            listTag: "",
            searchProfilValue: "",
            searchProfilArray: [],
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

    onSearchUserChange = (e) => {
        let { searchProfilValue, listProfil, searchProfilArray } = this.state
        searchProfilValue = e.target.value
        searchProfilArray = listProfil.filter(name => name.userName.toLowerCase().startsWith(searchProfilValue.toLowerCase()))
        this.setState({ searchProfilValue, searchProfilArray })
    }

    render() {
        const { chooseDataPerson, listPerson, classes } = this.props
        const {
            listProfil, listTag, age, distance, score, searchProfilArray, searchProfilValue,
        } = this.state
        // console.log(searchProfilArray)
        return (
            <div>
                <div style={{ width: '40%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <input
                        type="text"
                        value={ searchProfilValue }
                        onChange={ (e) => this.onSearchUserChange(e) }
                        placeholder="Seach a profil by the name"
                        style={{
                            width: '100%',
                            boxShadow: '0px 5px 10px rgba(0, 0, 0, .1)',
                            border: 0,
                            fontSize: 20,
                            padding: 20,
                            marginBottom: 10,
                        }}
                    />
                    <div style={{ display: 'flex' }}>
                        <Form inputArray={ age } onChangeValue={ this.onChangeAge } />
                        <Form inputArray={ distance } onChangeValue={ this.onChangeDistance } />
                        <Form inputArray={ score } onChangeValue={ this.onChangeScore } />
                    </div>
                    <button
                            className={ classes.searchBtn }
                            onClick={ () => this.filterList(listPerson) }
                        >
                            Search
                    </button>
                    <div className={ classes.container }>
                        {
                            listTagArray.map((tag) => (
                                <button
                                    key={ `Btn-${tag}` }
                                    onClick={ () => this.chooseTag(tag) }
                                    className={ (listTag.indexOf(tag) !== -1) ? classes.tagEnabled : classes.tagDisabled }
                                >
                                    { tag }
                                </button>
                            ))
                        }
                    </div>
                </div>
                <Container className={ classes.cardGrid } maxWidth="lg">
                    <Grid container spacing={ 4 }>
                        {
                            listProfil.map((data) => (
                                <PreviewProfil
                                    key={ `PreviewProfil-${data.id}` }
                                    data={ data }
                                    chooseDataPerson={ chooseDataPerson }
                                />
                            ))
                        }
                    </Grid>
                </Container>
            </div>
        )
    }

}

export default withStyles(styles)(CollectionView)
