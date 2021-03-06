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
            variants: [
                {
                    props: {variant: 'underlinedText'},
                    style: {
                        color: primary,
                        textDecoration: 'underline'
                    }
                },
                {
                    props: {variant: 'outlined'},
                    style: {
                        color: primary,
                    }
                },
                {
                    props: {variant: 'outlines'},
                    style: {
                        color: primary,
                    }
                }
            ],
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
        },

        MuiAppBar: {
            styleOverrides: {
                root: {
                    padding: 0,
                    margin: 0
                }
            }
        },

        MuiPaper: {
            defaultProps: {
                variant: 'outlined'
            },
            styleOverrides: {
                root: {
                    padding: 0,
                    ...utils.Glass(black)
                }
            }
        },

        MuiListItemText: {
            styleOverrides: {
                root: {
                    color: primary
                }
            }
        },
        
        MuiTableCell: {
            defaultProps: {
                align: 'left'
            },
            styleOverrides: {
                root: {
                    align: 'left'
                }
            }
        },

        MuiTableRow: {
            variants: [
                {
                    props: {variant: 'hovered'},
                    style: {
                        '&:hover': {
                            backgroundColor: orange[800],
                            padding: '4px'
                        }
                    }
                }
            ]
        },

        MuiTypography:{
            variants: [
                {
                    props: {variant: 'shaded'},
                    style: {
                        backgroundColor: primary,
                        color: white,
                        padding: '4px'
                    }
                }
            ]
        }



    }
})