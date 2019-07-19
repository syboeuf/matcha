import React from "react"

const DataProfil = ({ dataProfil }) => (
    <div>
        {
            Object.entries(dataProfil).map((entry) => (
                <p key={ `info-${entry[0]}` }>{ `${entry[0]}: ${entry[1]}` }</p>
            ))
        }
    </div>
)

export default DataProfil