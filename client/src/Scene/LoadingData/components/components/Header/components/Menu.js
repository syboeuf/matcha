import React, { Component } from "react"
import { withRouter } from "react-router-dom"

import Disconnect from "components/Disconnect"
import { UserConsumer } from "store/UserProvider"

const menuProfil = ["EditProfil", "ListProfilBlock"]

class Menu extends Component {

    static contextType = UserConsumer

    constructor(props) {
		super(props)
		this.state = { isOpen: false }
		this.selector = React.createRef()
	}

	componentDidMount() {
		window.addEventListener("mousedown", this.closeDropDown)
	}

	componentWillUnmount() {
		window.removeEventListener("mousedown", this.closeDropDown)
	}

	closeDropDown = (e) => {
		if (this.selector.current && !this.selector.current.contains(e.target)) {
			this.setState({ isOpen: false })
		}
	}

	render() {
        const { history } = this.props
        const { dataUser } = this.context
        const newMenuProfil = []
        if (dataUser.admin === 1) {
            newMenuProfil.push(<p onClick={ () => { history.push("/Admin") } }>Admin</p>)
        }
        menuProfil.forEach((menu) => {
            newMenuProfil.push(<p onClick={ () => { history.push(`/${menu}`) } }>{ menu }</p>)
        })
        newMenuProfil.push(<Disconnect logout={ this.logout } />)
        return (
			<div ref={ this.selector }>
				<span
                    onClick={ () => this.setState({ isOpen: !this.state.isOpen }) }
                    className="menu-icon"
                >
                    <img
                        src={
                            (dataUser.pictures.length === 0)
                                ? process.env.PUBLIC_URL + "noImage.png"
                                : process.env.PUBLIC_URL + `/imageProfil/${dataUser.pictures[0].userId}/${dataUser.pictures[0].picture}`
                        }
                        alt="picProfile"
                        className="profilePic"
                    />
                </span>
				{
					(this.state.isOpen)
					? (
						<div className="menu">
						{
							newMenuProfil.map((option, index) => (
								<div key={ `Menu-${index}` } className="menu-item">
									{ option }
								</div>
                            ))
						}
						</div>
					)
					: null
				}
			</div>
		)
	}

}

export default withRouter(Menu)
