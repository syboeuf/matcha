import React, { createContext, Component } from "react"

export const UserContext = createContext(true)

class UserProvider extends Component {

    state = {
        dataUser: undefined,
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
