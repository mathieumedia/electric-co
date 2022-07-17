import {useState} from 'react'
import {
    Drawer, styled, IconButton,
    List, Divider, ListItemButton, 
    ListItemText, ListItemIcon,
    useTheme
} from '@mui/material'
import * as utils from '../middleware/utils';
import {Link} from 'react-router-dom'

//#region ---------- ICONS --------
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PeopleIcon from '@mui/icons-material/People';
import { useTabsList } from '@mui/base';
//#endregion

const linkStyle = {textDecoration: 'none'}

//#region ------ STYLED COMPONENTS --------
const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0),
    margin: theme.spacing(0),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
}))


export default function AdminSidebar(props) {
    const theme = useTheme();

    return (
        <Drawer
            sx={{
                width: utils.drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: utils.drawerWidth,
                    boxSizing: 'border-box'
                }
            }}
            variant='persistent' anchor='left' open={props.open}
        >
            <DrawerHeader>
                <IconButton onClick={props.handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon  /> : <ChevronRightIcon  />}
                </IconButton>
            </DrawerHeader>
            
            <Divider  />

            <List sx={{px: 0, m: 0}}>
                <Link to={'/admin/essentials'} style={linkStyle}>
                    <ListItemButton sx={{pl: 4}}>
                        <ListItemIcon>
                            <AccountTreeIcon  />
                        </ListItemIcon>
                        <ListItemText primary="Essentials"  />
                    </ListItemButton>
                </Link>
                <Link to={'/admin/customers'} style={linkStyle}>
                    <ListItemButton sx={{pl: 4}}>
                        <ListItemIcon>
                            <PeopleIcon  />
                        </ListItemIcon>
                        <ListItemText primary="Customers"  />
                    </ListItemButton>
                </Link>
            </List>

        </Drawer>
    )
}
