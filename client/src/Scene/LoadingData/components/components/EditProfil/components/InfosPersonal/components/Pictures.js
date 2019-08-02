import React, { Component } from "react"
//import PropTypes from "prop-types"

import { withStyles } from "@material-ui/core/styles"
import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"

import { getPicturesUser } from "utils/fileProvider"

const styles = (theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    pictures: {
        borderRadius: 10,
        border: "10px dashed red",
    },
})

class Pictures extends Component {

    constructor(props) {
        super(props)
        this.state = {
            picturesFiles: [
                { file: "", imagePreviewUrl: "" },
                { file: "", imagePreviewUrl: "" },
                { file: "", imagePreviewUrl: "" },
                { file: "", imagePreviewUrl: "" },
                { file: "", imagePreviewUrl: "" },
            ],
            pictureArray: [],
        }
    }

    componentWillMount() {
        const { userId } = this.props
        this.getPictures(userId)
    }

    getPictures = (userId) => {
        getPicturesUser(userId)
            .then((response) => {
                this.setState({
                    ...this.state,
                    picturesArray: response.pictures,
                })
            })
            .catch((error) => console.log(error))
    }

    handleSubmit = (e, index) => {
        e.preventDefault()
        const { userId, userName } = this.props
        const { picturesFiles, picturesArray } = this.state
        if (picturesFiles[index].file.type !== "image/jpeg" &&  picturesFiles[index].file.type !== "image/png"
            && picturesFiles[index].file.type !== "image/jpg") {
            alert("Sorry, only files jpeg, jpg and png are allowed")
            return
        }
        if (picturesFiles[index].imagePreviewUrl) {
            fetch("http://localhost:4000/users/editProfil/sendPictures", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    id: (picturesArray.length >= 5 || picturesArray[index]) ? picturesArray[index].id : null,
                    userId,
                    dataPicture: picturesFiles[index].imagePreviewUrl,
                    requestId: (picturesArray.length >= 5 || picturesArray[index]) ? true : false,
                    namePicture: picturesFiles[index].file.name,
                    userName,
                })
            }).then(() => this.getPictures(userId)).catch((error) => console.log(error))
        }
    }

    handleImageChange = (e, index) => {
        e.preventDefault()
        const reader = new FileReader()
        const file = e.target.files[0]
        reader.onloadend = () => {
            const { picturesFiles } = this.state
            picturesFiles[index].file = file
            picturesFiles[index].imagePreviewUrl = reader.result
            this.setState({ ...this.state, picturesFiles })
        }
        if (file) {
            reader.readAsDataURL(file)
        }
    }

    render() {
        const { picturesArray } = this.state
        if (picturesArray === undefined) {
            return <div />
        }
        const { userId, classes } = this.props
        const picturesDataArray = []
        for (let i = 0; i < 5; i++) {
            if (picturesArray[i] === undefined) {
                picturesDataArray.push(null)
            } else {
                picturesDataArray.push(picturesArray[i])
            }
        }
        return (
            <div>
                    {
                        picturesDataArray.map((pictureData, index) => (
                            <div style={{ display: 'inline-flex'}} key={ `pic-${index}` }>
                                {
                                    (pictureData !== null)
                                        ? (
                                            <img
                                                alt={ `pictureData-${index}` }
                                                src={ process.env.PUBLIC_URL + `/imageProfil/${userId}/${pictureData.picture}` }
                                                style={ { width: 400, height: 300, objectFit: 'cover' } }
                                            />
                                        )
                                        : <div style={ styles.pictures } />
                                }
                                <input
                                    type="file"
                                    onChange={ (e) => this.handleImageChange(e, index) }
                                />
                                <button
                                    onClick={ (e) => this.handleSubmit(e, index) }
                                >
                                    Upload Image
                                </button>
                            </div>
                        ))
                    }
            </div>
        )
    }

}

//Pictures.propTypes = {}

export default withStyles(styles)(Pictures)
