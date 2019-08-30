import React, { Component } from "react"

import Images from "./components/Images"
import ProfilBar from "./components/ProfilBar"
import DataProfil from "./components/DataProfil"
import Interest from "./components/Interest"

import { withStyles } from "@material-ui/core/styles"

import { blockProfil, checkBlock, reportingFakeProfil } from "utils/fileProvider"

import { UserConsumer } from "store/UserProvider"

import Swal from "sweetalert2"

const styles = {
    redBtn: {
        width: '100%',
        padding: '20px',
        backgroundColor: 'transparent',
        border: '1px solid crimson',
        borderRadius: '5px',
        color: 'crimson',
        transition: 'background-color .2s ease-out',
        marginTop: 10,
        marginBottom: 10,
        fontSize: '1em',
        '&:hover': {
            transition: 'background-color .2s ease-in',
            backgroundColor: 'crimson',
            color: 'white',
            cursor: 'pointer'
        }
    }
}

class InfosPerson extends Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        this.state = {
            blocked: false,
            fake: false
        }
    }
    
    componentWillMount() {
        const { dataUser } = this.context
        console.log(dataUser)
        this.checkBlock()
    }

    checkBlock = () => {
        const { dataUser } = this.context
        const { dataPerson } = this.props.location.state
        checkBlock(dataUser.userName, dataPerson.userName)
            .then((res) => this.setState({ blocked: res.blocked }))
            .catch((error) => console.log(error))
    }

    onClick = () => {
        const { dataUser } = this.context
        const { dataPerson } = this.props.location.state
        blockProfil(dataUser.userName, dataPerson.userName)
        // Recup la liste des utilisateurs bloqués par l'user connecté, pour savoir si il bloque une personne deja bloquee ou non
        this.checkBlock()
        Swal.fire(
            'User blocked',
            'You succesfully blocked this profile',
            'success'
        )
    }

    render() {
        const { dataUser } = this.context
        if (dataUser === undefined) {
            return <div />
        }
        const { location } = this.props
        const { dataPerson } = location.state
        if (dataPerson === null) {
            return <div />
        }
        const { blocked, fake } = this.state
        const {
            id, userName, lastName, firstName, biography,
            listInterest, gender, orientation, likeUser,
            fakeUser, inline, date, age, populareScore,
        } = dataPerson
        const dataProfil = { userName, lastName, firstName }
        const dataPersonal = {
            biography, listInterest, gender, orientation, populareScore, id,
        }
        const { classes } = this.props
        return (
            <div>
                {
                (!blocked)
                    ? (
                        <div>
                            <div className="center infos-person" style={{width: '70%', marginTop: 80}}>
                                <div className="col" style={{width: '25%', boxShadow: "0px 5px 15px rgba(0,0,0,.2)", borderRadius: 10, padding: 50}}>
                                    <DataProfil
                                        dataProfil={ dataProfil }
                                        dataPersonal={ dataPersonal }
                                        id={ id }
                                        date={ date }
                                        likeUser={ likeUser }
                                        user={ dataUser.userName }
                                        profilName={ userName }
                                    />
                                    <button className={ classes.redBtn } onClick={ () => this.onClick() }>Block this user</button>
                                    {
                                        (fakeUser !== undefined || fake === true)
                                        ? <p>This profil is potentially a fake Profil</p>
                                        : (<button className={ classes.redBtn } onClick={ () => this.setState({ fake: true }, () => reportingFakeProfil(userName)) }>Report as fake profile</button>)
                                    }
                                </div>
                                <div className="col" style={{width: '75%', boxShadow: "0px 5px 15px rgba(0,0,0,.2)", borderRadius: 10, padding: 50, margin: 20}}>
                                    <ProfilBar
                                        userName={ userName }
                                        age={ age }
                                        date={ date }
                                        gender={ gender }
                                        inline={ inline }
                                    />
                                    <Interest listInterest={ listInterest } />
                                    <div className="center" style={{width: '80%'}}>
                                        <Images id={ id } />
                                    </div>
                                </div>
                            </div>
                            <div className="infos-person-lowres" style={{paddingLeft: '10%', paddingRight: '10%'}}>
                                <div style={{width: '100%'}}>
                                    <DataProfil
                                        dataProfil={ dataProfil }
                                        dataPersonal={ dataPersonal }
                                        id={ id }
                                        date={ date }
                                        likeUser={ likeUser }
                                        user={ dataUser.userName }
                                        profilName={ userName }
                                    />
                                    <button className={ classes.redBtn } onClick={ () => this.onClick() }>Block this user</button>
                                    {
                                        (fakeUser !== undefined || fake === true)
                                        ? <p>This profil is potentially a fake Profil</p>
                                        : (<button className={ classes.redBtn } onClick={ () => this.setState({ fake: true }, () => reportingFakeProfil(userName)) }>Report as fake profile</button>)
                                    }
                                </div>
                                <div style={{width: '100%'}}>
                                    <ProfilBar
                                        userName={ userName }
                                        age={ age }
                                        date={ date }
                                        gender={ gender }
                                        inline={ inline }
                                    />
                                    <Interest listInterest={ listInterest } />
                                    <Images id={ id } />
                                </div>
                            </div>
                        </div>
                    )
                    : <div className="no-results">Utilisateur bloqué</div>
                }
            </div>
        )
    }

}

export default (withStyles(styles)(InfosPerson))
