import React, {useState} from 'react'

import {
    Paper, Table, TableHead, Grid, TextField,
    TableRow, TableCell, TableBody, Button
} from '@mui/material';
import Popup from '../../../components/Popup'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {toast} from 'react-toastify'

import {deleteStatus, updateStatus, addStatus} from '../../../redux/actions/essentialActions'
import {useDispatch, } from 'react-redux'

export default function BillingStatusEssential({billingStatuses}) {
    const dispatch = useDispatch();
    const [newStatus, setNewStatus] = useState({name:''})
    const [open, setOpen] = useState(false)

    const handleNewStatus = () => {
        if(!newStatus.name){
            return toast("Please provide a Status name", {type: 'error'})
        }

        dispatch(addStatus(newStatus))
        resetNewStatus() 
    }

    const onEdit = status => {
        setOpen(true);
        setNewStatus(status)
    }

    const handleCancel = () => {
        setOpen(false);
        resetNewStatus()
    }

    const handleUpdate = () =>{
        if(!newStatus.name){
            return toast("Please provide a Status name", {type: 'error'})
        }

        dispatch(updateStatus(newStatus))
        resetNewStatus()
        setOpen(false)
    }

    const resetNewStatus = () => setNewStatus({name: ''})

    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={4}>
                            <Grid container spacing={2} sx={{display: 'flex', alignItems: 'center'}}>
                                <Grid item xs={12}>
                                    <TextField
                                        label={'Status Name'}
                                        placeholder='Status Name'
                                        value={!open ? newStatus?.name : ''}
                                        onChange={e => setNewStatus({...newStatus, name: e.target.value})} 
                                    />
                                </Grid>
                                <Grid item >
                                    <Button onClick={handleNewStatus}>Add Status</Button>
                                </Grid>
                                <Grid item >
                                    <Button 
                                        variant='outlined'
                                        onClick={resetNewStatus}>
                                            Clear
                                    </Button>
                                </Grid>
                                
                            </Grid>
                        </TableCell>
                    </TableRow>
                        
                    <TableRow>
                        <TableCell align='left'>#</TableCell>
                        <TableCell align='left'>Name</TableCell>
                        <TableCell align='center'>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {billingStatuses?.map((status, i) => (
                        <TableRow key={i} >
                            <TableCell align='left'>{i +1}</TableCell>
                            <TableCell align='left'>{status.name}</TableCell>
                            <TableCell sx={{display: 'flex', justifyContent: 'center'}}>
                                <DeleteIcon sx={{ml: 3, '&:hover': {cursor: 'pointer'}}} onClick={() => dispatch(deleteStatus(status._id))} />
                                <EditIcon sx={{ml: 3, '&:hover': {cursor: 'pointer'}}} onClick={() => onEdit(status)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            
            <Popup title={'Updating Status'} open={open}>
                <Grid container spacing={2} sx={{display: 'flex', alignItems: 'center', pt: 2}}>
                    <Grid item xs={12}>
                        <TextField
                            label={'Status Name'}
                            placeholder='Status Name'
                            value={newStatus?.name}
                            onChange={e => setNewStatus({...newStatus, name: e.target.value})} 
                        />
                    </Grid>
                    <Grid item >
                        <Button onClick={handleUpdate}>Update Status</Button>
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
