import React from "react"
import PropTypes from "prop-types"

import Radio from "@material-ui/core/Radio"

const RadioInput = ({ radioInputArray, onChangeValue, optionChecked }) => (
    <div>
        {
            radioInputArray.map((inputData) => (
                <Radio
                    key={ `option-${inputData}` }
                    value={ inputData }
                    onChange={ onChangeValue }
                    checked={ optionChecked === inputData }
                    inputProps={{ 'aria-label': `${inputData}` }}
                />
            ))
        }
    </div>
)

RadioInput.propTypes = {
    radioInputArray: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    onChangeValue: PropTypes.func.isRequired,
    optionChecked: PropTypes.string.isRequired,
}

export default RadioInput