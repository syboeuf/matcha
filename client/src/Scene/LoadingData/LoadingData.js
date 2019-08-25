import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { UserConsumer } from "store/UserProvider"
import * as ELG from "esri-leaflet-geocoder"

import {
    getDataFromCookie, getLocation, getUserApproximateLocation, setLocationToNull,
    setLocation, deleteCookie,
} from "utils/fileProvider"

import Loader from "components/Loader"
import PageWithHeader from "./components/PageWithHeader"

class LoadingData extends Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        this.state = {
            loadGeolocalistationSuccess: false,
            loadGeolocalistationApproximateSuccess: false
        }
    }

    componentWillMount() {
        getDataFromCookie()
            .then((data) => {
                const { history } = this.props
                const { setNewDataUser, socket } = this.context
                if (Object.keys(data).length === 0) {
                    history.push("/LoginAccount")
                } else {
                    socket.on("USER_ALREAY_CONNECTED", this.userAlreadyConnect)
                    setNewDataUser({ pictures: [...data.dataUser[1]], ...data.dataUser[0][0] })
                    socket.emit("VERIFY_USER", data.dataUser[0][0].userName, this.verifyIfUserIsConnected)
                    getLocation()
                        .then((response) => {
                            ELG.reverseGeocode()
                                .latlng([response.coords.latitude, response.coords.longitude])
                                .run((error, results) => {
                                    if (error) {
                                        return error
                                    } else {
                                        const dataAddress = {
                                            coords: `${results.latlng.lat} , ${results.latlng.lng}`,
                                            address: results.address.LongLabel,
                                        }
                                        setLocation(data.dataUser[0].userName, dataAddress)
                                            .then(() => {
                                                this.context.setNewDataUser({
                                                    ...this.context.dataUser,
                                                    userLocation: dataAddress.coords,
                                                    userAddress: dataAddress.address,
                                                })
                                                this.setState({ loadGeolocalistationSuccess: true })
                                        })
                                            .catch((error) => console.log(error))
                                    }
                                })
                        })
                        .catch(() => {
                            setLocationToNull(data.dataUser[0].userName)
                                .then(() => this.setState({ loadGeolocalistationSuccess: true }))
                                .catch((error) => console.log(error))
                        })
                    getUserApproximateLocation(data.dataUser[0].userName)
                        .then((response) => {
                            this.context.setNewDataUser({
                                ...this.context.dataUser,
                                userApproximateLocation: response.approximateLocation,
                                userApproximateCity: response.userApproximateCity,
                            })
                            this.setState({ loadGeolocalistationApproximateSuccess: true })
                        })
                        .catch((error) => console.log(error))
                    }
            })
            .catch((error) => console.log(error))
    }

    componentWillUnmount() {
        const { socket } = this.context
        socket.off("USER_ALREAY_CONNECTED")
    }

    userAlreadyConnect = (userConnected) => {
        const { history } = this.props
        if (userConnected === true) {
            deleteCookie()
            history.push("/LoginAccount")
        } else {
            console.log("user connect")
        }
    }

    setUser = (user) => {
        const { socket } = this.context
        socket.emit("USER_CONNECTED", user)
    }

    verifyIfUserIsConnected = ({ user, isUser }) => {
        const { socket } = this.context
        if (isUser) {
            socket.emit("CHECK_IF_USER_CONNECTED", user)
        } else {
            this.setUser(user)
        }
    }

    render() {
        const { loadGeolocalistationApproximateSuccess, loadGeolocalistationSuccess } = this.state
        if (loadGeolocalistationApproximateSuccess !== true || loadGeolocalistationSuccess !== true) {
            return <Loader />
        }
        return <PageWithHeader />
    }

}

export default withRouter(LoadingData)
