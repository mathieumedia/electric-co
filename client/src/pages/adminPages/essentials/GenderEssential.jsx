import React, {useState} from 'react'

import {
    Paper, Table, TableHead, Grid, TextField,
    TableRow, TableCell, TableBody, Button
} from '@mui/material';
import Popup from '../../../components/Popup'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {toast} from 'react-toastify'

import {deleteGender, updateGender, addGender} from '../../../redux/actions/essentialActions'
import {useDispatch, } from 'react-redux'

export default function GenderEssential({genders}) {
    const dispatch = useDispatch();
    const [newGender, setNewGender] = useState({name:'', abbr: ''})
    const [open, setOpen] = useState(false)

    const handleNewGender = () => {
        if(!newGender.name || !newGender.abbr){
            return toast("Please provide a Gender name and/or abbreviation", {type: 'error'})
        }

        dispatch(addGender(newGender))
        resetNewGender()
    }

    const onEdit = gender => {
        setOpen(true);
        setNewGender(gender)
    }

    const handleCancel = () => {
        setOpen(false);
        resetNewGender()
    }

    const handleUpdate = () =>{
        if(!newGender.name || !newGender.abbr){
            return toast("Please provide a Gender name and/or abbreviation", {type: 'error'})
        }

        dispatch(updateGender(newGender))
        resetNewGender()
        setOpen(false)
    }

    const resetNewGender = () => setNewGender({name: '', abbr: ''})

    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={4}>
                            <Grid container spacing={2} sx={{display: 'flex', alignItems: 'center'}}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label={'Gender Name'}
                                        placeholder='Gender Name'
                                        value={!open ? newGender?.name : ''}
                                        onChange={e => setNewGender({...newGender, name: e.target.value})} 
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label={'Gender Abbreviation'}
                                        placeholder='Gender Abbreviation'
                                        value={!open ? newGender?.abbr : ''}
                                        onChange={e => setNewGender({...newGender, abbr: e.target.value})} 
                                    />
                                </Grid>
                                <Grid item >
                                    <Button onClick={handleNewGender}>Add Gender</Button>
                                </Grid>
                                <Grid item >
                                    <Button 
                                        variant='outlined'
                                        onClick={resetNewGender}>
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
                    {genders?.map((gender, i) => (
                        <TableRow key={i} >
                            <TableCell align='left'>{i +1}</TableCell>
                            <TableCell align='left'>{gender.name}</TableCell>
                            <TableCell align='left'>{gender.abbr}</TableCell>
                            <TableCell sx={{display: 'flex', justifyContent: 'center'}}>
                                <DeleteIcon sx={{ml: 3, '&:hover': {cursor: 'pointer'}}} onClick={() => dispatch(deleteGender(gender._id))} />
                                <EditIcon sx={{ml: 3, '&:hover': {cursor: 'pointer'}}} onClick={() => onEdit(gender)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            
            <Popup title={'Updating Gender'} open={open}>
                <Grid container spacing={2} sx={{display: 'flex', alignItems: 'center', pt: 2}}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={'Gender Name'}
                            placeholder='Gender Name'
                            value={newGender?.name}
                            onChange={e => setNewGender({...newGender, name: e.target.value})} 
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={'Gender Abbreviation'}
                            placeholder='Gender Abbreviation'
                            value={newGender?.abbr}
                            onChange={e => setNewGender({...newGender, abbr: e.target.value})} 
                        />
                    </Grid>
                    <Grid item >
                        <Button onClick={handleUpdate}>Update Gender</Button>
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
