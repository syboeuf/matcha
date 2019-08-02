import React, { Component } from "react"
// import PropTypes from "prop-types"

import { UserConsumer } from "store/UserProvider"

import { updateInfosProfil, getImageProfil, verifyPassword } from "utils/fileProvider"

import Form from "components/Form"
import Swal from "sweetalert2"

import { withStyles } from "@material-ui/core/styles"

const styles = {
    profilePic: {
        width: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, .1)'
    },
    blueBtn: {
        padding: '20px',
        backgroundColor: 'transparent',
        border: '1px solid #4A90E2',
        borderRadius: '5px',
        color: '#4A90E2',
        transition: 'background-color .2s ease-out',
        marginTop: 10,
        marginBottom: 10,
        fontSize: '1em',
        textAlign: 'center',
        '&:hover': {
            transition: 'background-color .2s ease-in',
            backgroundColor: '#4A90E2',
            color: 'white',
            cursor: 'pointer'
        }
    },
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
}

class InfosProfil extends Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        const {
            lastName, firstName, userName, email, age,
        } = props.infosUser
        this.state = {
            inputArray: [
                { name: "lastName", type: "text", value: lastName, placeholder: "lastName" },
                { name: "firstName", type: "text", value: firstName, placeholder: "firstName" },
                { name: "userName", type: "text", value: userName, placeholder: "userName" },
                { name: "age", type: "number", value: (age === null) ? "" : age, placeholder: "age" },
                { name: "newPassword", type: "password", value: "", placeholder: "New password" },
                { name: "email", type: "email", value: email, placeholder: "email" },
            ],
            profilePic: 'noImage.png'
        }
    }
    
    componentWillMount() {
        getImageProfil(this.context.dataUser.id)
            .then((res) => {
                this.setState({ profilePic: process.env.PUBLIC_URL + `/imageProfil/${this.context.dataUser.id}/${res.imageProfil[0].picture}` })
            })
            .catch((err) => console.log(err))
    }

    onClick = (id, userName, inputArray) => {
        const { updateDataUser } = this.props
        let newDataUser = {}
        inputArray.forEach((data) => {
            newDataUser = {
                ...newDataUser,
                [data.name]: data.value,
            }
        })
        updateInfosProfil(id, userName, inputArray)
            .then((response) => {
                if (response === 1) {
                    updateDataUser(newDataUser)
                    Swal.fire(
                        'Informations updated',
                        'You succesfully updated your personal informations',
                        'success'
                    )
                } else {
                    alert("This username or email are already use !")
                }
            })
            .catch((error) => console.log(error))
    }

    async onClickTemp() {
        const { userName } = this.props.infosUser
        const {value: password} = await Swal.fire({
            title: 'Please confirm your password',
            input: 'password',
            inputPlaceholder: 'Enter your password',
            inputAttributes: {
              autocapitalize: 'off',
              autocorrect: 'off'
            }
          })

          if (password) {
            verifyPassword(userName, password)
                .then((res) => {
                    console.log(res)
                    if (res.success) {
                        Swal.fire('Informations updated')
                    }
                    else {
                        Swal.fire('Password invalid')
                    }
                })
                .catch((err) => console.log(err))
          }
    }

    onChangeValue = (e, index) => {
        const { inputArray } = this.state
        inputArray[index].value = e.target.value
        this.setState({ inputArray })
    }

    render() {
        const { classes } = this.props
        const { id, userName, populareScore } = this.props.infosUser
        const { inputArray } = this.state
        return (
            <div style={{ textAlign: 'center' }}>
                <img
                    className={ classes.profilePic }
                    src={ this.state.profilePic }
                />
                <div style={ styles.popularityBar }>
                    <div style={{ ...styles.popularityProgress, ...styles.popularityScore, width: `${populareScore}%` }}>{ populareScore }%</div>
                </div>
                <Form inputArray={ inputArray } onChangeValue={ this.onChangeValue } />
                <div
                    className={ classes.blueBtn }
                    onClick={ () => this.onClick(id, userName, inputArray) }
                >
                    Save
                </div>
                <div
                    className={ classes.blueBtn }
                    onClick={ () => this.onClickTemp() }
                >
                    Save test
                </div>

            </div>
        )
    }

}

InfosProfil.protoType = {}

export default (withStyles(styles)(InfosProfil))
