import React from "react"

import {
    FaMars, FaVenus
} from "react-icons/fa"

const styles = {
    container: { display: "flex", alignItems: "center", flexWrap: "wrap" },
    inline: {
        width: 10,
        height: 10,
        borderRadius: 10,
    },
    male: {
        color: '#41A2F8',
        fontSize: '2.5em'
    },
    female: {
        color: '#F84080',
        fontSize: '2.5em'
    }
}

const ProfilBar = ({ userName, age, gender, inline, date }) => {
    let iconGender = null
    if (gender === 'Male') {
        iconGender = <span style={ styles.male }><FaMars /></span>
    } else if (gender === 'Female') {
        iconGender = <span style={ styles.female }><FaVenus /></span>
    }

    return (
        <div style={ styles.container }>
            {iconGender}
            <div style={{ fontSize: '1.8em' }}>{ `${userName}, ${age} ans` }</div>
            <div
                style={
                    {
                        ...styles.inline,
                        border: (inline === 0) ? "1px solid black" : null,
                        backgroundColor: (inline === 1) ? "green" : null,
                    }
                }
            />
            { (inline === 0) ? `Last connection - ${date}` : null }
        </div>
    )
}

export default ProfilBar
