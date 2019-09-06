import React, { Component } from "react"
import { withRouter } from "react-router-dom"

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

    onClick = (id, profilName) => {
        const { history, userName } = this.props
        history.push("/InfosPerson", { data: { id, userName, profilName } })
    }

    render() {
        const { listOfPerson, listOfNotif } = this.state
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', padding: 30 }}>
                <div className="center" style={{ width: '40%' }}>
                    {
                        listOfNotif.map((notif, index) => (
                            <p key={ `notif-${index}` }>{ notif.notificationType }</p>
                        ))
                    }
                </div>
                <div className="center" style={{ display: 'flex', flexWrap: 'wrap', width: '45%'}}>
                    {
                        listOfPerson.map((person, index) => (
                            (person.likeUser === 1)
                                ? (
                                    <div onClick={ () => this.onClick(person.id, person.userName) } className="col" style={{textAlign: 'center', margin: 10}} key={ `person-${index}` }>
                                        <img
                                            alt="picProfil"
                                            style={ { width: 100, height: 100, objectFit: 'cover', borderRadius: '50%' } }
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

export default withRouter(PersonLikeYou)
