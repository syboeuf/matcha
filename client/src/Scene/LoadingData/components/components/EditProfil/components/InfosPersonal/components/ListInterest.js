import React from "react"

import { withStyles } from "@material-ui/core/styles"

const ListInterestArray = [
    "# Movie",
    "# Manga",
    "# Sport",
    "# NightParty",
    "# Data Processing",
]

const styles = {
    container: { display: "flex", flexWrap: "wrap" },
    tagDisabled: {
        color: '#4A90E2',
        backgroundColor: 'transparent',
        borderRadius: 20,
        padding: '5px 10px 5px 10px',
        border: '1px solid #4A90E2',
        marginRight: 10,
        fontSize: '1.3em',
        fontWeight: 'bold',
        transition: 'background-color .3s',
        '&:hover': {
            backgroundColor: 'rgba(74, 144, 226, .1)',
            cursor: 'pointer'
        }
    },
    tagEnabled: {
        color: 'white',
        backgroundColor: '#4A90E2',
        borderRadius: 20,
        padding: '5px 10px 5px 10px',
        border: '1px solid #4A90E2',
        marginRight: 10,
        fontSize: '1.3em',
        fontWeight: 'bold',
        transition: 'background-color .3s',
        '&:hover': {
            cursor: 'pointer'
        }
    }
}

const ListInterest = ({ list, onChangeValue, classes }) => {

    const toggleTag = (checkInterest, interest) => {
        if (checkInterest !== -1) {
            return onChangeValue(list.replace(interest, ""))
        } else if (!list) {
            return onChangeValue("")
        } else {
            return onChangeValue(list + `${interest}`)
        }
    }

    return (
        <div className={ classes.container }>
        {
            ListInterestArray.map((interest) => {
                const checkInterest = (list !== null) ? list.indexOf(interest) : -1
                return (
                    <div
                        className={ (checkInterest !== -1) ? classes.tagDisabled : classes.tagEnabled }
                        key={ `interest-${interest}` }
                        onClick={ () => toggleTag(checkInterest, interest) }
                    >
                        { interest }
                    </div>
                )
            })
        }
        </div>
    )
}

export default (withStyles(styles)(ListInterest))
