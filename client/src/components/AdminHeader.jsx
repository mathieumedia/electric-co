import {useState, useEffect} from 'react'
import {
    styled, Divider,
    Typography, Menu, MenuItem,
    Box, Avatar, Toolbar
} from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import * as utils from '../middleware/utils'

import {useDispatch, useSelector} from 'react-redux'
import {logoutUser} from '../redux/actions/authActions'
import {deleteAllCustomers, clearCustomerAlert} from '../redux/actions/customerActions'
import {useNavigate} from 'react-router-dom'

import Popup from './Popup'

//#region ---------- ICONS --------------
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Confirmation from './Confirmation'
//#endregion

//#region  ---------- STYLED COMPOMENTS ---------
const AppBar = styled(MuiAppBar)(({theme, open}) => ({
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
    const [open, setOpen] = useState(false)

    const {customerAlert} = useSelector(state => state.customers)

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

    const handleDeleteNonAdmins = () => {
        setOpen(true)
        handleUserCloseMenu()
    }

    const handleConfirmDelete = () => {
        dispatch(deleteAllCustomers())
        setOpen(false)
        handleUserCloseMenu()
    }

    useEffect(() => {
        if(customerAlert){
            utils.Alert(customerAlert, dispatch, clearCustomerAlert)
        }
    })
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
                        <MenuItem onClick={handleDeleteNonAdmins}>
                            <Typography textAlign='center'>Delete Customers</Typography>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleLogout}>
                            <Typography textAlign='center'>Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
            <Popup title={"Are you sure you want to delete all customers?"} open={open}>
                <Confirmation cancel={() => setOpen(false)} confirm={handleConfirmDelete} />
            </Popup>
        </AppBar>
    )
}
