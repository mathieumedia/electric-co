import React from 'react'
import {Box, styled} from '@mui/material'
import Color from 'color'
import * as utils from '../middleware/utils'

const Glass = styled(Box)(({theme, ...props}) => ({
    padding: theme.spacing(2),
    borderRadius: props.square ? null : 20,
    borderLeft: props.noBorder ? null : `solid 1px ${Color(theme.palette.black).alpha(0.3).toString()}`,
    borderTop: props.noBorder ? null : `solid 1px ${Color(theme.palette.black).alpha(0.3).toString()}`,
    ...utils.Glass(theme.palette.black)
}))

export default function GlassCard(props) {
    return (
        <Glass {...props}>
            {props.children}
        </Glass>
    )
}
