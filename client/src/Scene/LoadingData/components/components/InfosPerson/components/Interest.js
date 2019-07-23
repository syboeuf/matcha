import React from "react"

const styles = {
    container: { display: "flex" },
    tag: {
        border: "1px solid black",
        borderRadius: "30%",
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