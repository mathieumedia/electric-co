import {useState, useEffect} from 'react'
import {
    Box, Tab, Paper
} from '@mui/material'

import {TabContext, TabList, TabPanel} from '@mui/lab'

// #region -------- COMPONENTS -----------
    import AdminMain from '../../components/AdminMain'
//#endregion

import {
    getEssentials, clearEssentialAlert, 
} from '../../redux/actions/essentialActions';
import {
    clearCustomerAlert, getCurrentCustomer, getCustomers
} from '../../redux/actions/customerActions'

import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as utils from '../../middleware/utils'

import AdminCustomerProfile from './AdminCustomerProfile';
import AdminCustomerBilling from './AdminCustomerBilling';



export default function AdminCustomerAccount() {
    const {id} = useParams()
    const dispatch = useDispatch();
    const {essentials, essentialAlert} = useSelector(state => state.essentials)
    const {customers, customerAlert, currentCustomer} = useSelector(state => state.customers)

    const [account, setAccount] = useState(null)
    
    //#region ---- Tab Controls -----------
    const [tab, setTab] = useState('Profile')

    const handleTabChange = (event, _tab) => {
        setTab(_tab)
    }

    //#endregion --------- Tab Controls ---------

    useEffect(() =>{
        if(!essentials){
            dispatch(getEssentials())
        }

        if(!customers){
            dispatch(getCustomers())
        }

        if(id && customers){
            dispatch(getCurrentCustomer(id))
        } 

        if(currentCustomer){
            setAccount(currentCustomer)
        }

        if(essentialAlert){
            utils.Alert(essentialAlert.message, essentialAlert.type, dispatch, clearEssentialAlert)
        }

        if(customerAlert){
            utils.Alert(customerAlert.message, customerAlert.type, dispatch, clearCustomerAlert)
        }
    },[
        dispatch, essentials, customers, id, essentialAlert, customerAlert, currentCustomer
    ])

    
    return (
        <AdminMain>
            <Paper>
                <TabContext value={tab}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}} >
                        <TabList onChange={handleTabChange}>
                            <Tab label="Profile" value='Profile' />
                            <Tab label="Billing" value='Billing' />
                        </TabList>
                    </Box>

                    <TabPanel value={'Profile'}>
                        <AdminCustomerProfile account={account} essentials={essentials} />
                    </TabPanel>
                    <TabPanel value={'Billing'}>
                        <AdminCustomerBilling account={account} essentials={essentials} />
                    </TabPanel>
                </TabContext>
            </Paper>
        </AdminMain>
    )
}
