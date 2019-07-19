import React from "react"
import PropTypes from "prop-types"

import RadioInput from "components/RadioInput"

const radioInputArray = ["Male", "Femme"]

const Gender = ({ optionChecked, onChangeValue }) => (
    <div>
        { optionChecked || radioInputArray[0] }
        <RadioInput
            radioInputArray={ radioInputArray }
            onChangeValue={ (e) => onChangeValue(e, "gender") }
            optionChecked={ optionChecked || radioInputArray[0] }
        />
    </div>
)

Gender.propTypes = {
    onChangeValue: PropTypes.func.isRequired,
    optionChecked: PropTypes.string,
}

export default Gender