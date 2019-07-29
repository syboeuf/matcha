import React from "react"

const styles = {
    container: { display: "flex" },
    tag: {
        color: '#4A90E2',
        borderRadius: 20,
        padding: '5px 10px 5px 10px',
        border: '1px solid #4A90E2',
        marginRight: 10
    },
}

const Interest = ({ listInterest }) => {
    const arrayTag = listInterest.split("#")
    return (
        <div style={ styles.container }>
            {
                arrayTag.map((tag) => (
                    <div style={ styles.tag } key={ `tag-${tag}` }>{ tag }</div>
                ))
            }
        </div>
    )
}

export default Interest
