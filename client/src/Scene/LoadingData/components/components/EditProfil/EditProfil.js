import React, { useContext } from "react"
import { withRouter } from "react-router-dom"
//import PropTypes from "prop-types"

import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import InfosProfil from "./components/InfosProfil"
import InfosPersonal from "./components/InfosPersonal"
import { UserConsumer } from "store/UserProvider"

const EditProfil = () => {
    const user = useContext(UserConsumer)
    if (user.dataUser === undefined) {
        return <div />
    }
    return (
        <Container maxWidth="lg">
            <Grid container spacing={ 4 }>
                <Grid item xs={ 12 } sm={ 4 }>
                    <InfosProfil
                        infosUser={ user.dataUser }
                        updateDataUser={ user.setNewDataUser }
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 8 }>
                    <InfosPersonal
                        infosUser={ user.dataUser }
                        updateDataUser={ user.setNewDataUser }
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

EditProfil.propTypes = {
    //dataUser: PropTypes.objectOf().isRequired,
}

export default withRouter(EditProfil)