import React, { Component } from "react"

import { UserConsumer } from "store/UserProvider"

class Home extends Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        this.state = {
            loadGeolocalistationSuccess: false,
            loadGeolocalistationApproximateSuccess: false,
        }
        this.mounted = true
    }

    render() {
        return (
            <div>Home</div>
        )
    }

}
 
export default Home
