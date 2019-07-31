import React, { Component } from "react"
// import PropTypes from "prop-types"
import Biography from "./components/Biography"
import ListInterest from "./components/ListInterest"
import Orientation from "./components/Orientation"
import Gender from "./components/Gender"
import Pictures from "./components/Pictures"
import Map from "./components/Map"
import Modal from "@material-ui/core/Modal"
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
    }
    handleClose = () => {
        this.setState({ openMap: false })
    }
    render() {
        const { infosUser, updateDataUser } = this.props
        const { userName, id } = infosUser
        const { infosPersonalUser, openMap } = this.state
        const {
            orientation, gender, biography, listInterest,
        } = infosPersonalUser
        return (
            <div>
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
                <ListInterest
                    onChangeValue={ this.updateListInterest }
                    list={ listInterest }
                />
                <Pictures
                    userId={ id }
                    userName={ userName }
                />
                <button onClick={ () => this.setState({ openMap: true }) }>Open map</button>
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
                <button onClick={ () => this.onClick(infosPersonalUser, userName) }>Save</button>
            </div>
        )
    }
}
// InfosPersonal.propTypes = {}
export default InfosPersonal
