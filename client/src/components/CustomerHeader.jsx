import {useState} from 'react'
import {
    Typography, Menu, MenuItem,
    Box, Avatar, Toolbar, AppBar
} from '@mui/material'

import {useDispatch, } from 'react-redux'
import {logoutUser} from '../redux/actions/authActions'
import {useNavigate} from 'react-router-dom'


//#region ---------- ICONS --------------
import IconButton from '@mui/material/IconButton';
//#endregion


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
