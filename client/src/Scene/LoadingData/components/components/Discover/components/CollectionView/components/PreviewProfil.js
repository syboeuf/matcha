import React, { Component } from "react"

import { getImageProfil } from "utils/fileProvider"

import { Container, Row, Col, Button, Media } from "reactstrap"

const styles = {
    image: {
        width: 200,
        height: 200
    },
    noImage: {
        width: 200,
        height: 200,
        border: "1px dashed red",
    }
}

class PreviewProfil extends Component {

    constructor(props) {
        super(props)
        this.state = {
            imageProfil: null,
        }
    }

    componentWillMount() {
        const { id } = this.props.data
        getImageProfil(id)
            .then((response) => {
                if (response.imageProfil.length > 0) {
                    if (response.imageProfil[0].picture.length > 0) {
                        this.setState({ imageProfil: response.imageProfil[0].picture })
                    }
                }
            })
            .catch((error) => console.log(error))
    }

    render() {
        const { data, chooseDataPerson } = this.props
        const { userName } = data
        const { imageProfil } = this.state
        return (
            <Container fluid>
                <Row>
                    {
                        (imageProfil === null)
                            ? (
                                <div onClick={ () => chooseDataPerson(data) }>
                                    <div style={ styles.noImage }></div>
                                    <p>{ userName }</p>
                                </div>
                            )
                            : (
                                <div onClick={ () => chooseDataPerson(data) }>
                                    <img
                                        style={ styles.image }
                                        src={ process.env.PUBLIC_URL + `/imageProfil/${data.id}/${imageProfil}` }
                                        alt={ `Imageprofil-${userName}` }
                                    />
                                    <p>{ userName }</p>
                                </div>
                            )
                    }
                </Row>
            </Container>
        )
    }

}

export default PreviewProfil
