import React from "react"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

import { getImageProfil } from "utils/fileProvider"

import { withStyles } from "@material-ui/core/styles"

const styles = {
    popularityBar: {
        width: '90%',
        backgroundColor: '#ddd',
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    popularityProgress: {
        width: '90%',
        backgroundColor: '#4A90E2',
        borderRadius: 15,
        padding: '5px 0px 5px 10px'
    },
    popularityScore: {
        textAlign: 'right',
        color: 'white',
        paddingRight: 10
    },
    profileBio: {
        boxShadow: '0px 0px 5px rgba(0, 0, 0, .2)',
        borderRadius: 10,
        marginTop: 15,
        padding: 30,
        wordBreak: 'break-word'
    },
    profilePic: {
        width: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    }
}

class DataPersonal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            profilePic: 'noImage.png'
        }
    }

    componentWillMount() {
        getImageProfil(this.props.dataPersonal.id)
            .then((res) => {
                this.setState({ profilePic: process.env.PUBLIC_URL + `/imageProfil/${this.props.dataPersonal.id}/${res.imageProfil[0].picture}` })
            })
            .catch((err) => console.log(err))
    }
    
    render() {
        const { classes, dataPersonal } = this.props
        const { biography, populareScore, id } = dataPersonal
        
        return (
            <div style={{ textAlign: 'center' }}>
                <img
                    className={ classes.profilePic }
                    src={ this.state.profilePic }
                />
                <div style={ styles.popularityBar }>
                    <div style={{ ...styles.popularityProgress, ...styles.popularityScore, width: `${populareScore}%` }}>{ populareScore }%</div>
                </div>
                <Typography variant="h5" component="h3">
                    About
                </Typography>
                <div style={ styles.profileBio }>
                    { biography }
                </div>
            </div>
        )
    }
}

export default (withStyles(styles)(DataPersonal))
