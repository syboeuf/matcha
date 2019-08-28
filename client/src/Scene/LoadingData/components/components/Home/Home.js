import React, { Component } from "react"
import { ReactComponent as Pattern } from '../../../../../pattern.svg'

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		return (
			<div>
				<div style={{ }}>
				Home
				</div>
				<span style={{ opacity: .25 }}><Pattern /></span>
			</div>
		)
	}

}

export default Home
