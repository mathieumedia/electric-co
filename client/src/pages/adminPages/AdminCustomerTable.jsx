import {useState, useEffect} from 'react'
import {
    Box, Tab, Paper
} from '@mui/material'

import {TabContext, TabList, TabPanel} from '@mui/lab'

// #region -------- COMPONENTS -----------
    import AdminMain from '../../components/AdminMain'
//#endregion

import {
    getEssentials, clearEssentialAlert
} from '../../redux/actions/essentialActions';
import {useDispatch, useSelector} from 'react-redux'
import { toast } from 'react-toastify';

import NewCustomer from './NewCustomer';

export default function AdminCustomerTable() {
    const dispatch = useDispatch();
    const {essentials, essentialAlert} = useSelector(state => state.essentials)
    const [tab, setTab] = useState('New')

    const handleTabChange = (event, _tab) => {
        setTab(_tab)
    }

    useEffect(() =>{
        if(!essentials){
            dispatch(getEssentials())
        }

        if(essentialAlert){
            toast(essentialAlert.message, {type: essentialAlert.type})
            dispatch(clearEssentialAlert())
        }
    },[dispatch, essentials, essentialAlert])
    
    return (
        <AdminMain>
            <Paper>
                <TabContext value={tab}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}} >
                        <TabList onChange={handleTabChange}>
                            <Tab label="Personal" value='Personal'  />
                            <Tab label="Commercial" value='Commercial'  />
                            <Tab label="New" value='New'  />
                        </TabList>
                    </Box>

                    <TabPanel value={'Personal'}>Personal</TabPanel>
                    <TabPanel value={'Commercial'}>Commercial</TabPanel>
                    <TabPanel value={'New'} >
                        <NewCustomer accountTypes={essentials?.accountTypes}  />
                    </TabPanel>
                </TabContext>
            </Paper>
        </AdminMain>
    )
}
