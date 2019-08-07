// import React, { Component } from "react"
// import { withRouter } from "react-router-dom"

// import Container from "@material-ui/core/Container"
// import Grid from "@material-ui/core/Grid"
// import ChatWithUser from "./components/ChatWithUser"
// import Avatar from "@material-ui/core/Avatar"
// import { withStyles } from "@material-ui/core/styles"

// import { getListMatch } from "utils/fileProvider"
// import { UserConsumer } from "store/UserProvider"

// const styles = {
//     avatar: {
//         width: 60,
//         height: 60,
//     },
//     match: {
//         padding: 20,
//         transition: 'all .6s ease',
//         '&:hover': {
//             backgroundColor: 'rgba(0, 0, 0, .05)',
//             cursor: 'pointer'
//         }
//     }
// }

// class Messages extends Component {

//     static contextType = UserConsumer

//     constructor(props) {
//         super(props)
//         this.state = {
//             listMatch: null,
//             profilYourMatch: null,
//         }
//     }

//     componentWillMount() {
//         const { dataUser } = this.context
//         getListMatch(dataUser.userName)
//             .then((list) => this.setState({ listMatch: list.listMatch }))
//             .catch((error) => console.log(error))
//     }

//     render() {
//         const { listMatch, profilYourMatch } = this.state
//         const { dataUser } = this.context
//         const { classes } = this.props
//         if (listMatch === null) {
//             return <div />
//         }
//         if (dataUser === undefined) {
//             return <div />
//         }
//         return (
//             <Container maxWidth="xl">
//                 <Grid container style={{ marginTop: 20 }}>
//                     <Grid item xs={ 12 } sm={ 4 }>
//                         <Grid direction="column" container style={{ boxShadow: '0px 5px 10px rgba(0, 0, 0, .1)' }}>
//                             {
//                                 listMatch.map((match) => (
//                                     <Grid item key={ `match-${match.person}` } xs={ 12 } sm={ 6 } className={ classes.match } onClick={ () => this.setState({ profilYourMatch: match.person }) }>
//                                         <Avatar alt={ `avatar${match.person}` } style={ styles.avatar } src={ process.env.PUBLIC_URL + `/imageProfil/${match.id}/${match.picture}` } />
//                                         { match.person }
//                                     </Grid>
//                                 ))
//                             }
//                         </Grid>
//                     </Grid>
//                     <Grid item xs={ 12 } sm={ 8 }>
//                         {
//                             (profilYourMatch !== null)
//                                 ? (
//                                     <ChatWithUser
//                                         userName={ dataUser.userName }
//                                         profilMatchName={ profilYourMatch }
//                                     />
//                                 )
//                                 : null
//                         }
//                     </Grid>
//                 </Grid>
//             </Container>
//         )
//     }

// }

// export default withRouter(withStyles(styles)(Messages))

import React, { Component } from "react"
import { withRouter } from "react-router-dom"

import { getListMatch, getAllMessages, sendMessage } from "utils/fileProvider"
import { UserConsumer } from "store/UserProvider"

import './Messages.css'

class Messages extends Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        this.state = {
            listMatch: null,
            profilYourMatch: null,
            listMessages: null,
            messageValue: ''
        }
        this.mounted = true
    }

    componentWillMount() {
        const { dataUser } = this.context
        getListMatch(dataUser.userName)
            .then((list) => this.setState({ listMatch: list.listMatch }))
            .catch((error) => console.log(error))
    }

    send = (messageValue) => {
        const { profilYourMatch } = this.state
        const userName = this.context.dataUser.userName
        if (messageValue.trim() !== '')
            sendMessage(userName, profilYourMatch, messageValue)
    }

    showAllMessages = () => {
        const { profilYourMatch } = this.state
        const userName = this.context.dataUser.userName
        getAllMessages(userName, profilYourMatch)
            .then((listMessages) => {
                if (this.mounted === true) {
                    this.setState({ listMessages: listMessages.results })
                }
            })
            .catch((error) => console.log(error))
    }

    render() {
        const { listMatch, profilYourMatch, listMessages, messageValue } = this.state
        const { dataUser } = this.context

        if (listMatch === null) { return <div /> }
        if (dataUser === undefined) { return <div /> }

        return (
            <div className="main-messages-container col center">
                <div className="discussions-chat-container row">
                    <div className="discussions-container col">
                        <span className="title row">Last Messages</span>
                        {
                            listMatch.map((match) => (
                                <div className="discussion row" onClick={ () => { this.setState({ profilYourMatch: match.person }); this.showAllMessages() } }>
                                    <img src={ process.env.PUBLIC_URL + `/imageProfil/${match.id}/${match.picture}` } alt={ `avatar-${match.person}` } />
                                    <div className="col">
                                        <span className="disc-name">{ match.person } - { match.age } ans</span>
                                        <span className="disc-last-message">This is the last message</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="chat-container col">
                        <div className="chat-sub-container col">
                            <span className="title row">Chat { profilYourMatch ? `- ${profilYourMatch}` : null }</span>
                            {
                                (profilYourMatch, listMessages) ? (
                                    listMessages.map((data) => (
                                        (data.fromUser === dataUser.userName)
                                        ? (
                                            <div className="chat-message sent right">
                                                <p>{ `${data.message}` }</p>
                                                <p>{ `Sent ${data.date}` }</p>
                                            </div>
                                        )
                                        : (
                                            <div className="chat-message received left">
                                                <p>{ `${data.message}` }</p>
                                                <p>{ `Sent ${data.date}` }</p>
                                            </div>
                                        )
                                    ))
                                )
                                : (
                                    <div>
                                        No discussion has been selected
                                    </div>
                                )
                            }
                        </div>
                        <input
                            className="message-input"
                            placeholder="Start a new message"
                            value={ messageValue }
                            onChange={ (e) => this.setState({ messageValue: e.target.value }) }
                        />
                        <button onClick={ () => this.send(messageValue) }>Send</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Messages)
