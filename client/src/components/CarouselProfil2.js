import React, { Component } from "react"

const styles = {
	slider: {
		position: "relative",
		width: 200,
		margin: "0 auto",
		height: 200,
		overflow: "hidden",
		whiteSpace: "nowrap",
	},
	sliderWrapper: {
		position: "relative",
		height: "100%",
		width: "100%",
	},
	slide: {
		display: "inline-block",
		height: "100%",
		width: "100%",
	},
	arrow: {
		height: 50,
		width: 50,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		background: "#f9f9f9",
		borderRadius: "50%",
		cursor: "pointer",
		transition: "transform ease-in 0.1s",
	},
	nextArrow: {
		position: "absolute",
		top: "50%",
		right: 0,
		zIndex: 999,
		color: "#222",
	},
	backArrow: {
		position: "absolute",
		top: "50%",
		left: 0,
		zIndex: 999,
		color: "#222",
	},
}

class App extends Component {

	constructor(props) {
    	super(props)
    	this.state = {
			currentIndex: 0,
			translateValue: 0,
		}
		this.isDrag = false
	}

	goToPrevSlide = () => {
		const { currentIndex } = this.state
		if (currentIndex === 0) {
			return
		}
		this.setState((prevState) => ({
			currentIndex: prevState.currentIndex - 1,
			translateValue: prevState.translateValue + 200,
		}))
	}

	goToNextSlide = () => {
		const { pictureProfil } = this.props
		const { currentIndex } = this.state
		if (currentIndex === pictureProfil.length - 1) {
			return this.setState({
				currentIndex: 0,
				translateValue: 0,
			})
		}
		this.setState((prevState) => ({
			currentIndex: prevState.currentIndex + 1,
			translateValue: prevState.translateValue - 200,
		}))
	}

	chooseImageByIndex = (index) => {
		this.setState((prevState) => ({
			currentIndex: index,
			translateValue: (index > prevState.currentIndex) ? prevState.translateValue - (index - prevState.currentIndex) * 200 : prevState.translateValue + (prevState.currentIndex - index) * 200
		}))
	}

	onMouseDown = (e) => {
		const startingLeft = e.pageX
		let distanceTravelled
		const onMouseMove = (e) => {
			const { pictureProfil } = this.props
			const { currentIndex } = this.state
			distanceTravelled = -(startingLeft - e.clientX)
			if (distanceTravelled > 5 || distanceTravelled < -5) {
				this.isDrag = true
			}
			if ((currentIndex === 0 && distanceTravelled > 0) || (currentIndex === pictureProfil.length - 1 && distanceTravelled < 0)) {
				return
			} else if (distanceTravelled < 180 && distanceTravelled > -180 && this.isDrag === true) {
				this.setState((prevState) => ({
					currentIndex: prevState.currentIndex,
					translateValue: -(prevState.currentIndex * 200) + distanceTravelled,
				}))
			}
		}
		const onMouseUp = (e) => {
			document.removeEventListener("mousemove", onMouseMove)
			document.removeEventListener("mouseup", onMouseUp)
			if (this.isDrag === true) {
				this.isDrag = false
				const { pictureProfil } = this.props
				const { currentIndex } = this.state
				if ((currentIndex === 0 && distanceTravelled > 50) || (currentIndex === pictureProfil.length - 1 && distanceTravelled < -50) || (distanceTravelled < 50 && distanceTravelled > -50)) {
					this.setState((prevState) => ({
						currentIndex: prevState.currentIndex,
						translateValue: -(prevState.currentIndex * 200),
					}))
				} else {
					if (distanceTravelled < 0) {
						this.setState((prevState) => ({
							currentIndex: (distanceTravelled < 0) ? prevState.currentIndex + 1 : prevState.currentIndex - 1,
							translateValue: prevState.translateValue - distanceTravelled - 200,
						}))
					} else if (distanceTravelled > 0) {
						this.setState((prevState) => ({
							currentIndex: (distanceTravelled < 0) ? prevState.currentIndex + 1 : prevState.currentIndex - 1,
							translateValue: prevState.translateValue - distanceTravelled + 200,
						}))
					}
				}
			} else {
				const offset = e.target.getBoundingClientRect()
				if (e.pageX - offset.left < (offset.width / 2)) {
					this.goToPrevSlide()
				} else {
					this.goToNextSlide()
				}	
			}
		}
		document.addEventListener("mousemove", onMouseMove)
    	document.addEventListener("mouseup", onMouseUp)
	}

	render() {
		const { pictureProfil } = this.props
		const { translateValue } = this.state
		const arrayButton = []
		for (let i = 0; i < pictureProfil.length; i++) {
			arrayButton.push(i)
		}
		return (
			<div>
				<div
					onMouseDown={ (e) => this.onMouseDown(e) }
					style={ styles.slider }
				>
					<div
						style={
							{
								...styles.sliderWrapper,
								transform: `translateX(${translateValue}px)`,
								transition: "transform ease-out 0.45s",
							}
						}
					>
						{
							pictureProfil.map((image, index) => (
								<div
									key={ `image-${index}` }
									style={
										{
											...styles.slide,
											backgroundImage: `url(${process.env.PUBLIC_URL}/imageProfil/${image.userId}/${image.picture})`,
											backgroundSize: "cover",
											backgroundRepeat: "no-repeat",
											backgroundPosition: "50% 60%",
										}
									}
								/>
							))
						}
					</div>
				</div>
				{
					arrayButton.map((num) => (
						<button
							key={ `image-${num}` }
							onClick={ () => this.chooseImageByIndex(num) }
						>
							{ num }
						</button>
					))
				}
			</div>
		)
	}

}

export default App
