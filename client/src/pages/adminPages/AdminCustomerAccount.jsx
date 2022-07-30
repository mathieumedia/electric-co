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
    clearCustomerAlert, getCurrentCustomer, 
    getCustomers, updateCustomer, addCustomerBill,
    creditCustomerBill
} from '../../redux/actions/customerActions'

import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom';
import * as utils from '../../middleware/utils'

import AdminCustomerProfile from './AdminCustomerProfile';
import AdminCustomerBilling from './AdminCustomerBilling';
import PaymentHistory from '../customerPages/PaymentHistory';



export default function AdminCustomerAccount() {
    const {id} = useParams()
    const dispatch = useDispatch();
    const {essentials, essentialAlert} = useSelector(state => state.essentials)
    const {customers, customerAlert, currentCustomer} = useSelector(state => state.customers)
    const [account, setAccount] = useState(null)
    
    //#region -----------CREDIT REGION -----------
    const [newCredit, setNewCredit] = useState({creditAmount: ''})
    const initializeNewCredit = bill => {
        setNewCredit({
            ...newCredit,
            customerId: account._id,
            billId: bill._id,
            creditAmount: ''
        })
    }
    const confirmCredit = () => {
        
        if(!newCredit?.creditAmount){
            const alert = {
                message: "Please provide a credit amount", 
                type: 'error'
            }
            return utils.Alert(alert)
        }

        

        dispatch(creditCustomerBill(newCredit))
    }

    const handleCreditChange = e => {
        setNewCredit({
            ...newCredit,
            creditAmount: e.target.value
        })
    }

    const creditObj = {
        confirmCredit, 
        initializeNewCredit,
        setNewCredit,
        handleCreditChange
    }
    //#endregion


    //#region ---- NEW BILL -------
    const [newBill, setNewBill] = useState({year: new Date().getFullYear(), month: ''})
    const handleCreateNewBill = () => {

        if(!newBill.year || !newBill.month){
            return utils.Alert("A Billing Month and/or Year is required", "error")
        }

        dispatch(addCustomerBill({...newBill, customerId: id}))
    }

    const newBillObject = {
        newBill,
        setNewBill,
        handleCreateNewBill
    }
    //#endregion -----------
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
            utils.Alert(essentialAlert, dispatch, clearEssentialAlert)
        }

        if(customerAlert){
            utils.Alert(customerAlert, dispatch, clearCustomerAlert)
        }
    },[
        dispatch, essentials, customers, id, essentialAlert, customerAlert, currentCustomer
    ])

    const handleUpdate = customerData => {
        dispatch(updateCustomer(customerData))
    }

    return (
        <AdminMain>
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
                        <AdminCustomerProfile account={account} essentials={essentials} onUpdate={handleUpdate}/>
                    </TabPanel>
                    <TabPanel value={'Billing'}>
                        <AdminCustomerBilling 
                            account={account} 
                            essentials={essentials} 
                            newBillObject={newBillObject}
                            creditObj={creditObj}
                        />
                    </TabPanel>

                    <TabPanel value={'Payment History'}>
                        <PaymentHistory history={account?.paymentHistory}  />
                    </TabPanel>
                </TabContext>
            </Paper>
        </AdminMain>
    )
}
