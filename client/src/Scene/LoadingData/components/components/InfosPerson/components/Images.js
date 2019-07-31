import React, { Component } from "react"

import CarouselProfil2 from "components/CarouselProfil2"

import { getPicturesUser } from "utils/fileProvider"

class Images extends Component {

    constructor(props) {
        super(props)
        this.state = { imagesArray: null }
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
                <CarouselProfil2 pictureProfil={ imagesArray } />
            </div>
        )
    }

}

export default Images
