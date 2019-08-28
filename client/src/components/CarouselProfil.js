import React, { Component } from "react"

const styles = {
	slider: {
		position: "relative",
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
			sizeDiv: {
				width: 0,
				height: 0,
			}
		}
		this.isDrag = false
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.widthPicture !== nextProps.widthPicture) {
			this.setState({ translateValue: -nextProps.widthPicture * this.state.currentIndex })
		}
	}

	goToPrevSlide = () => {
		const { widthPicture } = this.props
		const { currentIndex } = this.state
		if (currentIndex === 0) {
			return
		}
		this.setState((prevState) => ({
			currentIndex: prevState.currentIndex - 1,
			translateValue: prevState.translateValue + widthPicture,
		}))
	}

	goToNextSlide = () => {
		const { pictureProfil, widthPicture } = this.props
		const { currentIndex } = this.state
		if (currentIndex === pictureProfil.length - 1) {
			return this.setState({
				currentIndex: 0,
				translateValue: 0,
			})
		}
		this.setState((prevState) => ({
			currentIndex: prevState.currentIndex + 1,
			translateValue: prevState.translateValue - widthPicture,
		}))
	}

	chooseImageByIndex = (index) => {
		const { widthPicture } = this.props
		this.setState((prevState) => ({
			currentIndex: index,
			translateValue: (index > prevState.currentIndex) ? prevState.translateValue - (index - prevState.currentIndex) * widthPicture : prevState.translateValue + (prevState.currentIndex - index) * widthPicture
		}))
	}

	onMouseDown = (e) => {
		const startingLeft = e.pageX
		let distanceTravelled
		const onMouseMove = (e) => {
			const { pictureProfil, widthPicture } = this.props
			const { currentIndex } = this.state
			distanceTravelled = -(startingLeft - e.clientX)
			if (distanceTravelled > 5 || distanceTravelled < -5) {
				this.isDrag = true
				if ((currentIndex === 0 && distanceTravelled > 0) || (currentIndex === pictureProfil.length - 1 && distanceTravelled < 0)) {
					return
				} else if (distanceTravelled < widthPicture * 0.75 && distanceTravelled > -widthPicture * 0.75 && this.isDrag === true) {
					this.setState((prevState) => ({
						currentIndex: prevState.currentIndex,
						translateValue: -(prevState.currentIndex * widthPicture) + distanceTravelled,
					}))
				}
			}
		}
		const onMouseUp = (e) => {
			document.removeEventListener("mousemove", onMouseMove)
			document.removeEventListener("mouseup", onMouseUp)
			if (this.isDrag === true) {
				this.isDrag = false
				const { pictureProfil, widthPicture } = this.props
				const { currentIndex } = this.state
				if ((currentIndex === 0 && distanceTravelled > widthPicture * 0.25) || (currentIndex === pictureProfil.length - 1 && distanceTravelled < -widthPicture * 0.25) || (distanceTravelled < widthPicture * 0.25 && distanceTravelled > -widthPicture * 0.25)) {
					this.setState((prevState) => ({
						currentIndex: prevState.currentIndex,
						translateValue: -(prevState.currentIndex * widthPicture),
					}))
				} else {
					if (distanceTravelled >= widthPicture * 0.75 || distanceTravelled <= -widthPicture * 0.75) {
						const { translateValue, currentIndex } = this.state
						if (-(currentIndex * widthPicture) - distanceTravelled !== -(currentIndex * widthPicture)) {
							distanceTravelled = translateValue + (currentIndex * widthPicture)
						}
					}
					if (distanceTravelled < 0) {
						this.setState((prevState) => ({
							currentIndex: prevState.currentIndex + 1,
							translateValue: prevState.translateValue - distanceTravelled - widthPicture,
						}))
					} else if (distanceTravelled > 0) {
						this.setState((prevState) => ({
							currentIndex: prevState.currentIndex - 1,
							translateValue: prevState.translateValue - distanceTravelled + widthPicture,
						}))
					}
				}
			} else {
				const { widthPicture } = this.props
				const offset = e.target.getBoundingClientRect()
				if (e.pageX - offset.left < (widthPicture / 2)) {
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
		const { pictureProfil, widthPicture, resize } = this.props
		const { translateValue } = this.state
		if (pictureProfil === null) {
			return <div />
		}
		const arrayButton = []
		for (let i = 0; i < pictureProfil.length; i++) {
			arrayButton.push(i)
		}
		return (
			<div
				onMouseDown={ (e) => this.onMouseDown(e) }
				style={
					{
						...styles.slider,
						width: widthPicture,
						height: widthPicture * 0.75
					}
				}
			>
				<div
					style={
						{
							...styles.sliderWrapper,
							transform: `translateX(${translateValue}px)`,
							transition: (resize === true) ? null : "transform ease-out 0.45s",
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
		)
	}

}

export default App
