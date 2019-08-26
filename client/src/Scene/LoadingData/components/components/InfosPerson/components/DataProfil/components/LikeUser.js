import React, { Component } from "react"
import { UserConsumer } from "store/UserProvider"
import Swal from 'sweetalert2'

import { withStyles } from "@material-ui/core/styles"

import {
    getPicturesUser, checkLike, deleteMatch, insertMatch,
} from "utils/fileProvider"

const styles = {
    blueBtnDisabled: {
        width: '100%',
        padding: '20px',
        backgroundColor: 'transparent',
        border: '1px solid #4A90E2',
        borderRadius: '5px',
        color: '#4A90E2',
        transition: 'background-color .2s ease-out',
        marginTop: 10,
        marginBottom: 10,
        fontSize: '1em',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    blueBtnEnabled: {
        width: '100%',
        padding: '20px',
        backgroundColor: '#4A90E2',
        border: '1px solid #4A90E2',
        borderRadius: '5px',
        color: 'white',
        transition: 'background-color .2s ease-out',
        marginTop: 10,
        marginBottom: 10,
        fontSize: '1em',
        '&:hover': {
            cursor: 'pointer'
        }
    }
}

class LikeUser extends Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        this.state = {
            isLikable: false,
            like: false
        }
    }

    componentWillMount() {
        const { id, user, profilName } = this.props
        const { socket } = this.context
        socket.on("SEND_LIKE", this.sendLike)
        this.getImages(id)
        checkLike(user, profilName)
            .then((res) => {
                if (res.like) { this.setState({ like: true }) }
            })
            .catch((error) => console.log(error))
    }

    componentWillReceiveProps(nextProps) {
        const { id } = nextProps
        if (this.props.id !== id) {
            this.getImages(id)
        }
    }

    componentWillUnmount() {
        const { socket } = this.context
        socket.off("SEND_LIKE")
    }

    sendLike = (response) => {
        const { user, profilName } = this.props
        const { socket } = this.context
        if (response === 1) {
            insertMatch(user, profilName)
            Swal.fire(
                'This is a match !',
                'You are now able to discuss with this user',
                'success'
            )
            socket.emit("NOTIFICATIONS_SENT", { reciever: profilName, notification: `${user} like you and you like hit so this is a match !!!` })
        } else if (response === -1) {
            deleteMatch(user, profilName)
        }
    }

    getImages = (id) => {
        getPicturesUser(id)
            .then((response) => {
                if (response.pictures.length > 0) {
                    this.setState({ isLikable: true })
                }
            })
            .catch((error) => console.log(error))
    }

    toggleLike = () => {
        const { user, profilName } = this.props
        const { socket } = this.context
        const { isLikable, like } = this.state
        this.setState({ like: !this.state.like })

        if (!like && isLikable) {
            socket.emit("SEND_LIKE", { reciever: profilName, sender: user, valueLike: 1 })
            socket.emit("NOTIFICATIONS_SENT", { reciever: profilName, notification: `${user} like you` })
        }
        else if (like && isLikable) {
            socket.emit("SEND_LIKE", { reciever: profilName, sender: user, valueLike: -1 })
            socket.emit("NOTIFICATIONS_SENT", { reciever: profilName, notification: `${user} unlike you` })
        }
    }

    render() {
        const { classes, likeUser } = this.props
        return (
            <div>
                {
                    (likeUser !== undefined)
                        ? (
                            <div>
                                {
                                    (likeUser === 1)
                                        ?
                                            <div style={{
                                                marginTop: 15,
                                                marginBottom: 15,
                                                textAlign: 'center',
                                                backgroundColor: '#4A90E2',
                                                padding: 15,
                                                color: 'white',
                                                borderRadius: 10
                                            }}>
                                                This user liked your profile
                                            </div>
                                        :
                                            <div style={{
                                                marginTop: 15,
                                                marginBottom: 15,
                                                textAlign: 'center',
                                                backgroundColor: 'black',
                                                padding: 15,
                                                color: 'white',
                                                borderRadius: 10
                                            }}>
                                                This user unliked your profile
                                            </div>
                                }
                            </div>
                        )
                        : null
                }
                <button className={ this.state.like ? classes.blueBtnEnabled : classes.blueBtnDisabled } onClick={ () => this.toggleLike() }>Like this user</button>
            </div>
        )
    }

}

export default (withStyles(styles)(LikeUser))
