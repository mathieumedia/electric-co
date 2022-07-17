import {useState} from 'react';
import {
    TextField, Button, Stack, MenuItem, 
    Typography, InputAdornment, styled, 
} from '@mui/material'
import * as utils from '../../middleware/utils'
import GlassCard from '../../components/GlassCard'

import {useDispatch, useSelector} from 'react-redux'
import { loginUser, clearAuthError } from '../../redux/actions/authActions';
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'


// #region --------- ICONS -----------
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect } from 'react';
// #endregion

// #region ---------------- STYLED COMPONENTS ------------------
const Div = styled('div')(({theme}) => ({
    padding: theme.spacing(2),
    height: '100vh',
    position: 'relative',
    ...utils.BgImage()
}))

const CenterStack = styled(Stack)(({theme}) => ({
    margin: theme.spacing(0),
    spacing: theme.spacing(0),
    position: 'absolute',
    width: '400px',
    top: '40%',
    left: '50%',
    MsTransform:'translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)',
    borderRadius: 5,
}))

// #endregion
export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {isAuthenticated, authError, isAdmin} = useSelector(state => state.auth)

    const [user, setUser] = useState(acctTypes[0])
    const [selectedType, setSelectedType] = useState("Admin")
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = () => {
        dispatch(loginUser(user))
    }

    useEffect(() => {
        if(authError){
            toast(authError.message, {type: authError.type})
            dispatch(clearAuthError())
        }

        if(isAuthenticated){
            if(isAdmin){
                navigate('/admin')
            }else {
                navigate('/customers/profile')
            }
        }
    }, [isAuthenticated, isAdmin, authError, dispatch, navigate])

    return (
        <Div>
            <CenterStack>
                <GlassCard>
                    <Stack spacing={2} >
                        <TextField
                            label='Select User type' value={selectedType}
                            select onChange={e => {
                                setSelectedType(e.target.value)
                                setUser(acctTypes.find(t => t.type === e.target.value))
                            }}
                        >
                            {acctTypes.map(acct => (
                                <MenuItem key={acct.type} value={acct.type}>{acct.type}</MenuItem>
                            ))}
                        </TextField>
                        
                        <TextField
                            label='Email' value={user.email}
                            onChange={e => {
                                setUser({...user, email: e.target.value})
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <EmailIcon  />
                                    </InputAdornment>
                                )
                            }}
                        />
                        
                        <TextField
                            label='Password' value={user.password}
                            type={showPassword ? 'password' : 'text'}
                            onChange={e => {
                                setUser({...user, password: e.target.value})
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <LockIcon  />
                                    </InputAdornment>
                                ),

                                endAdornment: (
                                    <InputAdornment position='start' sx={{'&:hover': {cursor: 'pointer'}}}>
                                        {showPassword 
                                            ?   <VisibilityIcon onClick={() => setShowPassword(!showPassword)} />
                                            :   <VisibilityOffIcon onClick={() => setShowPassword(!showPassword)} />
                                        }
                                    </InputAdornment>
                                )
                            }}
                        />

                        <Button onClick={handleLogin}>Login</Button>
                            
                    </Stack>
                </GlassCard>
            </CenterStack>
        </Div>
    )
}

const acctTypes = [
    {type: 'Admin', email: 'adminOne@mail.com', password: 'password123'},
    {type: 'Commercial', email: 'commercial@mail.com', password: 'password123'},
    {type: 'Personal', email: 'Personal@mail.com', password: 'password123'}
]
