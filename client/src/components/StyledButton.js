import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles(theme => ({
    button: { margin: theme.spacing(1) },
}))

const StyledButton = ({ color, functionOnClick, text}) => {
    const classes = useStyles()
    return (
        <Button
            variant="contained"
            className={ classes.button }
            color={ color }
            onClick={ () => functionOnClick() }
        >
            { text }
        </Button>
    )
}

export default StyledButton