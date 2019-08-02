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

	mouseMove = (e, startX, startY) => {
		e.persist()
		this.isDrag = true
		const offset = e.target.getBoundingClientRect()
		if (e.pageX - offset.left < (offset.width / 2)) {
			console.log("1")
			this.setState((prevState) => ({
				currentIndex: prevState.currentIndex,
				translateValue: prevState.translateValue + (e.pageX - offset.left + (offset.width / 2))
			}))
		} else {
			console.log("2")
			this.setState((prevState) => ({
				currentIndex: prevState.currentIndex,
				translateValue: prevState.translateValue - (e.pageX - offset.left)
			}))
		}
	}

	onMouseDown = (e) => {
		const startX = e.pageX
		const startY = e.pageY
		e.target.addEventListener("mousemove", this.mouseMove(e, startX, startY))
	}

	onMouseUp = (e) => {
		if (this.isDrag === true) {
			this.isDrag = false
			e.target.removeEventListener("mousemove", this.mouseMove)
		} else {
			const offset = e.target.getBoundingClientRect()
			if (e.pageX - offset.left < (offset.width / 2)) {
				this.goToPrevSlide()
			} else {
				this.goToNextSlide()
			}
		}
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
					onMouseUp={ (e) => this.onMouseUp(e) }
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
