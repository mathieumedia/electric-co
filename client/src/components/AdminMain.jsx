import {useState} from 'react'
import {styled, Box, CssBaseline} from '@mui/material'
import * as utils from '../middleware/utils'

import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

//#region --------- STYLED COMPONENTS ----
const Main = styled(Box)(({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${utils.drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: theme.spacing(0)
    })
}))

const Div = styled(Box)(({theme}) => ({
    display: 'flex',
    height: '100vh',
    maxHeight: '100vh',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    ...utils.BgImage()
}))

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
}))
//#endregion

export default function AdminMain(props) {
    const [open, setOpen] = useState(false);
    
    return (
        <Div>
            <CssBaseline  />
            <AdminHeader open={open} handleDrawerOpen={() => setOpen(true)} />
            <AdminSidebar open={open} handleDrawerClose={() => setOpen(false)} />
            <Main open={open} >
                <DrawerHeader  />
                {props.children}
            </Main>
        </Div>
    )
}
