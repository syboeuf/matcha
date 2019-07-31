import React from "react"

import { withStyles } from "@material-ui/core/styles"

const styles = {
    container: { display: "flex" },
    tag: {
        color: '#4A90E2',
        borderRadius: 20,
        padding: '5px 10px 5px 10px',
        border: '1px solid #4A90E2',
        marginRight: 10,
        fontSize: '1.3em',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'rgba(74, 144, 226, .1)',
            cursor: 'pointer'
        }
    }
}

class Interest extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { classes, listInterest } = this.props
        const arrayTag = listInterest ? listInterest.split("#") : []

        return (
            <div style={ styles.container }>
                {
                    arrayTag.map((tag) => (
                        <div className={ classes.tag } key={ `tag-${tag}` }># { tag }</div>
                    ))
                }
            </div>
        )
    }
}

export default (withStyles(styles)(Interest))
