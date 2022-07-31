import React from 'react';
import {useTheme} from '@mui/material'
import { IconContext } from 'react-icons';

export default function ReactIcon({icon}) {
    const theme = useTheme()
    return (
        <IconContext.Provider value={{color: theme.palette.primary.main}}>
            <div style={{paddingRight:'5px'}}>
                {icon}
            </div>
        </IconContext.Provider>
    )
}