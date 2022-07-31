import {useState} from 'react'
import {
    Button, Paper, InputAdornment,
    MenuItem, Stack, TextField
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import CreditCardForm from './CreditCardForm'
import ReactIcon from './ReactIcon'
import {MdAttachMoney} from 'react-icons/md'

export default function PaymentForm({handleClose, handleConfirm}) {
    const [payment, setPayment] = useState({
        paymentAmount: '',
        paymentMethod: "Checking/Saving",
        paymentDate: new Date(),
        creditCard: null,
        banking: {}
    })

    const paymentMethods = [{label: 'Checking/Saving'}, {label: 'Credit Card'}]

    const handleNewPaymentChange = e => {
        const {name, value} = e.target;

        switch(name){
            case "paymentMethod":
                setPayment({
                    ...payment,
                    paymentMethod: value,
                    banking: value === 'Checking/Saving' ? {} : null,
                    creditCard: value === 'Credit Card' ? {} : null
                })
                break;
            case 'routingNumber':
            case "accountNumber":
                setPayment({
                    ...payment,
                    banking: {
                        ...payment.banking,
                        [name]: value
                    }
                })
                break;
            case "cardHolder":
            case "cardNumber":
            case "expDate":
            case "zipcode":
            case "cvv":
                setPayment({
                    ...payment,
                    creditCard: {
                        ...payment.creditCard,
                        [name]: value
                    }
                })
                break;
            default: 
                setPayment({
                    ...payment,
                    [name]: value
                })
                break;
        }
    }
    return (
        <Stack spacing={2} sx={{p: 1, mx: 1}}>
            <DatePicker
                label="Payment Date" disabled
                value={payment.paymentDate}
                renderInput={(params) => <TextField {...params} />}
            />

            <Stack spacing={2} direction='row'>
                <TextField
                    label='Payment Method' select
                    value={payment?.paymentMethod}
                    onChange={handleNewPaymentChange} name='paymentMethod'
                >
                    {paymentMethods.map(method => (
                        <MenuItem key={method.label} value={method.label}>{method.label}</MenuItem>
                    ))}
                </TextField>

                <TextField
                    label='Payment Amount' type='number' name='paymentAmount'
                    value={payment?.paymentAmount} onChange={handleNewPaymentChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <ReactIcon icon={<MdAttachMoney  />} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            <Paper sx={{p:1, display: payment.paymentMethod === 'Credit Card' ? 'block' : 'none'}}>
                <CreditCardForm creditCard={payment?.creditCard} onChange={handleNewPaymentChange}  />
            </Paper>

            <Stack direction='row' spacing={2} sx={{display: payment?.paymentMethod === 'Checking/Saving' ? 'flex' : 'none'}}>
                <TextField
                    label='Routing Number' type='number' name='routingNumber'
                    value={payment?.banking?.routingNumber} onChange={handleNewPaymentChange}
                />
                <TextField
                    label='Account Number' type='number' name='accountNumber'
                    value={payment?.banking?.accountNumber} onChange={handleNewPaymentChange}
                />
            </Stack>

            <Stack direction='row' spacing={2} sx={{justifyContent: 'right'}}>
                <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                <Button onClick={() => handleConfirm(payment)}>Make Payment</Button>
            </Stack>

        </Stack>
    )
}
