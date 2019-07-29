import React from "react"

import StyledButton from "components/StyledButton"

const ListInterestArray = [
    "#Movie",
    "#Manga",
    "#Sport",
    "#NigthParty",
    "#data processing",
]

const ListInterest = ({ list, onChangeValue }) => (
    <div>
        {
            ListInterestArray.map((interest) => {
                const checkInterest = (list !== null) ? list.indexOf(interest) : -1
                return (
                    <StyledButton
                        key={ `interest-${interest}` }
                        color={ (checkInterest !== -1) ? "secondary" : "primary" }
                        functionOnClick={ () => ((checkInterest !== -1)) ? onChangeValue(list.replace(interest, "")) : onChangeValue((list === null) ? "" :  list + `${interest}`) }
                        text={ interest }
                    />
                )
            })
        }
    </div>
)

export default ListInterest