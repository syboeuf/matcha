import React, { Component } from "react"

import CarouselProfil from "components/CarouselProfil"

import { getPicturesUser } from "utils/fileProvider"

class Images extends Component {

    constructor(props) {
        super(props)
        this.state = {
            imagesArray: null,
        }
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
                this.setState({ imagesArray: response.pictures })
            })
            .catch((error) => console.log(error))
    }

    render() {
        const { imagesArray } = this.state
        if (imagesArray === null) {
            return <div />
        }
        return (
            <div>
                {/*
                    imagesArray.map((image, index) => (
                        <img
                            key={ `image-${index}` }
                            style={
                                {
                                    width: (index === 0) ? 200 : 100,
                                    height: (index === 0) ? 200 : 100,
                                }
                            }
                            src={ process.env.PUBLIC_URL + `/imageProfil/${image.userId}/${image.picture}` }
                            alt={ `PhotoProfil-${index}` }
                        />
                    ))
                */}
                <CarouselProfil pictureProfil={ imagesArray } />
            </div>
        )
    }

}

export default Images
