import {useState} from 'react'
import {styled, Box, CssBaseline} from '@mui/material'
import * as utils from '../middleware/utils'

import CustomerHeader from './CustomerHeader'


//#region --------- STYLED COMPONENTS ----
const Main = styled(Box)(({theme}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
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
    
    return (
        <Div>
            <CssBaseline  />
            <CustomerHeader />
            <Main >
                <DrawerHeader  />
                {props.children}
            </Main>
        </Div>
    )
}
