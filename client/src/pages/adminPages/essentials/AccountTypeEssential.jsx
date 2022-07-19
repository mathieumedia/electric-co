import React, {useState} from 'react'

import {
    Paper, Table, TableHead, Grid, TextField,
    TableRow, TableCell, TableBody, Button
} from '@mui/material';
import Popup from '../../../components/Popup'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {toast} from 'react-toastify'

import {deleteAccountType, updateAccountType, addAccountType} from '../../../redux/actions/essentialActions'
import {useDispatch, } from 'react-redux'

export default function AccountTypeEssential({accountTypes}) {
    const dispatch = useDispatch();
    const [newAccountType, setNewAccountType] = useState({name:'', rate: 0})
    const [open, setOpen] = useState(false)

    const handleNewAccountType = () => {
        if(!newAccountType.name || !newAccountType.rate){
            return toast("Please provide a Account Type name and/or rate", {type: 'error'})
        }

        dispatch(addAccountType(newAccountType))
        resetNewAccountType()
    }

    const onEdit = account=> {
        setOpen(true);
        setNewAccountType(account)
    }

    const handleCancel = () => {
        setOpen(false);
        resetNewAccountType()
    }

    const handleUpdate = () =>{
        if(!newAccountType.name || !newAccountType.rate){
            return toast("Please provide a Account Type name and/or rate", {type: 'error'})
        }

        dispatch(updateAccountType(newAccountType))
        resetNewAccountType()
        setOpen(false)
    }

    const resetNewAccountType = () => setNewAccountType({name: '', rate: 0})

    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={4}>
                            <Grid container spacing={2} sx={{display: 'flex', alignItems: 'center'}}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label={'Account Type Name'}
                                        placeholder='Account Type Name'
                                        value={!open ? newAccountType?.name : ''}
                                        onChange={e => setNewAccountType({...newAccountType, name: e.target.value})} 
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label={'Account Type Rate'}
                                        placeholder='Account Type Rate' type='number'
                                        value={!open ? newAccountType?.rate: 0}
                                        onChange={e => setNewAccountType({...newAccountType, rate: e.target.value})} 
                                    />
                                </Grid>
                                <Grid item >
                                    <Button onClick={handleNewAccountType}>Add Account Type</Button>
                                </Grid>
                                <Grid item >
                                    <Button 
                                        variant='outlined'
                                        onClick={resetNewAccountType}>
                                            Clear
                                    </Button>
                                </Grid>
                                
                            </Grid>
                        </TableCell>
                    </TableRow>
                        
                    <TableRow>
                        <TableCell align='left'>#</TableCell>
                        <TableCell align='left'>Name</TableCell>
                        <TableCell align='left'>Rate</TableCell>
                        <TableCell align='center'>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {accountTypes?.map((accType, i) => (
                        <TableRow key={i} >
                            <TableCell align='left'>{i +1}</TableCell>
                            <TableCell align='left'>{accType.name}</TableCell>
                            <TableCell align='left'>{accType.rate}</TableCell>
                            <TableCell sx={{display: 'flex', justifyContent: 'center'}}>
                                <DeleteIcon sx={{ml: 3, '&:hover': {cursor: 'pointer'}}} onClick={() => dispatch(deleteAccountType(accType._id))} />
                                <EditIcon sx={{ml: 3, '&:hover': {cursor: 'pointer'}}} onClick={() => onEdit(accType)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            
            <Popup title={'Updating Account Type'} open={open}>
                <Grid container spacing={2} sx={{display: 'flex', alignItems: 'center', pt: 2}}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={'Account Type Name'}
                            placeholder='Account Type Name'
                            value={newAccountType?.name}
                            onChange={e => setNewAccountType({...newAccountType, name: e.target.value})} 
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={'Account Type Rate'}
                            placeholder='Account Type Rate'
                            value={newAccountType?.rate}
                            onChange={e => setNewAccountType({...newAccountType, rate: e.target.value})} 
                        />
                    </Grid>
                    <Grid item >
                        <Button onClick={handleUpdate}>Update Account Type</Button>
                    </Grid>

                    <Grid item >
                        <Button 
                            variant='outlined'
                            onClick={handleCancel}>
                                Cancel
                        </Button>
                    </Grid>
                    
                </Grid>
            </Popup>
        </Paper>
    )
}
