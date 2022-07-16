import './App.css';
import SimpleBar from 'simplebar-react';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom'



// #region --------- COMPONENTS --------------
import LoginPage from './pages/authPages/LoginPage';
import NotFound from './pages/authPages/NotFound';
import PrivateRoute from './pages/authPages/PrivateRoute'

import Admin from './pages/adminPages/Admin'
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
                            <Route path='/admin' element={<Admin  />} />
                        </Route>
                    </Routes>
                </Router>

            </SimpleBar>
        </div>
    );
}

export default App;
