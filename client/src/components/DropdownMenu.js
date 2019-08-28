import React from 'react'

class DropdownMenu extends React.Component {

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
		const { title, items } = this.props
		return (
			<div
				ref={ this.selector }
			>
				<span onClick={ () => this.setState({ isOpen: !this.state.isOpen }) } className="menu-icon">{ title }</span>
				{
					(this.state.isOpen)
					? (
						<div style={{overflowY: "auto", height: "60%"}} className="menu">
						{
							items.map((item, index) => (
								<div key={ `Menu-${index}` } className="menu-item">
									{ item }
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

export default DropdownMenu
