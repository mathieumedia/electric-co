import {useState} from 'react'
import {
    Grid, TextField, MenuItem, Button, Paper, 
    Typography, Stack, Divider, Box
} from '@mui/material'
import * as utils from '../../middleware/utils'
import AdminCustomerBillingTable from './AdminCustomerBillingTable'

import Popup from '../../components/Popup'
import BillChart from '../../components/BillChart'

export default function AdminCustomerBilling(props) {
    const {
        newBillObject, account, 
        essentials, creditObj
    } = props

    //#region ----Selected Bill ----
    
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
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Typography align='center' sx={{flexGrow: 1}}>
                    {`${label}: ${value}`}
                </Typography>
            </Box>
        )
    }

    //#endregion ---

    const [open, setOpen] = useState(false)


    function calculateAccountBalance(){
        let balance = 0
        balance = account?.monthlyBills?.reduce((acc, bill) => {return acc + bill.balance}, 0)
        return utils.formatCurrency(balance)
    }

    const handleConfirm = () =>{
        creditObj?.confirmCredit()
        setOpen(false)
    }

    const handleCredit = (bill) => {
        setOpen(true)
        creditObj?.initializeNewCredit(bill)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper sx={{p: 1}}>
                    <Typography variant='h6' align='left'>
                        {`Account Balance: ${calculateAccountBalance()}`}
                    </Typography>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                {selectedBill 
                    ?   <BillChart bill={selectedBill} /> 
                    :   <SelectedBillPrompt  />
                }
            </Grid>

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
                                essentials={essentials}
                                handleCredit={handleCredit} />
                        </Grid>
                    </Grid>
                    <Popup open={open} title={"Apply Credit"} clickAway handleClose={handleClose}>
                        <Stack spacing={2} direction='row' sx={{pt: 1}}>
                            <TextField
                                type='number' autoFocus={true}
                                label='Credit Amount' name='creditAmount'
                                value={creditObj?.newCredit?.creditAmount}
                                onChange={creditObj?.handleCreditChange}
                            />
                            <Button size='small' onClick={handleConfirm}>Apply</Button>
                            <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                        </Stack>   
                    </Popup>
                </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
                <SelectedBillPrompt />
                <Paper sx={{display: selectedBill ? 'block' : 'none', px: 1}}>
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


