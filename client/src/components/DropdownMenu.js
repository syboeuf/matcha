import React from 'react'

class DropdownMenu extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			isOpen: false,
			menuItems: []
		}
	}

	componentWillMount() {
		const { items } = this.props;
		this.setState({ menuItems: items });
	}

	render() {
		const { menuItems } = this.state;

		return (
			<div onClick={ () => this.setState({ isOpen: !this.state.isOpen }) }>
				<span className="menu-icon">Test</span>
				{
					(this.state.isOpen)
					? (
						<div className="menu">
						{
							menuItems.map((item, index) => {
								return (
									<div className="menu-item" onClick={ () => alert(item.link) }>{ item.title }</div>
								)
							})
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
