import React from 'react'
import { withRouter } from "react-router-dom"
import { getAllProfilName, getAllOtherDataOfProfil } from "utils/fileProvider"
import './SearchBar.css'
import { UserConsumer } from 'store/UserProvider';

const limit = 20

class SearchBar extends React.Component {

    static contextType = UserConsumer

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

    onClick = (profileName) => {
        const { history } = this.props
        const { dataUser } = this.context
        getAllOtherDataOfProfil(dataUser.userName, profileName)
            .then((response) => history.push("/InfosPerson", { data: { id: response.otherData.id, userName: dataUser.userName, profilName: response.otherData.userName } }))
            .catch((error) => console.log(error))
    }

	render() {
		const { searchUser, matchProfilName } = this.state
		return (
			<div style={{ width: '100%' }}>
				<input
					type="text"
					value={ searchUser }
					onChange={ (e) => this.onSearchUserChange(e) }
					placeholder="Search profile"
					className="searchBar"
				/>
				<div className="searchBar-collapse">
				{
                    (matchProfilName.length > 0)
                        ? (
                            matchProfilName.map((name) => (
                                <div className="searchBar-result" onClick={ () => this.onClick(name.userName.trim()) } key={ `name-${name.userName}` }>{ name.userName }</div>
                            ))
                        )
                        : null
                }
				</div>
			</div>
		)
	}
}

export default withRouter(SearchBar)
