import React from "react"

const styles = {
    container: { display: "flex", alignItems: "center" },
    inline: {
        width: 10,
        height: 10,
        borderRadius: 10,
    },
}

const ProfilBar = ({ userName, age, inline, date }) => (
    <div style={ styles.container }>
        <div>{ `${userName}, ${age} ans` }</div>
        <div
            style={
                {
                    ...styles.inline,
                    border: (inline === 0) ? "1px solid black" : null,
                    backgroundColor: (inline === 1) ? "green" : null,
                }
            }
        />
        { (inline === 0) ? `Last connection are ${date}` : null }
    </div>
)

export default ProfilBar