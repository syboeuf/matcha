import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import ListItemText from "@material-ui/core/ListItemText"

const StyledMenu = withStyles({
    paper: { border: "1px solid #d3d4d5" },
})(props => (
    <Menu
        elevation={ 0 }
        getContentAnchorEl={ null }
        anchorOrigin={ {
            vertical: "bottom",
            horizontal: "center",
        } }
        transformOrigin={ {
            vertical: "top",
            horizontal: "center",
        } }
        { ...props }
    />
))

const StyledMenuItem = withStyles((theme) => ({
    root: {
        "&:focus": {
            backgroundColor: theme.palette.primary.main,
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem)

export default function CustomizedMenus(props) {

    const [anchorEl, setAnchorEl] = React.useState(null)

    function handleClick(event) {
        setAnchorEl(event.currentTarget)
    }

    function handleClose() {
        setAnchorEl(null)
    }

    return (
        <div>
            <div
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={ handleClick }
            >
                { props.title }
            </div>
            <StyledMenu
                id="customized-menu"
                anchorEl={ anchorEl }
                keepMounted
                open={ Boolean(anchorEl) }
                onClose={ handleClose }
            >
                {
                    (props.array.length > 0)
                        ?
                            (
                                props.array.map((data, index) => (
                                    <StyledMenuItem key={ `notification-${index}` }>
                                    <ListItemText primary={ data } />
                                    </StyledMenuItem>
                                ))
                            )
                        : null
                }
            </StyledMenu>
        </div>
    )
}