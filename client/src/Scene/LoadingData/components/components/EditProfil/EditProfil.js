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
        <Container maxWidth="xl">
            <Grid container style={{ marginTop: 100 }}>
                <Grid item xs={ 12 } sm={ 2 }>
                    <InfosProfil
                        infosUser={ user.dataUser }
                        updateDataUser={ user.setNewDataUser }
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 8 } style={{ marginLeft: 50, marginRight: 50, boxShadow: '0px 0px 5px rgba(0, 0, 0, .2)', borderRadius: '10px 10px 0px 0px', padding: 30, minHeight: '90vh' }}>
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
