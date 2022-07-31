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
    clearCustomerAlert, getProfile, updateProfile, makePayment
} from '../../redux/actions/customerActions'

import {useDispatch, useSelector} from 'react-redux'
import * as utils from '../../middleware/utils'

import CustomerProfile from './CustomerProfile';
import CustomerBilling from './CustomerBilling';
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

    const confirmPayment = newPayment => {

        const {paymentAmount, creditCard, banking} = newPayment;
        if(!paymentAmount){
            return utils.Alert({message: 'Please provide a payment amount', type: 'error'})
        }

        if(banking && (!banking?.accountNumber || !banking?.routingNumber)){
            return utils.Alert({message: 'Please provide a valid routing and/or account number', type: 'error'})
        }

        if(creditCard){
            const {cardHolder, cardNumber, cvv, zipcode, expDate} = creditCard;
            
            if(!cardHolder) return utils.Alert({message: "Please provide credit card holder's full name", type: 'error'})
            if(!cardNumber) return utils.Alert({message: "Please provide credit card number", type: 'error'})
            if(!cvv) return utils.Alert({message: "Please provide credit card cvv number", type: 'error'})
            if(!expDate) return utils.Alert({message: "Please provide credit card expiration date", type: 'error'})
            if(!zipcode) return utils.Alert({message: "Please provide credit card billing zipcode", type: 'error'})
        }
        
        dispatch(makePayment(newPayment))
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

                    <TabPanel value={'Billing'}>
                        <CustomerBilling 
                            account={account} 
                            essentials={essentials} 
                            confirmPayment={confirmPayment}
                        />
                    </TabPanel>

                    {/* <TabPanel value={'Payment History'}>
                        <PaymentHistory history={account?.paymentHistory}  />
                    </TabPanel> */}
                </TabContext>
            </Paper>
        </CustomerMain>
    )
}
