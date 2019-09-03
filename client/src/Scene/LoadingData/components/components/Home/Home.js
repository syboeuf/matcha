import React, { Component } from "react"
import { ReactComponent as Pattern } from '../../../../../pattern.svg'
import { UserConsumer } from "store/UserProvider";
import { blockList } from "utils/fileProvider"

class Home extends Component {

	static contextType = UserConsumer

	constructor(props) {
		super(props);
		this.state = {
			profiles: []
		}
	}

	// componentWillMount() {
	// 	const { socket } = this.context
	// 	socket.on("INLINE_USER_CONNECTED", this.inlineUser)
	// 	socket.emit("INLINE_USER_CONNECTED")
	// }

	// componentWillUnmount() {
	// 	const { socket } = this.context
	// 	socket.off("INLINE_USER_CONNECTED")
	// }

	// inlineUser = (userConnected) => {
	// 	this.setState({ userConnected })
	// } 

	componentWillMount() {
		const { dataUser } = this.context
		blockList(dataUser.userName)
			.then((response) => console.log(response))
			.catch((error) => console.log(error))
	}

	render() {
		const { dataUser } = this.context
		const { profiles } = this.state
		return <div />
		return (
			<div>
				<div style={{ position: 'absolute', width: '100%', zIndex: 2 }}>
					<div style={{ display: 'table', margin: '0 auto'}}>
						<h1>Welcome on Matcha</h1>
					</div>
					<div style={{ display: 'table', margin: '0 auto'}}>
						<h2><span style={{ fontWeight: 'lighter', fontStyle: 'italic' }}>{ dataUser.userName }</span>, some profiles for you:</h2>
					</div>
					<div style={{display: 'flex', flexWrap: 'wrap'}}>
						{
							profiles.map((profile) => {
								return (
									<div className="col" style={{ textAlign: 'center', margin: 20 }} key={`user-${profile.userName}`}>
										<img src={`${process.env.PUBLIC_URL}/imageProfil/${profile.id}/${profile.picture}`} alt="profile-pic" style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: '50%' }}/>
										<p style={{paddingLeft: 20, paddingRight: 20, wordBreak: 'break-word'}}>{profile.userName} ({profile.age} ans)</p>
									</div>
								)
							})
						}
					</div>
				</div>
			</div>
		)
	}
}

export default Home
