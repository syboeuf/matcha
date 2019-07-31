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
		width: 200,
        height: 200,
        objectFit: "cover",
    	position: "absolute",
    	top: 0,
    	margin: "auto",
    	transition: "transform 1s",
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
            active: 0,
            direction: "",
            hide: null,
		}
    }

    prev = () => {
        const { pictureProfil } = this.props
        const { active } = this.state
        const newPictureActive = (active === 0) ? pictureProfil.length - 1 : active - 1
        this.setState({ active: newPictureActive, direction: "left", hide: active })
    }

    next = () => {
        const { pictureProfil } = this.props
        const { active } = this.state
        const newPictureActive = (active === pictureProfil.length - 1) ? 0 : active + 1
        this.setState({ active: newPictureActive, direction: "right", hide: active })
    }

    choosePictureFromIndex = (index) => {
        const { active } = this.state
        const direction = (active < index) ? "right" : "left"
        this.setState({ active: index, direction, hide: active })
    }

    render() {
        const { pictureProfil } = this.props
        const { active, direction, hide } = this.state
        return (
            <div style={ styles.container }>
                <div style={ { overflow: "hidden", position: "relative" } }>
                    {
                        pictureProfil.map((pictureData, index) => {
                            if (index === active || index === hide) {
                                let newStyles = {}
                                if (index === hide) {
                                    newStyles = {
                                        zIndex: 900,
                                        transform: (direction === "left") ? "translateX(-100%)" : "translateX(100%)",
                                    }
                                }
                                if (index === active) {
                                    newStyles = {
                                        zIndex: 900,
                                        position: "relative",
                                        transform: (direction === "left") ? "translateX(-100%)" : "translateX(100%)",
                                    }
                                }
                                return (
                                    <div key={ `picture-${index}` }>
                                        <img
                                            src={ process.env.PUBLIC_URL + `/imageProfil/${pictureData.userId}/${pictureData.picture}` }
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
                            }
                            return 
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
            </div>
        )
    }

    /*
	next = () => {
		const { pictureProfil } = this.props
    	const { active } = this.state
    	if (active === 0) {
      		this.setState({
        		prev: active,
        		next: active + 2,
				active: active + 1,
				direction: "right",
      		})
    	} else if (active === pictureProfil.length - 1) {
      		this.setState({
        		prev: pictureProfil.length - 1,
        		next: 1,
				active: 0,
				direction: "right",
      		})
    	} else {
      		this.setState({
        		prev: active,
        		next: (active + 1 === pictureProfil.length - 1) ? 0 : active + 2,
				active: active + 1,
				direction: "right",
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
				direction: "left",
      		})
    	} else if (active === pictureProfil.length - 1) {
      		this.setState({
        		prev: active - 2,
        		next: pictureProfil.length - 1,
				active: pictureProfil.length - 2,
				direction: "left",
      		})
    	} else {
      		this.setState({
        		prev: (active - 1 === 0) ? pictureProfil.length - 1 : active - 2,
        		next: active,
				active: active - 1,
				direction: "left",
      		})
    	}
	}
	  
	goToTheIndex = (index) => {
		const { pictureProfil } = this.props
		const { active } = this.state
		if (index === 0) {
			this.setState({
				prev: pictureProfil.length - 1,
        		next: index + 1,
				active: index,
				direction: "left",
			})
		} else if (index === pictureProfil.length - 1) {
			this.setState({
				prev: index - 1,
        		next: 0,
				active: index,
				direction: "right",
			})
		} else {
			this.setState({
				prev: index - 1,
        		next: index + 1,
				active: index,
				direction: (active > index) ? "left" : "right",
			})
		}
	}

	pictureComponent = (picture, direction, active) => {
		let newStyles = {}
		if (direction === "left" && active === false) {
			newStyles = {
				zIndex: 800,
				transform: "translateX(-100%)",
			}
		}
		if (active === true) {
			newStyles = {
				opacity: 1,
				position: "relative",
				zIndex: 900,
			}
		}
		if (direction === "right" && active === false) {
			newStyles = {
				zIndex: 800,
				transform: "translateX(100%)",
			}
		}
		return (
			<img
				src={ process.env.PUBLIC_URL + `/imageProfil/${picture.userId}/${picture.picture}` }
				alt={ `chut` }
				style={
					{
						...styles.picture,
						...newStyles,
					}
				}
			/>
		)
	}

  	render() {
	  	const { pictureProfil } = this.props
		const { prev, active, next, direction } = this.state
		if (pictureProfil === undefined) {
			return <div />
		}
		const pictureArray = []
		pictureProfil.forEach((picture, index) => {
			if (active === index) {
				if (direction === "left") {
					pictureArray.push(this.pictureComponent(pictureProfil[prev], direction, false))
				} else if (direction === "right") {
					pictureArray.push(this.pictureComponent(pictureProfil[next], direction, false))
				}
				pictureArray.push(this.pictureComponent(picture, null, true))
			}
		})
		const arrayButtonIndex = []
		pictureProfil.forEach((picture, index) => {
			arrayButtonIndex.push(index)
		})
		console.log(pictureArray)
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
    */

}

export default App
