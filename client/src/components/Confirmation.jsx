import React from 'react'
import {
    Button, Stack
} from '@mui/material'


export default function Confirmation({cancel, confirm}) {
    return (
            <Stack spacing={2} direction={'row'} sx={{display: 'flex', justifyContent: 'right'}}>
                <Button onClick={confirm}>Yes</Button>
                <Button variant='outlined' onClick={cancel}>No</Button>
            </Stack>
    )
}
