import React, { Component } from "react"

import { getImageProfil } from "utils/fileProvider"

import { withStyles } from "@material-ui/core/styles"

const styles = () => ({
    card: {
        width: 400,
        height: 300,
        boxShadow: '0px 5px 10px rgba(0, 0, 0, .1)',
        transition: 'all .5s ease',
        backgroundColor: 'white',
        marginBottom: 30,
        '&:hover': {
            transform: 'scale(1.1)',
            cursor: 'pointer'
        }
    },
    imageCard: {
        width: '100%',
        height: '85%',
        objectFit: 'cover',
    },
})

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
        const { data, chooseDataPerson, classes } = this.props
        const { userName } = data
        const { imageProfil } = this.state
        const pathImageProfil = (imageProfil === null) ? "noImage.png" : `/imageProfil/${data.id}/${imageProfil}`
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: 'auto', marginRight: 'auto' }}>
                <div className={ classes.card }>
                    <img
                        onClick={ () => chooseDataPerson(data) }
                        src={ process.env.PUBLIC_URL + pathImageProfil }
                        className={ classes.imageCard}
                        title="Image profile"
                        alt="ProfilPic"
                    />
                    <div style={ { textAlign: "center" } }>
                        { userName }
                    </div>
                </div>
            </div>
        )
    }

}

export default withStyles(styles)(PreviewProfil)
