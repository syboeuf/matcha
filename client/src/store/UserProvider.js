import React, { createContext, Component } from "react"

export const UserContext = createContext(true)

class UserProvider extends Component {

    state = {
        dataUser: undefined,
        socket: null,
        setSocket: (socket) => this.setState({ socket }),
        setNewDataUser: (dataUser) => this.setState({ dataUser }),
    }
    
    render() {
        return (
            <UserContext.Provider value={ this.state }>
                { this.props.children }
            </UserContext.Provider>
        )
    }

}

export const UserConsumer = UserContext
export default UserProvider
