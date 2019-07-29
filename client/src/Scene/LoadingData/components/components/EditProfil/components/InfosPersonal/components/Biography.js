import React from "react"
import PropTypes from "prop-types"

import TextField from "@material-ui/core/TextField"

const Biography = ({ value, onChangeValue }) => (
    <div>
        <TextField
            placeholder="Put your summary here !!!"
            required
            type="text"
            label="Biography"
            multiline={ true }
            value={ (value === null) ? "" : value }
            onChange={ (e) => onChangeValue(e, "biography") }
        />
    </div>
)

Biography.propTypes = {
    value: PropTypes.string,
    onChangeValue: PropTypes.func.isRequired,
}

export default Biography
