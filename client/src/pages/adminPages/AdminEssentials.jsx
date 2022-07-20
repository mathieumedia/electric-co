import {useState, useEffect} from 'react'
import {
    Typography, Paper, TextField,
    MenuItem, Grid
} from '@mui/material'

// #region -------- COMPONENTS -----------
    import AdminMain from '../../components/AdminMain'
    import GenderEssentials from './essentials/GenderEssential'
    import StateEssentials from './essentials/StateEssentials'
    import BillingStatusEssential from './essentials/BillingStatusEssential'
    import AccountTypeEssential from './essentials/AccountTypeEssential'
//#endregion

import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import {getEssentials, clearEssentialAlert} from '../../redux/actions/essentialActions'
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect'


export default function AdminEssentials() {
    const [selectedEssential, setSelectedEssential] = useState('Genders');
    const dispatch = useDispatch();
    const {essentials, essentialAlert} = useSelector(state => state.essentials)

    useEnhancedEffect(() => {
        if(essentials === null){
            dispatch(getEssentials())
        }

        if(essentialAlert){
            toast(essentialAlert.message, {type: essentialAlert.type})
            dispatch(clearEssentialAlert())
        }
    }, [essentials, essentialAlert, dispatch])

    function HandleUISelection(){
        switch(selectedEssential){
            case 'Genders':
                return <GenderEssentials genders={essentials?.genders}/>
            case 'States':
                return <StateEssentials states={essentials?.states}/>
            case 'Billing Statuses':
                return <BillingStatusEssential billingStatuses={essentials?.billingStatuses}/>
            case 'Account Types':
                return <AccountTypeEssential accountTypes={essentials?.accountTypes}/>
            default:
                return <div>{`Create and/or Add ${selectedEssential} UI`}</div>
        }
    }

    return (
        <AdminMain>
            <Paper sx={{p: 1}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                        <Typography align='left'>Select Essential</Typography>
                        <TextField
                            select value={selectedEssential}
                            sx={{mx: 1, flexGrow: 1}}
                            onChange={e => setSelectedEssential(e.target.value)}
                        >
                            <MenuItem value={'Genders'}>Genders</MenuItem>
                            <MenuItem value={'States'}>States</MenuItem>
                            <MenuItem value={'Account Types'}>Account Types</MenuItem>
                            <MenuItem value={'Billing Statuses'}>Billing Statuses</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        {HandleUISelection()}
                    </Grid>
                </Grid>
            </Paper>
        </AdminMain>
    )
}
