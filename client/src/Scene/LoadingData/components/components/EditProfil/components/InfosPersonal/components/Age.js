import React from "react"

const Age = ({ onChangeValue, age }) => (
    <input
        onChange={ (e) => onChangeValue(e, "age") }
        placeholder="Put your age here !"
        value={ (age === null) ? "" : age }
        type="number"
    />
)

export default Age