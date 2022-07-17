import './App.css';
import SimpleBar from 'simplebar-react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'



// #region --------- COMPONENTS --------------
import LoginPage from './pages/authPages/LoginPage';
import NotFound from './pages/authPages/NotFound';
import PrivateRoute from './pages/authPages/PrivateRoute'

import AdminEssentials from './pages/adminPages/AdminEssentials'
import AdminCustomerTable from './pages/adminPages/AdminCustomerTable'
// #endregion
function App() {
    return (
        <div className="App">
            <SimpleBar style={{maxHeight:'100vh', height: '100vh'}}>
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
                            <Route path='/admin/customers' element={<AdminCustomerTable  />} />
                        </Route>
                    </Routes>
                </Router>

            </SimpleBar>
        </div>
    );
}

export default App;
