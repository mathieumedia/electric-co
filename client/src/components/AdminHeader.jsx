import {useState} from 'react'
import {
    styled, toolbar, AppBar,
    Typography, Menu, MenuItem,
    Box, Avatar, Toolbar
} from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import * as utils from '../middleware/utils'

import {useDispatch} from 'react-redux'
import {logoutUser} from '../redux/actions/authActions'
import {useNavigate} from 'react-router-dom'


//#region ---------- ICONS --------------
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
//#endregion

//#region  ---------- STYLED COMPOMENTS ---------
const AppBar2 = styled(MuiAppBar)(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        width: `calc(100% - ${utils.drawerWidth}px)`,
        marginLeft: `${utils.drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
    })
}))
//#endregion
export default function AdminHeader(props) {
    const [anchorElUser, setAnchorElUser] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUserOpenMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }
    const handleUserCloseMenu = (event) => {
        setAnchorElUser(null)
    }
    
    const handleLogout = () => {
        dispatch(logoutUser());
        handleUserCloseMenu();
        navigate('/')
    }
    return (
        <AppBar position='fixed' open={props.open}>
            <Toolbar>
                <IconButton 
                    color='inherit'
                    edge='start'
                    sx={{mr: 2, ...(props.open && {display: 'none'})}}
                    onClick={props.handleDrawerOpen}

                >
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6' noWrap component='div' sx={{color: 'white'}}>Electric Co</Typography>
                
                <Box sx={{flexGrow: 1, display: {xs: 'none', sm: 'flex', md: 'flex'}}} />

                <Box sx={{flexGrow: 0}}>
                    <IconButton
                        onClick={handleUserOpenMenu}
                        sx={{p: 0}}>
                        <Avatar src='/'  />
                    </IconButton>

                    <Menu
                        anchorEl={anchorElUser}
                        sx={{mt: '45px'}}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleUserCloseMenu}
                    >
                        <MenuItem onClick={handleLogout}>
                            <Typography textAlign='center'>Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
