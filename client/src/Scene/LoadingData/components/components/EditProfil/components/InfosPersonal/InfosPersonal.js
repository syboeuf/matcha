import React, { Component } from "react"
// import PropTypes from "prop-types"

import Age from "./components/Age"
import Biography from "./components/Biography"
import ListInterest from "./components/ListInterest"
import Orientation from "./components/Orientation"
import Gender from "./components/Gender"
import Pictures from "./components/Pictures"
import Map from "./components/Map"

import { updateInfosPersonal } from "utils/fileProvider"

class InfosPersonal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            infosPersonalUser: {},
        }
    }

    componentWillMount() {
        const { infosUser } = this.props
        this.setState({ infosPersonalUser: { ...infosUser } })
    }

    onChangeValue = (e, option) => {
        this.setState({
            ...this.state,
            infosPersonalUser: {
                ...this.state.infosPersonalUser,
                [option]: e.target.value,
            },
        })
    }

    updateListInterest = (newlistInterest) => {
        this.setState({
            ...this.state,
            infosPersonalUser: {
                ...this.state.infosPersonalUser,
                listInterest: newlistInterest,
            },
        })
    }

    onClick = (infosPersonalUser, userName) => {
        const { updateDataUser } = this.props
        updateInfosPersonal({ ...infosPersonalUser, userName })
        updateDataUser(infosPersonalUser)
    }

    render() {
        const { infosUser } = this.props
        const { userName, id } = infosUser
        const { infosPersonalUser } = this.state
        const {
            age, orientation, gender, biography,
            listInterest, userLocation, userApproximateLocation,
        } = infosPersonalUser
        return (
            <div>
                <Age
                    onChangeValue={ this.onChangeValue }
                    age={ age }
                />
                <Orientation
                    onChangeValue={ this.onChangeValue }
                    optionChecked={ orientation }
                />
                <Gender
                    onChangeValue={ this.onChangeValue }
                    optionChecked={ gender }
                />
                <Biography
                    onChangeValue={ this.onChangeValue }
                    value={ biography }
                />
                <ListInterest
                    onChangeValue={ this.updateListInterest }
                    list={ listInterest }
                />
                <Pictures
                    userId={ id }
                    userName={ userName }
                />
                <div style={ { width: "100%", height: 200 } }>
                    <Map
                        userName={ userName }
                        userLocation={ userLocation }
                        userApproximateLocation={ userApproximateLocation }
                    />
                </div>
                <button onClick={ () => this.onClick(infosPersonalUser, userName) }>Save</button>
            </div>
        )
    }

}

// InfosPersonal.propTypes = {}

export default InfosPersonal