import React from 'react'
import {
    TextField, Stack, InputAdornment
} from '@mui/material'
import ReactIcon from './ReactIcon'
import {DatePicker} from '@mui/x-date-pickers'
import {BsCreditCard2Front} from 'react-icons/bs'
import {RiVisaFill, RiMastercardLine} from 'react-icons/ri'
import {GrAmex} from 'react-icons/gr'
import {SiDiscover} from 'react-icons/si'


export default function CreditCardForm({creditCard, onChange}) {
    const handleIcon = value => {
        if(value){
            switch(value[0]){
                case '3':
                    return <GrAmex  />
                case '4':
                    return <RiVisaFill  />
                case '5':
                    return <RiMastercardLine  />
                case '6':
                    return <SiDiscover  />
                default:
                    return <BsCreditCard2Front  />
            }
        }
    }
    return (
        <Stack spacing={2}>
            <TextField
                label={'Card Holder Name'} value={creditCard?.cardHolder}
                name='cardHolder' onChange={onChange}
            />
            <TextField
                label={'Card Number'} value={creditCard?.cardNumber}
                name='cardNumber' onChange={onChange} type='number'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <ReactIcon icon={handleIcon(creditCard?.cardNumber)}  />
                        </InputAdornment>
                    )
                }}
            />

            <Stack spacing={2} direction='row'>
                <DatePicker
                views={["month", "year"]}
                    label="Payment Date" value={creditCard?.expDate}
                    onChange={(newValue) => onChange({target: {name: 'expDate', value: newValue}})}
                    renderInput={(params) => <TextField {...params} />}
                />

                <TextField
                    label={'CVV'} value={creditCard?.cvv}
                    name='cvv' onChange={onChange} type='number'
                />
                <TextField
                    label={'Zip code'} value={creditCard?.zipcode}
                    name='zipcode' onChange={onChange}  type='number'
                />
            </Stack>
        </Stack>
    )
}
