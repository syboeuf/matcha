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
        const { dataUser } = this.context
        const { history } = this.props
        return (
            <div>Home</div>
        )
    }

}
 
export default Home
