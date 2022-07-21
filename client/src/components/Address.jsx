import React, {useEffect, useState} from 'react'
import {
    Grid, TextField, MenuItem, Divider
} from'@mui/material';

export default function Address({address, handleChange, onEdit, states}) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Divider>Address</Divider>
            </Grid>
            <Grid item xs={12} md={10}>
                <TextField
                    label='Street Address' name='street'
                    value={address?.street || ''}
                    onChange={handleChange} disabled={!onEdit}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <TextField
                    label='Apt #' name='aptNum'
                    value={address?.aptNum || ''}
                    onChange={handleChange} disabled={!onEdit}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField
                    label='City' name='city'
                    value={address?.city || ''}
                    onChange={handleChange} disabled={!onEdit}
                />
            </Grid>
            <Grid item xs={12} md={4}> 
                <TextField
                    label='State' name='state'
                    value={address?.state || ''} select
                    onChange={handleChange} disabled={!onEdit}
                >
                    <MenuItem disabled>Select State</MenuItem>
                    {states?.map(state => (
                        <MenuItem key={state._id} value={state._id}>{state.name}</MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12} md={4}> 
                <TextField
                    label='Zipcode' name='zip'
                    value={address?.zip || ''}
                    onChange={handleChange} disabled={!onEdit}
                />
            </Grid>
        </Grid>
    )
}
