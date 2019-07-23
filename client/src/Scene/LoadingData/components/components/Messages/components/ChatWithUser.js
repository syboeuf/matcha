import React from "react"

import Grid from "@material-ui/core/Grid"
import ReceiveMessage from "./components/ReceiveMessage"
import SendMessage from "./components/SendMessage"

const ChatWithUser = ({ userName, profilMatchName }) => (
    <Grid container direction="column" spacing={ 4 }>
        <Grid item>
            <ReceiveMessage
                userName={ userName }
                profilMatchName={ profilMatchName }
            />
        </Grid>
        <Grid item>
            <SendMessage
                userName={ userName }
                profilMatchName={ profilMatchName }
            />
        </Grid>
    </Grid>
)

export default ChatWithUser