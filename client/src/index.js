import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './themes/theme'
import store from './redux/store'
import {Provider} from 'react-redux'

import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import {AdapterLuxon} from '@mui/x-date-pickers/AdapterLuxon'
import { LocalizationProvider } from '@mui/x-date-pickers';

import 'react-toastify/dist/ReactToastify.css';
import 'simplebar/dist/simplebar.min.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                    <App />
                </LocalizationProvider>
            </ThemeProvider>
        </Provider>
        <ToastContainer 
            //theme='theme'
            limit={3} position='top-center'
            rtl={false} autoClose={2000} 
            pauseOnFocusLoss={false}
        />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
