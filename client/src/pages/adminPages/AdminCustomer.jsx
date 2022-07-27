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
import {
    getCustomers, clearCustomerAlert, getCurrentCustomer
} from '../../redux/actions/customerActions'

import {useDispatch, useSelector} from 'react-redux'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import NewCustomer from './NewCustomer';
import CustomerTable from './CustomerTable'


export default function AdminCustomer() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {essentials, essentialAlert} = useSelector(state => state.essentials)
    const {customers, customerAlert, currentCustomer} = useSelector(state => state.customers);
    const [personalCustomers, setPersonalCustomers] = useState([])
    const [commercialCustomers, setCommercialCustomers] = useState([])

    const [id, setId] = useState(null);
    const [onNavigate, setOnNavigate] = useState(false)
    const [tab, setTab] = useState('Personal')

    const handleTabChange = (event, _tab) => {
        setTab(_tab)
    }

    useEffect(() =>{
        if(!essentials){
            dispatch(getEssentials())
        }

        if(!customers){
            dispatch(getCustomers())
        } 

        if(customers && essentials) {
            const personalAcc = essentials?.accountTypes?.find(a => a.name === 'Personal')

            
            const commercialAcc = essentials?.accountTypes?.find(a => a.name === 'Commercial')

            // console.log("Personal", personalAcc)
            // console.log("Commercial", commercialAcc)

            setPersonalCustomers(customers.filter(c => c.accountType === personalAcc._id))
            setCommercialCustomers(customers.filter(c => c.accountType === commercialAcc._id))
        }

        if(essentialAlert){
            toast(essentialAlert.message, {type: essentialAlert.type})
            dispatch(clearEssentialAlert())
        }

        if(customerAlert){
            toast(customerAlert.message, {type: customerAlert.type})
            dispatch(clearCustomerAlert())
        }

        if(onNavigate && id && currentCustomer){
            navigate(`/admin/customers/account/${id}`)
        }

    },[
        dispatch, essentials, essentialAlert, 
        customers, customerAlert, navigate, id, onNavigate, currentCustomer
    ])

    const handleNavigate = (_id = null) => {
        if(_id){
            dispatch(getCurrentCustomer(_id))
            setId(_id)
        }
        setOnNavigate(true)
    }
    
    return (
        <AdminMain>
            <Paper>
                <TabContext value={tab}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}} >
                        <TabList onChange={handleTabChange}>
                            <Tab label="Personal" value='Personal' />
                            <Tab label="Commercial" value='Commercial' />
                            <Tab label="New" value='New' />
                        </TabList>
                    </Box>

                    <TabPanel value={'Personal'}>
                        <CustomerTable customers={personalCustomers} personal  handleNavigate={handleNavigate}/>
                    </TabPanel>
                    <TabPanel value={'Commercial'}>
                        <CustomerTable customers={commercialCustomers} handleNavigate={handleNavigate}/>
                    </TabPanel>
                    <TabPanel value={'New'} >
                        <NewCustomer accountTypes={essentials?.accountTypes}/>
                    </TabPanel>
                </TabContext>
            </Paper>
        </AdminMain>
    )
}
