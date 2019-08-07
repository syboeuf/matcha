import React from 'react'
import { getAllProfilName } from "utils/fileProvider"
import './SearchBar.css'

class SearchBar extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
            searchUser: "",
            arrayProfilName: [],
            matchProfilName: [],
		}
	}

    componentWillMount() {
        getAllProfilName()
            .then((response) => this.setState({ arrayProfilName: response.allProfilName }))
            .catch((error) => console.log(error))
    }

    onSearchUserChange = (e) => {
        let { searchUser, arrayProfilName, matchProfilName } = this.state
        searchUser = e.target.value
        if (searchUser.trim() !== '')
            matchProfilName = arrayProfilName.filter(name => name.userName.toLowerCase().startsWith(searchUser.toLowerCase()))
        else
            matchProfilName = []
        this.setState({ searchUser, matchProfilName })
    }

	render() {
		const { searchUser, matchProfilName } = this.state

		return (
			<div style={{ width: '100%' }}>
				<input
					type="text"
					value={ searchUser }
					onChange={ (e) => this.onSearchUserChange(e) }
					placeholder="Seach a profil by the name"
					className="searchBar"
				/>
				<div className="searchBar-collapse">
				{
                    (matchProfilName.length > 0)
                        ? (
                            matchProfilName.map((name) => (
                                <div className="searchBar-result" onClick={ () => this.setState({ searchUser: name.userName.trim() }) } key={ `name-${name.userName}` }>{ name.userName }</div>
                            ))
                        )
                        : null
                }
				</div>
			</div>
		)
	}
}

export default SearchBar
