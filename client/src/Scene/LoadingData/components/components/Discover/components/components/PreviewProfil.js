import React from "react"

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

const PreviewProfil = ({ data, chooseDataPerson, classes }) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: 'auto', marginRight: 'auto' }}>
        <div className={ classes.card }>
            <img
                onClick={ () => chooseDataPerson(data) }
                src={ process.env.PUBLIC_URL + `/imageProfil/${data.id}/${data.picture}` }
                className={ classes.imageCard }
                title="Image profile"
                alt="ProfilPic"
            />
            <div style={ { textAlign: "center" } }>
                { data.userName }
            </div>
        </div>
    </div>
)

export default withStyles(styles)(PreviewProfil)
