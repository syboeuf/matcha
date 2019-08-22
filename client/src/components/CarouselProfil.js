import React, { Component } from "react"

const styles = {
	slider: {
		position: "relative",
		width: 1000,
		height: 800,
		margin: "0 auto",
		overflow: "hidden",
		whiteSpace: "nowrap",
		marginTop: 20
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
	indexButtons: {
		position: "absolute",
		bottom: 10,
		display: "flex",
		width: "100%",
		justifyContent: "center",
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
			translateValue: prevState.translateValue + 1000,
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
			translateValue: prevState.translateValue - 1000,
		}))
	}

	chooseImageByIndex = (index) => {
		this.setState((prevState) => ({
			currentIndex: index,
			translateValue: (index > prevState.currentIndex) ? prevState.translateValue - (index - prevState.currentIndex) * 1000 : prevState.translateValue + (prevState.currentIndex - index) * 1000
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
				if ((currentIndex === 0 && distanceTravelled > 0) || (currentIndex === pictureProfil.length - 1 && distanceTravelled < 0)) {
					return
				} else if (distanceTravelled < 900 && distanceTravelled > -900 && this.isDrag === true) {
					this.setState((prevState) => ({
						currentIndex: prevState.currentIndex,
						translateValue: -(prevState.currentIndex * 1000) + distanceTravelled,
					}))
				}
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
						translateValue: -(prevState.currentIndex * 1000),
					}))
				} else {
					if (distanceTravelled >= 900 || distanceTravelled <= -900) {
						const { translateValue, currentIndex } = this.state
						if (-(currentIndex * 1000) - distanceTravelled !== -(currentIndex * 1000)) {
							distanceTravelled = translateValue + (currentIndex * 1000)
						}
					}
					if (distanceTravelled < 0) {
						this.setState((prevState) => ({
							currentIndex: prevState.currentIndex + 1,
							translateValue: prevState.translateValue - distanceTravelled - 1000,
						}))
					} else if (distanceTravelled > 0) {
						this.setState((prevState) => ({
							currentIndex: prevState.currentIndex - 1,
							translateValue: prevState.translateValue - distanceTravelled + 1000,
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
											backgroundPosition: "50% 60%"
										}
									}
								/>
							))
						}
					</div>
					<div style={ styles.indexButtons }>
						{
							arrayButton.map((num) => (
								<button
									key={ `image-${num}` }
									onClick={ () => this.chooseImageByIndex(num) }
									style={{ backgroundColor: 'white', border: '0px', borderRadius: '50%', width: 20, height: 20, margin: 5, boxShadow: '0px 5px 10px rgba(0, 0, 0, .5)' }}
								>
								</button>
							))
						}
					</div>
				</div>
			</div>
		)
	}

}

export default App
