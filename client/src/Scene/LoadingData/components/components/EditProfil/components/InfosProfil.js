import React, { Component } from "react"
// import PropTypes from "prop-types"

import { updateInfosProfil, verifyPassword } from "utils/fileProvider"
import { checkEmail, checkPassword } from "utils/utils"

import Form from "components/Form"
import Swal from "sweetalert2"

import { withStyles } from "@material-ui/core/styles"

import { UserConsumer } from "store/UserProvider";

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
                { name: "lastName", type: "text", value: lastName, placeholder: "Last name" },
                { name: "firstName", type: "text", value: firstName, placeholder: "First name" },
                { name: "userName", type: "text", value: userName, placeholder: "Username" },
                { name: "age", type: "number", value: (age === null) ? "" : age, placeholder: "Age" },
                { name: "newPassword", type: "password", value: "", placeholder: "New password" },
                { name: "email", type: "email", value: email, placeholder: "Email" },
            ],
            profilePic: 'noImage.png'
        }
    }

    onClick = async(id, userName, inputArray) => {
        const { updateDataUser, infosUser } = this.props
        let newDataUser = { ...infosUser }
        let check = false
        inputArray.forEach((data) => {
            if (data.name !== "newPassword" && data.name !== "email" && data.value.toString().trim() === "") {
                check = true;
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: `${data.name} is empty`,
                })
            }
            newDataUser = {
                ...newDataUser,
                [data.name]: data.value,
            }
        })
          if (!check) {
            if (checkEmail(newDataUser.email)) {
                if (checkPassword(newDataUser.newPassword) || newDataUser.newPassword.trim() === '') {
                    const {value: password} = await Swal.fire({
                        title: 'Please confirm with your current password',
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
                                if (res.success) {
                                    if (newDataUser.newPassword.trim() === '') {
                                        newDataUser.newPassword = password
                                    }
                                    updateInfosProfil(id, userName, newDataUser)
                                        .then((response) => {
                                            if (response === 1) {
                                                const { socket } = this.context
                                                socket.emit("USERNAME_UPDATED", { newUserName: newDataUser.userName })
                                                updateDataUser(newDataUser)
                                                Swal.fire(
                                                    'Informations updated',
                                                    'You succesfully updated your personal informations',
                                                    'success'
                                                )
                                            }
                                            else if (response === 2) {
                                                Swal.fire({
                                                    type: 'error',
                                                    title: 'Oops...',
                                                    text: 'Email is invalid',
                                                })
                                            }
                                            else if (response === 3) {
                                                Swal.fire({
                                                    type: 'error',
                                                    title: 'Oops...',
                                                    text: 'Password is not secure',
                                                })
                                            } else if (response === 4) {
                                                Swal.fire({
                                                    type: 'error',
                                                    title: 'Oops...',
                                                    text: 'Invalid age',
                                                })
                                            }
                                            else {
                                                Swal.fire({
                                                    type: 'error',
                                                    title: 'Oops...',
                                                    text: 'Username or email already in use',
                                                })
                                            }
                                        })
                                        .catch((error) => console.log(error))
                                    Swal.fire('Informations updated')
                                }
                                else {
                                    Swal.fire('Password invalid')
                                }
                            })
                            .catch((err) => console.log(err))
                      }
                } else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Password is not secure',
                    })
                }
              } else {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Email is invalid',
                })
              }
          }
    }

    onChangeValue = (e, index) => {
        const { inputArray } = this.state
        inputArray[index].value = e.target.value
        this.setState({ inputArray })
    }

    render() {
        const { classes } = this.props
        const { id, userName, populareScore, pictures } = this.props.infosUser
        const { inputArray } = this.state
        return (
            <div style={{ textAlign: 'center' }}>
                <img
                    className={ classes.profilePic }
                    alt="imgProfil"
                    src={ (pictures.length === 0) ? process.env.PUBLIC_URL + "noImage.png" : process.env.PUBLIC_URL + `/imageProfil/${pictures[0].userId}/${pictures[0].picture}` }
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
            </div>
        )
    }

}

InfosProfil.protoType = {}

export default (withStyles(styles)(InfosProfil))
