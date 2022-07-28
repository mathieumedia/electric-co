import {useState} from 'react'
import {
    Grid, TextField, MenuItem, Button, Paper, 
    Typography, Stack, Divider
} from '@mui/material'
import * as utils from '../../middleware/utils'
import AdminCustomerBillingTable from './AdminCustomerBillingTable'
import { Box } from '@mui/system'


export default function AdminCustomerBilling({newBillObject, account, essentials}) {
    
    
    const [selectedBill, setSelectedBill] = useState(null)
    const handleSelectedBill = bill => {
        setSelectedBill(bill)
    }

    const selectedBillObj = {
        selectedBill,
        setSelectedBill,
        handleSelectedBill
    }

    function SelectedBillPrompt (){
        return (
            <Paper sx={{display: !selectedBill ? 'block' : 'none'}}>
                <Typography variant='h6'>Select Bill to Preview</Typography>
            </Paper>
        )
    }

    function Row({label, value}){
        return (
            <Box sx={{display: 'flex', flexDiretion: 'row', alignItems: 'center'}}>
                <Typography align='center' sx={{flexGrow: 1}}>
                    {`${label}: ${value}`}
                </Typography>
            </Box>
        )
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <Paper sx={{p: 1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Year" value={newBillObject?.newBill?.year}
                                select onChange={e => newBillObject?.setNewBill({...newBillObject?.newBill, year: e.target.value})}
                            >
                                <MenuItem disabled>Select Year</MenuItem>
                                {[2022, 2021, 2020].map(_year => (
                                    <MenuItem key={_year} value={_year}>{_year}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Month" value={newBillObject?.newBill?.month}
                                select onChange={e => newBillObject?.setNewBill({...newBillObject?.newBill, month: e.target.value})}
                            >
                                <MenuItem disabled>Select Month</MenuItem>
                                {utils?.billingMonths().map(_month => (
                                    <MenuItem key={_month.value} value={_month.value}>{_month.label}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{alignItems: 'center', display: 'flex'}}>
                            <Button fullWidth onClick={newBillObject?.handleCreateNewBill}>Create Bill</Button>
                        </Grid>

                        <Grid item xs={12}>
                            <AdminCustomerBillingTable 
                                selectedBillObj={selectedBillObj}
                                monthlyBills={account?.monthlyBills} 
                                essentials={essentials} />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
                <SelectedBillPrompt />
                <Paper sx={{display: selectedBill ? 'block' : 'none'}}>
                    <Stack spacing={1} sx={{py:2}}>
                        <Divider>Billing Details</Divider>
                        <Row 
                            label={'Billing Period'} value={`${utils.shortDate(selectedBill?.billingStart)} - ${utils.shortDate(selectedBill?.billingEnd)}`} 
                        />
                        <Row 
                            label={'Due Date'} value={`${utils.shortDate(selectedBill?.dueDate)}`} 
                        />
                        <Row 
                            label={'Date Paid'} value={`${utils.shortDate(selectedBill?.paidDate)}`} 
                        />
                        <Row 
                            label={'Charge Amount'} value={`${utils.formatCurrency(selectedBill?.chargeAmount)}`} 
                        />
                        <Row 
                            label={'Credit Amount'} value={`${utils.formatCurrency(selectedBill?.credit)}`} 
                        />
                        <Row 
                            label={'Balance'} value={`${utils.formatCurrency(selectedBill?.balance)}`} 
                        />
                        <Row 
                            label={'Bill Status'} value={`${utils.getName(essentials?.billingStatuses, selectedBill?.status)}`} 
                        />
                        <Row 
                            label={'Kw Used'} value={`${selectedBill?.totalKwUsed} Kw`} 
                        />
                    </Stack>
                </Paper>
            </Grid>
            
        </Grid>
    )
}


