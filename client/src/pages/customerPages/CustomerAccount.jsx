import {useState, useEffect} from 'react'
import {
    Box, Tab, Paper
} from '@mui/material'

import {TabContext, TabList, TabPanel} from '@mui/lab'

// #region -------- COMPONENTS -----------
    import CustomerMain from '../../components/CustomerMain'
//#endregion

import {
    getEssentials, clearEssentialAlert, 
} from '../../redux/actions/essentialActions';
import {
    clearCustomerAlert, getProfile, updateProfile
} from '../../redux/actions/customerActions'

import {useDispatch, useSelector} from 'react-redux'
import * as utils from '../../middleware/utils'

import CustomerProfile from './CustomerProfile';
// import AdminCustomerBilling from './AdminCustomerBilling';
// import PaymentHistory from '../customerPages/PaymentHistory';



export default function CustomerAccount() {
    const dispatch = useDispatch();
    const {essentials, essentialAlert} = useSelector(state => state.essentials)
    const {customerAlert, currentCustomer} = useSelector(state => state.customers)
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


        if(!currentCustomer){
            dispatch(getProfile())
        } 

        if(currentCustomer){
            setAccount(currentCustomer)
        }

        if(essentialAlert){
            utils.Alert(essentialAlert, dispatch, clearEssentialAlert)
        }

        if(customerAlert){
            utils.Alert(customerAlert, dispatch, clearCustomerAlert)
        }
    },[
        dispatch, essentials, essentialAlert, customerAlert, currentCustomer
    ])

    const handleUpdate = customerData => {
        dispatch(updateProfile(customerData))
    }

    return (
        <CustomerMain>
            <Paper>
                <TabContext value={tab}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}} >
                        <TabList onChange={handleTabChange}>
                            <Tab label="Profile" value='Profile' />
                            <Tab label="Billing" value='Billing' />
                            <Tab label="Payment History" value='Payment History' />
                        </TabList>
                    </Box>

                    <TabPanel value={'Profile'}>
                        <CustomerProfile account={account} essentials={essentials} onUpdate={handleUpdate}/>
                    </TabPanel>

                    {/* <TabPanel value={'Billing'}>
                        <AdminCustomerBilling 
                            account={account} 
                            essentials={essentials} 
                            newBillObject={newBillObject}
                            creditObj={creditObj}
                        />
                    </TabPanel>

                    <TabPanel value={'Payment History'}>
                        <PaymentHistory history={account?.paymentHistory}  />
                    </TabPanel> */}
                </TabContext>
            </Paper>
        </CustomerMain>
    )
}
