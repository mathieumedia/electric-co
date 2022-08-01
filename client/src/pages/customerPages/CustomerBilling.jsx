import {useState} from 'react'
import {
    Grid, Button, Paper, 
    Typography, Stack, Divider, Box,
} from '@mui/material'
import * as utils from '../../middleware/utils'
import CustomerBillingTable from './CustomerBillingTable'

import Popup from '../../components/Popup'
import BillChart from '../../components/BillChart'
import PaymentForm from '../../components/PaymentForm'

export default function CustomerBilling(props) {
    const {
        account, 
        essentials, confirmPayment
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
        return balance
    }


    //#region PAYMENT ----
    const handleConfirm = payment =>{
        confirmPayment({...payment, customerId: account._id,})
        //setOpen(false)
    }

    const handleClose = () => {
        setOpen(false)
    }

    //#endregion

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper sx={{p: 1}}>
                    <Stack direction='row' spacing={2}>
                        <Typography variant='h6' align='left'>
                            {`Account Balance: ${utils.formatCurrency(calculateAccountBalance())}`}
                        </Typography>

                        <Button
                            onClick={() => setOpen(true)}
                            sx={{display: calculateAccountBalance() > 0 ? 'block' : 'none'}}
                        >
                            Make Payment
                        </Button> 
                    </Stack>
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
                        <Grid item xs={12}>
                            <CustomerBillingTable 
                                selectedBillObj={selectedBillObj}
                                monthlyBills={account?.monthlyBills} 
                                essentials={essentials}
                                />
                        </Grid>
                    </Grid>
                    <Popup open={open} title={"New Payment"} handleClose={handleClose}>
                        {open ? <PaymentForm handleClose={handleClose} handleConfirm={handleConfirm} /> : null}
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


