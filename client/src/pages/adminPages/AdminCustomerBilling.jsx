import {useState} from 'react'
import {
    Grid, TextField, MenuItem, Button, Paper
} from '@mui/material'
import * as utils from '../../middleware/utils'

export default function AdminCustomerBilling() {
    const [newBill, setNewBill] = useState({year: new Date().getFullYear(), month: ''})

    const handleCreateNewBill = () => {
        utils.BeautifyAlert(newBill)
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <Paper sx={{p: 1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Year" value={newBill?.year}
                                select onChange={e => setNewBill({...newBill, year: e.target.value})}
                            >
                                <MenuItem disabled>Select Year</MenuItem>
                                {[2022, 2021, 2020].map(_year => (
                                    <MenuItem key={_year} value={_year}>{_year}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Month" value={newBill?.month}
                                select onChange={e => setNewBill({...newBill, month: e.target.value})}
                            >
                                <MenuItem disabled>Select Month</MenuItem>
                                {utils?.billingMonths().map(_month => (
                                    <MenuItem key={_month.value} value={_month.value}>{_month.label}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{alignItems: 'center', display: 'flex'}}>
                            <Button fullWidth onClick={handleCreateNewBill}>Create Bill</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}
