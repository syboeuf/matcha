import React, { Component } from "react"
import { UserConsumer } from "store/UserProvider"
import { withRouter } from "react-router-dom"

import { deblockUser, getBlockList } from "utils/fileProvider"

class ListProfilBlock extends Component {

    static contextType = UserConsumer

    constructor(props) {
        super(props)
        this.state = { list: null }
    }

    componentWillMount() {
        const { dataUser } = this.context
        this.getNewListBlockProfil(dataUser.userName)
    }

    getListBlockProfil = () => {
        const { dataUser } = this.context
        getBlockList(dataUser.userName)
            .then((response) => this.setState({ list: response.blockList }))
            .catch((error) => console.log(error))
    }

    getNewListBlockProfil = (userName, nameProfilBlock) => {
        deblockUser(userName, nameProfilBlock)
            .then(() => this.getListBlockProfil())
            .catch((error) => console.log(error))
    }

    render() {
        const { list } = this.state
        const { dataUser } = this.context
        if (list === null) {
            return <div />
        }
        return (
            <div>
                {
                    list.length > 0
                    ? list.map((nameProfilBlock) => (
                        <div key={ `name-${nameProfilBlock.blockProfil}` }>
                            <p>{ nameProfilBlock.blockProfil }</p>
                            <button
                                onClick={ () => this.getNewListBlockProfil(dataUser.userName, nameProfilBlock.blockProfil) }
                                style={{
                                    padding: '20px',
                                    backgroundColor: '#c31e27',
                                    borderRadius: '5px',
                                    color: 'white'
                                }}
                            >
                                Delete of block list
                            </button>
                        </div>
                    ))
                    : <div>No results</div>
                }
            </div>
        )
    }

}

export default withRouter(ListProfilBlock)
