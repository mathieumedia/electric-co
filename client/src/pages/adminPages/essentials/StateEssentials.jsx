import React, {useState} from 'react'

import {
    Paper, Table, TableHead, Grid, TextField,
    TableRow, TableCell, TableBody, Button
} from '@mui/material';
import Popup from '../../../components/Popup'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {toast} from 'react-toastify'

import {deleteState, updateState, addState} from '../../../redux/actions/essentialActions'
import {useDispatch, } from 'react-redux'

export default function StateEssential({states}) {
    const dispatch = useDispatch();
    const [newState, setNewState] = useState({name:'', abbr: ''})
    const [open, setOpen] = useState(false)

    const handleNewState = () => {
        if(!newState.name || !newState.abbr){
            return toast("Please provide a State name and/or abbreviation", {type: 'error'})
        }

        dispatch(addState(newState))
        resetNewState()
    }

    const onEdit = state => {
        setOpen(true);
        setNewState(state)
    }

    const handleCancel = () => {
        setOpen(false);
        resetNewState()
    }

    const handleUpdate = () =>{
        if(!newState.name || !newState.abbr){
            return toast("Please provide a State name and/or abbreviation", {type: 'error'})
        }

        dispatch(updateState(newState))
        resetNewState()
        setOpen(false)
    }

    const resetNewState = () => setNewState({name: '', abbr: ''})

    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={4}>
                            <Grid container spacing={2} sx={{display: 'flex', alignItems: 'center'}}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label={'State Name'}
                                        placeholder='State Name'
                                        value={!open ? newState?.name : ''}
                                        onChange={e => setNewState({...newState, name: e.target.value})} 
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label={'State Abbreviation'}
                                        placeholder='State Abbreviation'
                                        value={!open ? newState?.abbr : ''}
                                        onChange={e => setNewState({...newState, abbr: e.target.value})} 
                                    />
                                </Grid>
                                <Grid item >
                                    <Button onClick={handleNewState}>Add State</Button>
                                </Grid>
                                <Grid item >
                                    <Button 
                                        variant='outlined'
                                        onClick={resetNewState}>
                                            Clear
                                    </Button>
                                </Grid>
                                
                            </Grid>
                        </TableCell>
                    </TableRow>
                        
                    <TableRow>
                        <TableCell align='left'>#</TableCell>
                        <TableCell align='left'>Name</TableCell>
                        <TableCell align='left'>Abbreviation</TableCell>
                        <TableCell align='center'>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {states?.map((state, i) => (
                        <TableRow key={i} >
                            <TableCell align='left'>{i +1}</TableCell>
                            <TableCell align='left'>{state.name}</TableCell>
                            <TableCell align='left'>{state.abbr}</TableCell>
                            <TableCell sx={{display: 'flex', justifyContent: 'center'}}>
                                <DeleteIcon sx={{ml: 3, '&:hover': {cursor: 'pointer'}}} onClick={() => dispatch(deleteState(state._id))} />
                                <EditIcon sx={{ml: 3, '&:hover': {cursor: 'pointer'}}} onClick={() => onEdit(state)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            
            <Popup title={'Updating State'} open={open}>
                <Grid container spacing={2} sx={{display: 'flex', alignItems: 'center', pt: 2}}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={'State Name'}
                            placeholder='State Name'
                            value={newState?.name}
                            onChange={e => setNewState({...newState, name: e.target.value})} 
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={'State Abbreviation'}
                            placeholder='State Abbreviation'
                            value={newState?.abbr}
                            onChange={e => setNewState({...newState, abbr: e.target.value})} 
                        />
                    </Grid>
                    <Grid item >
                        <Button onClick={handleUpdate}>Update State</Button>
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
