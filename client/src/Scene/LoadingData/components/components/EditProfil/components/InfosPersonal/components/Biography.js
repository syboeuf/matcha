import React from "react"
import PropTypes from "prop-types"

const Biography = ({ value, onChangeValue }) => (
    <div>
        <textarea
            placeholder="Put your summary here !!!"
            rows={ 10 }
            cols={ 50 }
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
