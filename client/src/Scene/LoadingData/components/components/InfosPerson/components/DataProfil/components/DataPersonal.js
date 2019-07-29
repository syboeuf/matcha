import React from "react"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

import { getImageProfil } from "utils/fileProvider"

const styles = {
    popularityProgress: {
        backgroundColor: '#4A90E2',
        borderRadius: 15,
        padding: '5px 0px 5px 10px'
    },
    popularityScore: {
        textAlign: 'right',
        paddingTop: 20,
        fontSize: '1.5em',
        color: 'white',
        paddingRight: '5%'
    }
}

class DataPersonal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            profilePic: 'noImage.png'
        }
    }

    componentWillMount() {
        getImageProfil(this.props.dataPersonal.id)
            .then((res) => {
                this.setState({ profilePic: process.env.PUBLIC_URL + `/imageProfil/${this.props.dataPersonal.id}/${res.imageProfil[0].picture}` })
            })
            .catch((err) => console.log(err))
    }
    
    render() {
        const { dataPersonal } = this.props
        const { biography, populareScore, id } = dataPersonal
        
        return (
            <div>
                <img
                    style={{ width: 200, height: 200, borderRadius: '50%', objectFit: 'cover' }}
                    src={ this.state.profilePic }
                />
                <div style={ { ...styles.popularityProgress, width: `${populareScore}%` } }>
                    <span style={ styles.popularityScore }>{ populareScore }%</span>
                </div>
                <Paper>
                    <Typography variant="h5" component="h3">
                        Popular score
                    </Typography>
                    <Typography component="p">
                        { populareScore }
                    </Typography>
                </Paper>
                <Typography variant="h5" component="h3">
                    A propos
                </Typography>
                <Paper>
                    <Typography component="p">
                        { biography }
                    </Typography>
                </Paper>
            </div>
        )
    }
}

// const DataPersonal = ({ dataPersonal }) => {
//     const { biography, populareScore, id } = dataPersonal

//     return (
//         <div>
//             <img
//                 style={{ width: 200, height: 200, borderRadius: '50%', objectFit: 'cover' }}
//                 src="https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
//             />
//             <Paper>
//                 <Typography variant="h5" component="h3">
//                     Popular score
//                 </Typography>
//                 <Typography component="p">
//                     { populareScore }
//                 </Typography>
//             </Paper>
//             <Typography variant="h5" component="h3">
//                 A propos
//             </Typography>
//             <Paper>
//                 <Typography component="p">
//                     { biography }
//                 </Typography>
//             </Paper>
//         </div>
//     )
// }

export default DataPersonal
