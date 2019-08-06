import React, { Component } from "react"

import { getImageProfil } from "utils/fileProvider"

import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

const styles = theme => ({
    card: {
        width: 400,
        height: 300,
        boxShadow: '0px 5px 10px rgba(0, 0, 0, .1)',
        transition: 'all .5s ease',
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
            <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
                <div className={ classes.card }>
                    <img
                        onClick={ () => chooseDataPerson(data) }
                        src={ process.env.PUBLIC_URL + pathImageProfil }
                        className={ classes.imageCard}
                        title="Image profile"
                    />
                    <div style={ { textAlign: "center" } }>
                        { userName }
                    </div>
                </div>
            </Grid>
        )
    }

}

export default withStyles(styles)(PreviewProfil)
