import React, { Component } from "react"
import PreviewProfil from "./components/PreviewProfil"
import SearchBar from "components/SearchBar"
import RangeSlider from "components/RangeSlider"
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
    "#Data processing",
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
            age: [defaultAgeMin, defaultAgeMax],
            distance: [defaultDistanceMin, defaultDistanceMax],
            score: [defaultPopulareScoreMin, defaultPopulareScoreMax],
            sortAge: true,
            sortDistance: true,
            sortScore: true,
            sortTag: true,
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
        let newListPerson = this.filterAge(listPerson)
        newListPerson = this.filterLocation(newListPerson)
        newListPerson = this.filterTag(newListPerson)
        newListPerson = this.filterPopularScore(newListPerson)
        this.setState({ listProfil: newListPerson })
    }
    filterAge = (array) => {
        const { age } = this.state
        const ageMin = age[0]
        const ageMax = age[1]
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
        const distanceMin = distance[0]
        const distanceMax = distance[1]
        if (distanceMin <= 0 || distanceMax <= 0) {
            return array
        }
        const userCoords = (userLocation !== null) ? userLocation.split(",") : userApproximateLocation.split(",")
        const newListPerson = []
        array.forEach((data) => {
            if (distanceMax >= 100) {
                newListPerson.push(data)
            } else {
                const profilCoords = (data.userLocation !== null) ? data.userLocation.split(",") : data.userApproximateLocation.split(",")
                const distance = calculDistance(userCoords[0], userCoords[1], profilCoords[0], profilCoords[1])
                if (distanceMin <= distance && distanceMax >= distance) {
                    newListPerson.push(data)
                }
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
        const populareScoreMin = score[0]
        const populareScoreMax = score[1]
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
    handleChange = (name, newValue) => {
        this.setState({ [name]: newValue }, () => this.filterList(this.props.listPerson)) // Made in real time
    }
    swap = (leftIndex, rightIndex) => {
        const temp = this.array[leftIndex]
        this.array[leftIndex] = this.array[rightIndex]
        this.array[rightIndex] = temp
    }
    ascendingSort = (items, left, right, option) => {
        const pivot = items[Math.floor((right + left) / 2)][option]
        let i = left
        let j = right
        while (i <= j) {
            while (items[i][option] < pivot) {
                i++
            }
            while (items[j][option] > pivot) {
                j--
            }
            if (i <= j) {
                this.swap(i, j)
                i++
                j--
            }
        }
        return i
    }
    descendingSort = (items, left, right, option) => {
        const pivot = items[Math.floor((right + left) / 2)][option]
        let i = left
        let j = right
        while (i <= j) {
            while (items[i][option] > pivot) {
                i++
            }
            while (items[j][option] < pivot) {
                j--
            }
            if (i <= j) {
                this.swap(i, j)
                i++
                j--
            }
        }
        return i
    }
    quickSort = (left, right, option, sort) => {
        let index
        if (this.array.length > 1) {
            index = (sort === true) ? this.ascendingSort(this.array, left, right, option) : this.descendingSort(this.array, left, right, option)
            if (left < index - 1) {
                this.quickSort(left, index - 1, option, sort)
            }
            if (index < right) {
                this.quickSort(index, right, option, sort)
            }
        }
    }
    sortArray = (option, sort, key) => {
        const { listProfil } = this.state
        if (option === "distance") {
            const { userLocation, userApproximateLocation } = this.props.dataUser
            const newArray = []
            const userCoords = (userLocation !== null) ? userLocation.split(",") : userApproximateLocation.split(",")
            listProfil.forEach((person) => {
                const profilCoords = (person.userLocation !== null) ? person.userLocation.split(",") : person.userApproximateLocation.split(",")
                const distance = calculDistance(userCoords[0], userCoords[1], profilCoords[0], profilCoords[1])
                newArray.push({ ...person, distance })
            })
            this.array = newArray
        } else if (option === "numberOfTags") {
            const newArray = []
            listProfil.forEach((person) => {
                const numberOfTags = person.listInterest.split("#").length
                newArray.push({ ...person, numberOfTags })
            })
            this.array = newArray
        } else {
            this.array = listProfil
        }
        this.quickSort(0, this.array.length - 1, option, sort)
        this.setState({ listProfil: this.array, [key]: !sort })
    }
    render() {
        const {
            chooseDataPerson, listPerson, classes, loadMoreProfil,
        } = this.props
        const {
            listProfil, listTag, age, distance, score,
            sortAge, sortDistance, sortScore, sortTag,
        } = this.state
        return (
            <div>
                <SearchBar />
                <div className="center" style={{ width: '90%' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', padding: 10, marginLeft: 'auto', marginRight: 'auto' }}>
                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ display: 'flex', width: '100%', marginLeft: 'auto', marginRight: 'auto', marginTop: 50, flexWrap: 'wrap', justifyContent: "space-around" }}>
                                <div style={{ width: "30%" }}>
                                    <RangeSlider name={'Age'} value={ age } min={18} max={150} handleChange={ this.handleChange } />
                                    <div className="sort-btn" onClick={ () => this.sortArray("age", sortAge, "sortAge") }>{ (sortAge === true) ? "Ascending" : "Descending" }</div>
                                </div>
                                <div style={{ width: "30%", marginLeft: 20, marginRight: 20 }}>
                                    <RangeSlider name={'Distance'} value={ distance } min={0} max={100} handleChange={ this.handleChange } />
                                    <div className="sort-btn" onClick={ () => this.sortArray("distance", sortDistance, "sortDistance") }>{ (sortDistance === true) ? "Ascending" : "Descending" }</div>
                                </div>
                                <div style={{ width: "30%", marginLeft: 20, marginRight: 20 }}>
                                    <RangeSlider name={'Score'} value={ score } min={0} max={100} handleChange={ this.handleChange } />
                                    <div className="sort-btn" onClick={ () => this.sortArray("populareScore", sortScore, "sortScore") }>{ (sortScore === true) ? "Ascending" : "Descending" }</div>
                                </div>
                            </div>
                        </div>
                        <div className={ classes.container } style={{ width: '100%', marginTop: 20 }}>
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
                            <div className="sort-btn" onClick={ () => this.sortArray("numberOfTags", sortTag, "sortTag") }>{ (sortTag === true) ? "Ascending" : "Descending" }</div>
                        </div>
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
                    <div><button className={ classes.searchBtn } onClick={ () => loadMoreProfil() }>Load more</button></div>
                </Container>
            </div>
        )
    }
}
export default withStyles(styles)(CollectionView)
