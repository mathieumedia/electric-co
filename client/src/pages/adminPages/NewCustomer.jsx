import {useState} from 'react'
import {
    Button, Grid, TextField, 
    MenuItem, Container
} from '@mui/material';

import {toast} from 'react-toastify'
import {addCustomer} from '../../redux/actions/customerActions'
import {useDispatch} from 'react-redux'

export default function NewCustomer({accountTypes}) {
    const dispatch = useDispatch()
    const resetNewCustomer = () => {
        return {
            accountType: accountTypes ? accountTypes[0]._id : '',
            firstName: '',
            lastName: '',
            organizationName: '',
            email: '',
            address: {zip: ''}
        }
    }

    const [newCustomer, setNewCustomer] = useState(resetNewCustomer)

    const isPersonal = (accountTypes?.find(a => a._id === newCustomer.accountType))?.name !== 'Commercial';

    const handleClear = () => setNewCustomer(resetNewCustomer)

    const handleSave = () => {
        if(!newCustomer.email || !newCustomer.address.zip){
            return toast("Please provide a valid email and/or zipcode", {type: 'error'})
        }

        if(isPersonal && (!newCustomer.firstName || !newCustomer.lastName)){
            return toast("Please provide a valid first and/or last names", {type: 'error'})
        }

        if(!isPersonal && !newCustomer.organizationName){
            return toast("Please provide a valid company names", {type: 'error'})
        }

        dispatch(addCustomer(newCustomer))
        //handleClear()
    }

    return (
        <Container maxWidth='sm'>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Account Type" select
                        value={newCustomer.accountType}
                        onChange={e => setNewCustomer({...newCustomer, accountType: e.target.value})}
                    >
                        <MenuItem value='' disabled>Select Type</MenuItem>
                        {accountTypes?.map(type =>(
                            <MenuItem value={type._id} key={type._id}>{type.name}</MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6} sx={{display: isPersonal ? 'block' : 'none'}}>
                    <TextField
                        label="First Name"
                        value={newCustomer?.firstName}
                        onChange={e => setNewCustomer({...newCustomer, firstName: e.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={6} sx={{display: isPersonal ? 'block' : 'none'}}>
                    <TextField
                        label="Last Name"
                        value={newCustomer?.lastName}
                        onChange={e => setNewCustomer({...newCustomer, lastName: e.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sx={{display: !isPersonal ? 'block' : 'none'}}>
                    <TextField
                        label="Organization Name"
                        value={newCustomer?.organizationName}
                        onChange={e => setNewCustomer({...newCustomer, organizationName: e.target.value})}
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        label="Email"
                        value={newCustomer?.email}
                        onChange={e => setNewCustomer({...newCustomer, email: e.target.value})}
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        label="Zip Code"
                        value={newCustomer?.address?.zip}
                        onChange={e => setNewCustomer({...newCustomer, address: {zip: e.target.value}})}
                    />
                </Grid>

                <Grid item > <Button onClick={handleSave}>Save</Button> </Grid>
                <Grid item> <Button onClick={handleClear} variant={'outlined'}>Clear</Button> </Grid>
            </Grid>
        </Container>
    )
}
