import React, { Component } from "react"
import { UserConsumer } from "store/UserProvider"
import { recommended } from "utils/fileProvider"

class Home extends Component {

	static contextType = UserConsumer

	constructor(props) {
		super(props);
		this.state = {
			recommended: []
		}
		this._isMounted = true
	}

	componentWillMount() {
		const { dataUser } = this.context
		recommended(dataUser.userName, dataUser.orientation, dataUser.age)
			.then((res) => {
				if (this._isMounted === true) {
					this.setState({ recommended: res.recommended })
				}
			})
			.catch((error) => console.log(error))
	}

	componentWillUnmount() {
		this._isMounted = false
	}

	onClick = (id, profilName) => {
		const { history } = this.props
		const { dataUser } = this.context
		history.push("/InfosPerson", { data: { id, userName: dataUser.userName, profilName } })
	}

	render() {
		const { dataUser } = this.context
        if (dataUser === undefined) {
            return <div />
        }
        const {
            age, biography, gender, orientation, listInterest,
        } = dataUser
        if (!age || !biography || !gender || !orientation || !listInterest) {
            return (
                <div style={{textAlign: 'center', marginTop: 200, fontSize: '1.6em', color: 'gray'}}>
                    Update your profile first to access this page
                </div>
            )
		}
		const { recommended } = this.state
		return (
			<div>
				<div style={{ position: 'absolute', width: '100%', zIndex: 2 }}>
					<div style={{ display: 'table', margin: '0 auto'}}>
						<h1>Welcome on Matcha</h1>
					</div>
					<div style={{ display: 'table', margin: '0 auto'}}>
						<h2><span style={{ fontWeight: 'lighter', fontStyle: 'italic' }}>{ dataUser.userName }</span>, some profiles for you:</h2>
					</div>
					<div className="center" style={{display: 'flex', flexWrap: 'wrap', width: '90%', justifyContent: 'center' }}>
						{
							recommended.map((profile) => {
								return (
									<div onClick={ () => this.onClick(profile.id, profile.userName) } className="col" style={{ textAlign: 'center', margin: 20 }} key={`user-${profile.userName}`}>
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
