import React, { Component } from "react"
// import PropTypes from "prop-types"
import Biography from "./components/Biography"
import ListInterest from "./components/ListInterest"
import Orientation from "./components/Orientation"
import Gender from "./components/Gender"
import Pictures from "./components/Pictures"
import Map from "./components/Map"
import { withStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Swal from "sweetalert2"
import { updateInfosPersonal } from "utils/fileProvider"
const styles = {
    modal: {
        position: "absolute",
        left: "25%",
        bottom: "25%",
        top: "25%",
        right: "25%",
        margin: "auto",
        background: "white",
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
    }
}
class InfosPersonal extends Component {
    constructor(props) {
        super(props)
        this.state = { infosPersonalUser: {}, openMap: false }
    }
    componentWillMount() {
        const { infosUser } = this.props
        this.setState({ infosPersonalUser: { ...infosUser } })
    }
    onChangeValue = (e, option) => {
        this.setState({
            ...this.state,
            infosPersonalUser: {
                ...this.state.infosPersonalUser,
                [option]: e.target.value,
            },
        })
    }
    updateListInterest = (newlistInterest) => {
        this.setState({
            ...this.state,
            infosPersonalUser: {
                ...this.state.infosPersonalUser,
                listInterest: newlistInterest,
            },
        })
    }
    onClick = (infosPersonalUser, userName) => {
        const { updateDataUser } = this.props
        updateInfosPersonal({ ...infosPersonalUser, userName })
        updateDataUser(infosPersonalUser)
        Swal.fire(
            'Informations updated',
            'You succesfully updated your personal informations',
            'success'
        )
    }
    handleClose = () => {
        this.setState({ openMap: false })
    }
    render() {
        const { classes, infosUser, updateDataUser } = this.props
        const { userName, id } = infosUser
        const { infosPersonalUser, openMap } = this.state
        const {
            orientation, gender, biography, listInterest,
        } = infosPersonalUser
        return (
            <div>
                <div style={{ display: 'flex', float: 'right' }}>
                    <Orientation
                        onChangeValue={ this.onChangeValue }
                        optionChecked={ orientation }
                    />
                    <Gender
                        onChangeValue={ this.onChangeValue }
                        optionChecked={ gender }
                    />
                    <Biography
                        onChangeValue={ this.onChangeValue }
                        value={ biography }
                    />
                    <button className={ classes.blueBtn } onClick={ () => this.onClick(infosPersonalUser, userName) }>Save</button>
                    <button className={ classes.blueBtn } onClick={ () => this.setState({ openMap: true }) }>Open map</button>
                </div>
                <ListInterest
                    onChangeValue={ this.updateListInterest }
                    list={ listInterest }
                />
                <Pictures
                    userId={ id }
                    userName={ userName }
                />
                <Modal
                    aria-labelledby="modal-map"
                    aria-describedby="simple-modal-map"
                    open={ openMap }
                    onClose={ this.handleClose }
                >
                    <div style={ styles.modal }>
                        <Map
                            updateDataUser={ updateDataUser }
                            infosUser={ infosUser }
                        />
                    </div>
                </Modal>
            </div>
        )
    }
}
// InfosPersonal.propTypes = {}
export default (withStyles(styles)(InfosPersonal))
