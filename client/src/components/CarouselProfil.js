import React, { Component } from "react"

import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

const styles = {
	container: {
		position: "relative",
		width: "100%",
		height: "100%",
		margin: "auto",
	},
	picture: {
		width: "100%",
		height: "100%",
    	position: "absolute",
    	top: 0,
    	margin: "auto",
    	zIndex: 100,
    	transition: "transform 1s, z-index .5s",
	},
	buttonPrevNext: {
		width: "15%",
		position: "absolute",
		zIndex: 100000,
		top: "50%",
	},
	miniButton: {
		position: "absolute",
		bottom: 0,
		zIndex: 1000,
		display: "flex",
		justifyContent: "space-around",
		width: "100%",
	},
	customButton: { width: "15%" },
}

class App extends Component {

	constructor(props) {
    	super(props)
    	this.state = {
    		prev: props.pictureProfil.length - 1,
    		next: 1,
    		active: 0,
		}
  	}

	next = () => {
		const { pictureProfil } = this.props
    	const { active } = this.state
    	if (active === 0) {
      		this.setState({
        		prev: active,
        		next: active + 2,
        		active: active + 1,
      		})
    	} else if (active === pictureProfil.length - 1) {
      		this.setState({
        		prev: pictureProfil.length - 1,
        		next: 1,
        		active: 0,
      		})
    	} else {
      		this.setState({
        		prev: active,
        		next: (active + 1 === pictureProfil.length - 1) ? 0 : active + 2,
        		active: active + 1,
      		})
    	}
  	}

  	prev = () => {
		const { pictureProfil } = this.props
    	const { active } = this.state
    	if (active === 0) {
      		this.setState({
        		prev: pictureProfil.length - 2,
        		next: 0,
        		active: pictureProfil.length - 1,
      		})
    	} else if (active === pictureProfil.length - 1) {
      		this.setState({
        		prev: active - 2,
        		next: pictureProfil.length - 1,
        		active: pictureProfil.length - 2,
      		})
    	} else {
      		this.setState({
        		prev: (active - 1 === 0) ? pictureProfil.length - 1 : active - 2,
        		next: active,
        		active: active - 1,
      		})
    	}
	}
	  
	goToTheIndex = (index) => {
		const { pictureProfil } = this.props
		if (index === 0) {
			this.setState({
				prev: pictureProfil.length - 1,
        		next: index + 1,
        		active: index,
			})
		} else if (index === pictureProfil.length - 1) {
			this.setState({
				prev: index - 1,
        		next: 0,
        		active: index,
			})
		} else {
			this.setState({
				prev: index - 1,
        		next: index + 1,
        		active: index,
			})
		}
	}

  	render() {
	  	const { pictureProfil } = this.props
		const { prev, active, next } = this.state
		if (pictureProfil === undefined) {
			return <div />
		}
		const arrayButtonIndex = []
		pictureProfil.forEach((picture, index) => {
			arrayButtonIndex.push(index)
		})
    	return (
			<div style={ styles.container }>
				<div style={ { overflow: "hidden", position: "relative" } }>
					{
						pictureProfil.map((picture, index) => {
							let newStyles = {}
							if (index === prev) {
								newStyles = {
									zIndex: 800,
									transform: "translateX(-100%)",
								}
							}
							if (index === active) {
								newStyles = {
									opacity: 1,
									position: "relative",
									zIndex: 900,
								}
							}
							if (index === next) {
								newStyles = {
									zIndex: 800,
									transform: "translateX(100%)",
								}
							}
							return (
								<div key={ `picture-${index}` }>
									<img
										src={ process.env.PUBLIC_URL + `/imageProfil/${picture.userId}/${picture.picture}` }
										alt={ `${index}` }
										style={
											{
												...styles.picture,
												...newStyles,
											}
										}
									/>
								</div>
							)
						})
					}
				</div>	
				<div
					onClick={ () => this.prev() }
					style={
						{
							...styles.buttonPrevNext,
							left: 0,
						}
					}
				>
					<FaAngleLeft />
				</div>
				<div
					onClick={ () => this.next() }
					style={
						{
							...styles.buttonPrevNext,
							right: 0,
						}
					}
				>
					<FaAngleRight />
				</div>
				<div style={ styles.miniButton }>
					{
						arrayButtonIndex.map((i) => (
							<button
								key={ `picture-${i}` }
								style={ styles.customButton }
								onClick={ () => this.goToTheIndex(i) }
							/>
						))
					}
				</div>
			</div>
		)
  	}

}

export default App
