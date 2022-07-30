import {useState, useEffect, Fragment} from 'react'
import {
    Paper, TableHead, TableContainer, Table,
    TableRow, TableCell, TableBody,
    TableFooter, TablePagination, 
    Container, Collapse, IconButton, Typography
    
} from '@mui/material'
import PaginationActions from '../../components/PaginationActions'
import * as utils from '../../middleware/utils'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

export default function PaymentHistory(props){
    const {
        history, 
    } = props
    const [customerPayments, setCustomerPayments] = useState(history)
    useEffect(() => {
        if(history){
            setCustomerPayments(history.sort((a,b) => new Date(b.paymentDate).setHours(0,0,0,0) - new Date(a.paymentDate).setHours(0,0,0,0))) 
        }

    }, [history])
    //#region ---- Pagination methods ---
    const [page, setPage] = useState(0);
    const [paymentsPerPage, setPaymentsPerPage] = useState(3);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * paymentsPerPage - customerPayments.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPaymentsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    //#endregion
    
    return(
        <Container maxWidth='md'>
            <TableContainer component={Paper}>
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{width: '20px'}}  />
                            <TableCell>#</TableCell>
                            <TableCell>Payment Date</TableCell>
                            <TableCell>Payment Amount</TableCell>
                            <TableCell>Confirmation</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(paymentsPerPage > 0
                            ?   customerPayments?.slice(page * paymentsPerPage, page * paymentsPerPage + paymentsPerPage)
                            :   customerPayments).map((payment, index) => (
                                <Row key={payment._id} payment={{...payment, index}} />

                            ))                  
                        }
                        {emptyRows > 0 && (
                            <TableRow>
                                <TableCell colSpan={8}  />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TablePagination
                            rowsPerPageOptions={[3, 6, 12, {label: 'All', value: '-1'}]}
                            colSpan={5}
                            count={customerPayments?.length || 0}
                            rowsPerPage={paymentsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={PaginationActions}
                        /> 
                    </TableFooter> 
                </Table>
            </TableContainer>
        </Container>
    )
}

function Row({payment}){
    const [open, setOpen] = useState(false)

    return (
        <Fragment>
            <TableRow>
                <TableCell>
                    <IconButton sx={'small'} onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowDownIcon  /> : <KeyboardArrowRightIcon  />}
                    </IconButton>
                </TableCell>
                <TableCell>{payment.index + 1}</TableCell>
                <TableCell>{utils.shortDate(payment.paymentDate)}</TableCell>
                <TableCell>{utils.formatCurrency(payment.paymentAmount)}</TableCell>
                <TableCell>{payment.confirmationNumber}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell  />
                <TableCell sx={{py: 0}} colSpan={4}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Typography component='div'>Payment Details</Typography>
                        <Table>
                            <TableHead>
                                <TableRow sx={{display: payment.banking ? 'flex' : 'none'}}>
                                    <TableCell sx={{flexGrow: 1}}>Routing Number</TableCell>
                                    <TableCell sx={{flexGrow: 1}}>Account Number</TableCell>
                                </TableRow>

                                <TableRow sx={{display: payment.creditCard ? 'flex' : 'none'}}>
                                    <TableCell sx={{flexGrow: 1}}>Card Holder Name</TableCell>
                                    <TableCell sx={{flexGrow: 1}}>Credit Card Number</TableCell>
                                    <TableCell sx={{flexGrow: 1}}>Exp Date</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow sx={{display: payment.banking ? 'flex' : 'none'}}>
                                    <TableCell sx={{flexGrow: 1}}>{utils.Mask(payment?.banking?.routingNumber)}</TableCell>
                                    <TableCell sx={{flexGrow: 1}}>{utils.Mask(payment?.banking?.accountNumber)}</TableCell>
                                </TableRow>

                                <TableRow sx={{display: payment.creditCard ? 'flex' : 'none'}}>
                                    <TableCell sx={{flexGrow: 1}}>
                                        {payment?.creditCard?.cardHolder}
                                    </TableCell>
                                    <TableCell sx={{flexGrow: 1}}>
                                        {utils.Mask(payment?.creditCard?.cardNumber)}
                                    </TableCell>
                                    <TableCell sx={{flexGrow: 1}}>
                                        {utils.getMonthYear(payment?.creditCard?.expDate)}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}
