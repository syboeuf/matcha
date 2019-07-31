import React, { Component } from "react"
import L from "leaflet"
import * as ELG from "esri-leaflet-geocoder"
import {
    Map, TileLayer, Marker, Popup,
} from "react-leaflet"
import { withRouter } from "react-router-dom"

import { setNewLocation, getDataPeople, visitProfil } from "utils/fileProvider"

/*
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png",
    iconUrl: process.env.PUBLIC_URL + `/imageProfil/128/CD.jpg`,
    shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
})
*/

class MapComp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            center: [48.866667, 2.33333],
            dataPeople: undefined,
        }
    }

    componentWillMount() {
       this.findLocation(this.props)
       getDataPeople()
        .then((response) => this.setState({ dataPeople: response.dataPeople }))
        .catch((error) => console.log(error))
    }

    componentDidMount() {
        const { updateDataUser, infosUser } = this.props
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
                        updateDataUser({ ...infosUser, userLocation })
                        setNewLocation(infosUser.userName, `${data.results[i].latlng.lat}, ${data.results[i].latlng.lng}`, data.results[i].text)
                    })
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        const { userLocation, userApproximateCity } = nextProps.infosUser
        if (this.props.infosUser.userLocation !== userLocation || this.props.infosUser.userApproximateCity !== userApproximateCity) {
            this.findLocation(nextProps)
        }
    }

    findLocation = (location) => {
        const { userLocation, userApproximateLocation } = location.infosUser
        let coords
        if (userLocation === null) {
            coords = userApproximateLocation.split(", ")
        } else {
            coords = userLocation.split(", ")
        }
        this.setState({ center: coords })
    }

    onClick = (data) => {
        const { history, infosUser } = this.props
        visitProfil(infosUser.userName, data.userName)
        history.push("/InfosPerson", { dataPerson: data })
    }

    render() {
        const { infosUser } = this.props
        const { userLocation, userName } = infosUser
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
                                    position = data.userApproximateLocation.split(", ")
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
                <div className="pointer" />
            </Map>
        )
    }

}

export default withRouter(MapComp)
