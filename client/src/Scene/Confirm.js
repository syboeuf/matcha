import React, { Component } from "react"

import { verifyKey } from "utils/fileProvider"

class Confirm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            key: this.props.match.params.key
        }
    }

    componentWillMount() {
        this.confirmKey();
    }

    confirmKey = () => {
        const { key } = this.state;
        verifyKey(key)
            .then((res) => {
                if (res.success) {
                    this.setState({ confirmed: true })
                }
            })
    }

    render() {
        const { confirmed } = this.state;
        const { history } = this.props;
        return (
            <div>
            {
                (confirmed) ? (
                    <div />
                ) : (
                    history.push('/')
                )
            }
            </div>
        )
    }

}

export default Confirm
