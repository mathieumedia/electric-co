import React from 'react'
import {Container, Button, Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom'
export default function NotFound() {
    const navigate = useNavigate()
    return (
        <Container maxWidth='sm' sx={{pt: '15%'}}>
            <Typography variant='h1'>PAGE NOT FOUND</Typography>
            <Button size="large" onClick={() => navigate('/')}>Go Home</Button>
        </Container>
    )
}
