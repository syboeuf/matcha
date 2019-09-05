import React, { Component } from "react"
import L from "leaflet"
import Control from "react-leaflet-control"
import * as ELG from "esri-leaflet-geocoder"
import {
    Map, TileLayer, Marker, Popup,
} from "react-leaflet"
import { withRouter } from "react-router-dom"
import { UserConsumer } from "store/UserProvider"
import { IoMdLocate } from "react-icons/io"
import {
    setNewLocation, getDataPeople, getLocation, setLocation, getUserApproximateLocation, setLocationToNull,
} from "utils/fileProvider"
class MapComp extends Component {
    static contextType = UserConsumer
    constructor(props) {
        super(props)
        this.state = {
            center: [48.866667, 2.33333],
            dataPeople: undefined,
        }
    }
    componentWillMount() {
        this.findLocation()
        getDataPeople()
            .then((response) => this.setState({ dataPeople: response.dataPeople }))
            .catch((error) => console.log(error))
    }
    componentDidMount() {
        const { dataUser } = this.context
        const { updateDataUser } = this.props
        const map = this.leafleMap.leafletElement
        const searchControl = new ELG.Geosearch({
            useMapBounds: false,
            position: "topright",
            collapseAfterResult: false,
            expanded: true,
        }).addTo(map)
        const results = new L.LayerGroup().addTo(map)
        searchControl.on("results", (data) => {
            results.clearLayers()
            for (let i = data.results.length - 1; i >= 0; i--) {
                this.setState({ center: [data.results[i].latlng.lat, data.results[i].latlng.lng] },
                    () => {
                        const userLocation = `${data.results[i].latlng.lat}, ${data.results[i].latlng.lng}`
                        updateDataUser({ ...dataUser, userLocation })
                        setNewLocation(dataUser.userName, `${data.results[i].latlng.lat}, ${data.results[i].latlng.lng}`, data.results[i].text)
                    })
            }
        })
    }
    findLocation = () => {
        const { dataUser } = this.context
        const { userLocation, userApproximateLocation } = dataUser
        let coords
        if (userLocation === null) {
            coords = userApproximateLocation.split(",")
        } else {
            coords = userLocation.split(",")
        }
        this.setState({ center: coords })
    }
    onClick = (data) => {
        const { history } = this.props
        const { socket, dataUser } = this.context
        socket.emit("NOTIFICATIONS_SENT", { reciever: data.userName, notification: `${dataUser.userName} visit you're profil` })
        history.push("/InfosPerson", { data: { id: data.id, userName: dataUser.userName, profilName: data.userName } })
    }
    geolocate = () => {
        getLocation()
            .then((response) => {
                ELG.reverseGeocode()
                    .latlng([response.coords.latitude, response.coords.longitude])
                    .run((error, results) => {
                        if (error) {
                            return error
                        } else {
                            const { dataUser } = this.context
                            const dataAddress = {
                                coords: `${results.latlng.lat},${results.latlng.lng}`,
                                address: results.address.LongLabel,
                            }
                            setLocation(dataUser.userName, dataAddress)
                                .then(() => {
                                    this.context.setNewDataUser({
                                        ...this.context.dataUser,
                                        userLocation: dataAddress.coords,
                                        userAddress: dataAddress.address,
                                    })
                                    this.setState({ center: dataAddress.coords.split(",") })
                                })
                                .catch((error) => console.log(error))
                        }
                    })
            })
            .catch(() => {
                const { dataUser, setNewDataUser } = this.context
                setLocationToNull(dataUser.userName)
                getUserApproximateLocation(dataUser.userName)
                    .then((response) => {
                        setNewDataUser({
                            ...this.context.dataUser,
                            userApproximateLocation: response.approximateLocation,
                            userApproximateCity: response.userApproximateCity,
                            userLocation: null,
                            userAddress: null,
                        })
                        this.setState({ center: response.approximateLocation.split(",") })
                    })
            })
    }
    render() {
        const { userLocation, userName } = this.context.dataUser
        const { center, dataPeople } = this.state
        return (
            <Map
                style={ { height: "100%" } }
                center={ center }
                zoom={ (userLocation === null) ? "12" : "17" }
                maxZoom="19"
                ref={ (map) => { this.leafleMap = map } }
            >
                <TileLayer
                    attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
                    url={ "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }
                />
                {
                    (dataPeople === undefined)
                        ? null
                        : (
                            dataPeople.map((data, index) => {
                                const icon = L.icon({
                                    iconUrl: process.env.PUBLIC_URL + `/imageProfil/${data.id}/${data.picture}`,
                                    iconSize: [30, 30],
                                })
                                let position
                                if (data.userLocation === null) {
                                    position = data.userApproximateLocation.split(",")
                                } else {
                                    position = data.userLocation.split(", ")
                                }
                                return (
                                    (data.userName === userName)
                                        ? (
                                            <Marker icon={ icon } key={ `dataPeople-${index}` } position={ center }>
                                                <Popup>
                                                    You are here !
                                                </Popup>
                                            </Marker>
                                        )
                                        : (
                                            <Marker icon={ icon } key={ `dataPeople-${index}` } position={ position }>
                                                <Popup>
                                                    <div style={ { whiteSpace: "pre-wrap" } } onClick={ () => this.onClick(data) }>
                                                        { `Username: ${data.userName}\nAge: ${data.age}\nBiography: ${data.biography}` }
                                                    </div>
                                                </Popup>
                                            </Marker>
                                        )
                                )
                            })
                        )
                }
                <Control position="bottomright">
                    <button onClick={ () => this.geolocate() }><IoMdLocate /></button>
                </Control>
            </Map>
        )
    }
}
export default withRouter(MapComp)
