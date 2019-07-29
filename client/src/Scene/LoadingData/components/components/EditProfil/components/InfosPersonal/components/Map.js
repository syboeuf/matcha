import React, { Component } from "react"
import L from "leaflet"
import * as ELG from "esri-leaflet-geocoder"
import {
    Map, TileLayer, Marker, Popup,
} from "react-leaflet"
import { withRouter } from "react-router-dom"

import { setNewLocation, getDataPeople } from "utils/fileProvider"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png",
    iconUrl: process.env.PUBLIC_URL + `/imageProfil/128/CD.jpg`,
    shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
})

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
        const { userName } = this.props
        const { center } = this.state
        const map = this.leafleMap.leafletElement
        const searchControl = new ELG.Geosearch({
            useMapBounds: false,
            position: "topright",
            collapseAfterResult: false,
            expanded: true,
        }).addTo(map)
        // results.addLayer(L.marker({ lat: center[0], lng: center[1] }))
        const results = new L.LayerGroup().addTo(map)
        searchControl.on("results", (data) => {
            results.clearLayers()
            for (let i = data.results.length - 1; i >= 0; i--) {
                results.addLayer(L.marker(data.results[i].latlng))
                setNewLocation(userName, `${data.results[i].latlng.lat}, ${data.results[i].latlng.lng}`, data.results[i].text)
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        const { userLocation, userApproximateCity } = nextProps
        if (this.props.userLocation !== userLocation || this.props.userApproximateCity !== userApproximateCity) {
            this.findLocation(nextProps)
        }
    }

    findLocation = (location) => {
        const { userLocation, userApproximateLocation } = location
        let coords
        if (userLocation === null) {
            coords = userApproximateLocation.split(", ")
        } else {
            coords = userLocation.split(", ")
        }
        this.setState({ center: coords })
    }



    render() {
        const { userLocation, history } = this.props
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
                                const greenIcon = L.icon({
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
                                    <Marker icon={ greenIcon } key={ `dataPeople-${index}` } position={ position }>
                                        <Popup>
                                            <span onClick={ () => {
                                                history.push("/InfosPerson", { dataPerson: data })
                                            } }>{ data.userName }</span>
                                        </Popup>
                                    </Marker>
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
