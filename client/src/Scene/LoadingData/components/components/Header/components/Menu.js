import React, { Component } from "react"
import { withRouter } from "react-router-dom"

import Disconnect from "components/Disconnect"
import { UserConsumer } from "store/UserProvider"

const menuProfil = [{ route: "EditProfil", name: "Edit profile" }, { route: "ListProfilBlock", name: "Block list" }]

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
						<div className="menu" style={{ position: 'absolute', right: 0, marginTop: 10 }} >
						{
							(dataUser.admin === 1)
								? (
									<div onClick={ () => history.push("/Admin") } className="menu-item">
										Admin
									</div>
								)
								: null
						}
						{
							menuProfil.map((option, index) => (
								<div onClick={ () => history.push(`/${option.route}`) } key={ `Menu-${index}` } className="menu-item">
									{ option.name }
								</div>
                            ))
						}
						<div className="menu-item">
							<Disconnect />
						</div>
						</div>
					)
					: null
				}
			</div>
		)
	}

}

export default withRouter(Menu)
