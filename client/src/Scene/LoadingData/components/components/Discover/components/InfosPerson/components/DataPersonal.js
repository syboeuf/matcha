import React from "react"

const DataPersonal = ({ dataPersonal }) => (
    <div>
        {
            Object.entries(dataPersonal).map((entry) => (
                <p key={ `${entry[0]}` }>{ `${entry[0]}: ${entry[1]}` }</p>
            ))
        }
    </div>
)

export default DataPersonal