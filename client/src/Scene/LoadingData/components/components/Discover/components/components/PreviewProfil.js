import React, { Component } from "react"

import { getImageProfil } from "utils/fileProvider"

import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

const styles = theme => ({
    icon: { marginRight: theme.spacing(2) },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: { marginTop: theme.spacing(4) },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    cardMedia: { paddingTop: "56.25%" }, // 16:9
    cardContent: { flexGrow: 1 },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
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
                <Card className={ classes.card }>
                    <CardMedia
                        onClick={ () => chooseDataPerson(data) }
                        className={ classes.cardMedia }
                        image={ process.env.PUBLIC_URL + pathImageProfil }
                        title="Image profile"
                    />
                    <Typography style={ { textAlign: "center" } } gutterBottom variant="h5" component="h2">
                        { userName }
                    </Typography>
                </Card>
            </Grid>
        )
    }

}

export default withStyles(styles)(PreviewProfil)