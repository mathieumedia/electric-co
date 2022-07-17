import {createTheme} from '@mui/material/styles'
import {orange} from '@mui/material/colors'
import * as utils from '../middleware/utils';

const primary = orange[500];
const white = "#fff";
const black ='black';

export default createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: primary
        },
        black: black,
        white:  white
    },

    components: {
        MuiTextField: {
            defaultProps: {
                size: 'small',
                fullWidth: true,
                InputLabelProps: {shrink: true}
            }
        },

        MuiButton: {
            defaultProps: {
                variant: 'contained',
                size: 'small'
            },
            styleOverrides: {
                root: {
                    color: white,
                    textTransform: 'none'
                }
            }
        },

        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: primary,
                }
            }
        }
    }
})