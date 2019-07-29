import React from "react"
import PropTypes from "prop-types"

import TextField from "@material-ui/core/TextField"

const TextInput = ({
    value, placeholder, onChangeValue, type,
}) => (
    <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name={ type }
        label={ placeholder }
        type={ type }
        onChange={ onChangeValue }
        placeholder={ placeholder }
        value={ value }
    />
)

TextInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    //value: PropTypes.string.isRequired,
    onChangeValue: PropTypes.func.isRequired,
}

export default TextInput
