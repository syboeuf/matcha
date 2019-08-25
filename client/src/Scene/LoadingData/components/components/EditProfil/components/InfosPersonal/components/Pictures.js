import React, { Component } from "react"
import { UserConsumer } from "store/UserProvider"

import { withStyles } from "@material-ui/core/styles"

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

    static contextType = UserConsumer

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
        const { dataUser } = this.context
        this.setState({ picturesArray: { ...dataUser.pictures } })
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
            let newPicturesArray = picturesArray
            newPicturesArray = {
                ...newPicturesArray,
                [index]: {
                    id: (picturesArray.length >= 5 || picturesArray[index]) ? picturesArray[index].id : null,
                    userId,
                    picture: picturesFiles[index].file.name,
                },
            }
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
            })
            .then(() => {
                const { dataUser, setNewDataUser } = this.context
                setNewDataUser({ ...dataUser, pictures: newPicturesArray })
                this.setState({ picturesArray: { ...newPicturesArray } })
            })
            .catch((error) => console.log(error))
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
            this.handleSubmit(e, index)
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
        const picturesDataArray = []
        for (let i = 0; i < 5; i++) {
            if (picturesArray[i] === undefined) {
                picturesDataArray.push(null)
            } else {
                picturesDataArray.push(picturesArray[i])
            }
        }
        return (
            <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                    {
                        picturesDataArray.map((pictureData, index) => (
                            <div key={ `pic-${index}` }>
                                {
                                    (pictureData !== null)
                                        ? (
                                            <img
                                                alt={ `pictureData-${index}` }
                                                src={ process.env.PUBLIC_URL + `/imageProfil/${pictureData.userId}/${pictureData.picture}` }
                                                style={ { width: 400, height: 300, objectFit: 'cover' } }
                                                onClick={ () => document.getElementById(`pic-${index}`).click() }
                                            />
                                        )
                                        : <div style={ styles.pictures } />
                                }
                                <input
                                    id={ `pic-${index}` }
                                    type="file"
                                    onChange={ (e) => this.handleImageChange(e, index) }
                                    style={{ display: 'none' }}
                                />
                            </div>
                        ))
                    }
            </div>
        )
    }

}

//Pictures.propTypes = {}

export default withStyles(styles)(Pictures)
