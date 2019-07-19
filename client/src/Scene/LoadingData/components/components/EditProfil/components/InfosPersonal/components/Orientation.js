import React from "react"
import PropTypes from "prop-types"

import RadioInput from "components/RadioInput"

const radioInputArray = ["Homme", "Femme", "Bisexuelle"]

const Orientation = ({ optionChecked, onChangeValue }) => (
    <div>
        { optionChecked || radioInputArray[0] }
        <RadioInput
            radioInputArray={ radioInputArray }
            onChangeValue={ (e) => onChangeValue(e, "orientation") }
            optionChecked={ optionChecked || radioInputArray[0] }
        />
    </div>
)

Orientation.propTypes = {
    onChangeValue: PropTypes.func.isRequired,
    optionChecked: PropTypes.string,
}

export default Orientation