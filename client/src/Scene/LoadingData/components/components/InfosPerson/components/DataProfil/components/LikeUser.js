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
                                        ? `This user like you`
                                        : `This user unlike you`
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