import React, { Component } from "react"

import { getListPersonLikeYou, getNotificationsNoRead } from "utils/fileProvider"

const limit = 10

class PersonLikeYou extends Component {

    constructor(props) {
        super(props)
        this.state = { listOfPerson: [], listOfNotif: [] }
    }

    componentWillMount() {
        const { userName } = this.props
        getListPersonLikeYou(userName)
            .then((response) => this.setState({ listOfPerson: response.list }))
            .catch((error) => console.log(error))
        getNotificationsNoRead(userName, limit)
            .then((response) => this.setState({ listOfNotif: response.notif }))
            .catch((error) => console.log(error))
    }

    render() {
        const { listOfPerson, listOfNotif } = this.state
        return (
            <div style={ { display: "flex" } }>
                <div>
                    {
                        listOfNotif.map((notif, index) => (
                            <p key={ `notif-${index}` }>{ notif.notificationType }</p>
                        ))
                    }
                </div>
                <div>
                    {
                        listOfPerson.map((person, index) => (
                            (person.likeUser === 1)
                                ? (
                                    <div key={ `person-${index}` }>
                                        <img
                                            alt="picProfil"
                                            style={ { width: 100, height: 100 } }
                                            src={ `${process.env.PUBLIC_URL}/imageProfil/${person.id}/${person.picture}` }
                                        />
                                        { person.userName }
                                    </div>
                                )
                                : null
                        ))
                    }
                </div>
            </div>
        )
    }

}

export default PersonLikeYou
