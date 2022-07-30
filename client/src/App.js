import './App.css';
import SimpleBar from 'simplebar-react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'



// #region --------- COMPONENTS --------------
import LoginPage from './pages/authPages/LoginPage';
import NotFound from './pages/authPages/NotFound';
import PrivateRoute from './pages/authPages/PrivateRoute'

import AdminEssentials from './pages/adminPages/AdminEssentials'
import AdminCustomer from './pages/adminPages/AdminCustomer';
import AdminCustomerAccount from './pages/adminPages/AdminCustomerAccount';

import CustomerAccount from './pages/customerPages/CustomerAccount'

// #endregion
function App() {
    return (
        <div className="App">
            <SimpleBar style={{minHeight:'100vh', height: '100vh'}}> 
                <Router>
                    <Routes>
                        <Route path='/' element={<LoginPage  />} />
                        <Route path='*' element={<NotFound  />} />

                        <Route path='/admin' element={<PrivateRoute  />}>
                            <Route path='/admin' element={<AdminEssentials  />} />
                        </Route>

                        <Route path='/admin/essentials' element={<PrivateRoute  />}>
                            <Route path='/admin/essentials' element={<AdminEssentials  />} />
                        </Route>

                        <Route path='/admin/customers' element={<PrivateRoute  />}>
                            <Route path='/admin/customers' element={<AdminCustomer />} />
                        </Route>

                        <Route path='/admin/customers/account/:id' element={<PrivateRoute  />}>
                            <Route path='/admin/customers/account/:id' element={<AdminCustomerAccount />} />
                        </Route>

                        <Route path='/customers/profile' element={<PrivateRoute  />}>
                            <Route path='/customers/profile' element={<CustomerAccount />} />
                        </Route>

                    </Routes>
                </Router>

            </SimpleBar>
        </div>
    );
}

export default App;
