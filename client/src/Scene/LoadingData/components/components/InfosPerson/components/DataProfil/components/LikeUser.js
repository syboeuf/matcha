import React, { Component } from "react"

import StyledButton from "components/StyledButton"

import { getPicturesUser, likeOrUnkikeUser } from "utils/fileProvider"

class LikeUser extends Component {

    constructor(props) {
        super(props)
        this.state = { isLikable: false }
    }

    componentWillMount() {
        const { id } = this.props
        this.getImages(id)
    }

    componentWillReceiveProps(nextProps) {
        const { id } = nextProps
        if (this.props.id !== id) {
            this.getImages(id)
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

    render() {
        const { likeUser, user, profilName } = this.props
        const { isLikable } = this.state
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
                <StyledButton
                    text="Like"
                    color="primary"
                    functionOnClick={ (isLikable === true) ? () => likeOrUnkikeUser(user, profilName, 1) : null }
                />
                <StyledButton
                    text="Unlike"
                    color="primary"
                    functionOnClick={ (isLikable === true) ? () => likeOrUnkikeUser(user, profilName, -1) : null }
                />
            </div>
        )
    }

}

export default LikeUser
