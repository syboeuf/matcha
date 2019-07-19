import React from "react"

const ListInterestArray = [
    "#Movie",
    "#Manga",
    "#Sport",
    "#NigthParty",
    "#data processing",
]

const ListInterest = ({ list, onChangeValue }) => (
    <div>
        <ul>
            {
                ListInterestArray.map((interest) => {
                    const checkInterest = (list !== null) ? list.indexOf(interest) : -1
                    return (
                        <li
                            key={ `interest-${interest}` }
                            style={ { color: (checkInterest !== -1) ? "red" : null } }
                            onClick={ () => ((checkInterest !== -1)) ? onChangeValue(list.replace(interest, "")) : onChangeValue((list === null) ? "" :  list + `${interest}`) }
                        >
                            { interest }
                        </li>
                    )
                })
            }
        </ul>
    </div>
)

export default ListInterest