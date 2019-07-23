import React from "react"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

const DataPersonal = ({ dataPersonal }) => {
    const { biography, populareScore } = dataPersonal
    return (
        <div>
            <Paper>
                <Typography variant="h5" component="h3">
                    Popular score
                </Typography>
                <Typography component="p">
                    { populareScore }
                </Typography>
            </Paper>
            <Typography variant="h5" component="h3">
                A propos
            </Typography>
            <Paper>
                <Typography component="p">
                    { biography }
                </Typography>
            </Paper>
        </div>
    )
}

export default DataPersonal