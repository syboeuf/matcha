import React, { Component } from "react"

import CarouselProfil from "components/CarouselProfil"

import { getPicturesUser } from "utils/fileProvider"

class Images extends Component {

    constructor(props) {
        super(props)
        this.state = { imagesArray: null, width: 0, resizeOn: false }
        this.selector = React.createRef()
        this.doit = null
    }

    componentWillMount() {
        const { id } = this.props
        this.getImages(id)
    }

    componentDidMount() {
        this.getWidth()
        window.addEventListener("resize", this.getWidth)
    }

    componentWillReceiveProps(nextProps) {
        const { id } = nextProps
        if (this.props.id !== id) {
            this.getImages(id)
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.getWidth)
    }

    getWidth = () => {
        clearTimeout(this.doit);
        this.doit = setTimeout(() => { this.resizeEnd() }, 200);
        this.setState({ width: this.selector.current.getBoundingClientRect().width, resizeOn: true })
    }

    resizeEnd = () => {
        this.setState({ resizeOn: false })
    }

    getImages = (id) => {
        getPicturesUser(id)
            .then((response) => {
                this.setState({ imagesArray: response.pictures })
            })
            .catch((error) => console.log(error))
    }

    render() {
        const { imagesArray, width, resizeOn } = this.state
        return (
            <div ref={ this.selector }>
                <CarouselProfil pictureProfil={ imagesArray } widthPicture={ width } resize={ resizeOn } />
            </div>
        )
    }

}

export default Images
