import {useState, useEffect} from 'react'
import {
    Grid, TextField, Button, MenuItem,
    ButtonGroup, Stack, Typography, 
} from '@mui/material'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import {getName, } from '../../middleware/utils'
import Address from '../../components/Address'

export default function AdminCustomerProfile({account, essentials}) {
    const [profile, setProfile] = useState(null)
    const [onEdit, setOnEdit] = useState(false)

    useEffect(() => {
        if(account && !onEdit){
            setProfile(account)
        }
    },[account, onEdit])

    const handleEdit = () => {
        setOnEdit(true)
    }

    const handleUpdate = () => {
        setOnEdit(false)
    }

    const handleCancel = () => {
        setOnEdit(false)
    }

    const isPersonal = () => {
        if(essentials && profile){
            const type = essentials.accountTypes.find(acc => acc._id === profile.accountType)
            return type?.name === 'Personal' ? true : false
        }
    }

    const handleChange = e => {
        const {name, value} = e.target;

        switch(name){
            case 'street':
            case 'aptNum':
            case 'city':
            case 'state':
            case 'zip':
                setProfile({...profile, address: {...profile.address, [name]: value}})
                break;
            default:
                setProfile({...profile, [name]: value})
                break;
        }
    }

    

    return (
        <Grid container spacing={2}>
            <Grid 
                item xs={12} sx={{display: 'flex', justifyContent: 'space-between'}}
            >
                <Stack spacing={2} direction={'row'} sx={{alignItems: 'center'}}>
                    <Typography >Account Type</Typography>
                    <Typography variant='shaded'>{getName(essentials?.accountTypes, profile?.accountType)}</Typography>
                </Stack>
                <Button onClick={handleEdit} sx={{display: onEdit ? 'none' : 'block'}}>
                    Edit
                </Button>

                <ButtonGroup sx={{display: !onEdit ? 'none' : 'flex'}}>
                    <Button size='small' variant='contained' onClick={handleUpdate}>
                        Update
                    </Button>
                    <Button size='small' onClick={handleCancel}>
                        Cancel
                    </Button>
                </ButtonGroup>
            </Grid>

            <Grid item xs={12} md={5} sx={{display: isPersonal() ? 'block' : 'none'}}>
                <TextField
                    disabled={!onEdit} label='First Name'
                    value={profile?.firstName || ''}
                    name='firstName' onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} md={2} sx={{display: isPersonal() ? 'block' : 'none'}}>
                <TextField
                    disabled={!onEdit} label='Middle Name'
                    value={profile?.middleName || ''}
                    name='middleName' onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} md={isPersonal() ? 5 : 12}>
                <TextField
                    disabled={!onEdit} 
                    label={isPersonal() ? 'Last Name' : 'Organization Name'}
                    value={profile ? (isPersonal() ? profile?.lastName : profile?.organizationName) : ''}
                    name={isPersonal() ? 'lastName' : 'organizationName'}
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={12} md={6} sx={{display: isPersonal() ? 'block' : 'none'}}>
                <DatePicker
                    views={["year", "month", "day"]}
                    disableFuture disabled={!onEdit}
                    label='Date Of Birth' value={profile?.dateOfBirth || ''}
                    onChange={(newValue) => handleChange({target: {name: 'dateOfBirth', value: newValue}})}
                    renderInput={(params) => <TextField {...params}  />} 
                />
            </Grid>

            <Grid item xs={12} md={6} >
                <TextField
                    disabled={!onEdit} label='Phone'
                    value={profile?.phone || ''}
                    name='phone' onChange={handleChange}
                />
            </Grid>

            <Grid item xs={12} md={6} >
                <TextField
                    disabled={!onEdit} label='Email'
                    value={profile?.email || ''}
                    name='email' onChange={handleChange}
                />
            </Grid>

            <Grid item xs={12} md={6} sx={{display: isPersonal() ? 'block' : 'none'}}>
                <TextField
                    disabled={!onEdit} label='Gender'
                    value={profile?.gender || ''} select
                    name='gender' onChange={handleChange}
                >
                    <MenuItem disabled>Select Gender</MenuItem>
                    {essentials?.genders?.map(gender => (
                        <MenuItem key={gender._id} value={gender._id}>{gender.name}</MenuItem>
                    ))}
                </TextField>
            </Grid>

            <Grid item xs={12}>
                <Address address={profile?.address} handleChange={handleChange} onEdit={onEdit} states={essentials?.states} />
            </Grid>
        </Grid>
    )
}
