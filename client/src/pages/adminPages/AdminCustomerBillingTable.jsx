import {useState, useEffect} from 'react'
import {
    Paper, TableHead, TableContainer, Table,
    TableRow, TableCell, TableBody,
    TableFooter, TablePagination, Button
} from '@mui/material'
import PaginationActions from '../../components/PaginationActions'
import * as utils from '../../middleware/utils'
import AddIcon from '@mui/icons-material/Add'

export default function AdminCustomerBillingTable(props){
    const {
        monthlyBills, essentials, 
        selectedBillObj, handleCredit
    } = props
    const [customerBills, setCustomerBills] = useState(monthlyBills)
    useEffect(() => {
        if(monthlyBills){
            setCustomerBills(monthlyBills.sort((a,b) => new Date(b.billingEnd).setHours(0,0,0,0) - new Date(a.billingEnd).setHours(0,0,0,0))) 
        }

    }, [monthlyBills])
    //#region ---- Pagination methods ---
    const [page, setPage] = useState(0);
    const [billsPerPage, setBillsPerPage] = useState(3);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * billsPerPage - customerBills.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setBillsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    //#endregion
    
    return(
        <TableContainer component={Paper}>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Month</TableCell>
                        <TableCell>Balance</TableCell>
                        <TableCell>Bill Status</TableCell>
                        <TableCell sx={{display: 'flex', justifyContent: 'right'}}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(billsPerPage > 0
                        ?   customerBills.slice(page * billsPerPage, page * billsPerPage + billsPerPage)
                        :   customerBills).map((bill, index) => (
                            <TableRow key={bill._id} variant='hovered'>
                                <TableCell onClick={() => selectedBillObj?.handleSelectedBill(bill)}>{index + 1}</TableCell>
                                <TableCell onClick={() => selectedBillObj?.handleSelectedBill(bill)}>{utils.getMonthYear(bill.billingEnd)}</TableCell>
                                <TableCell onClick={() => selectedBillObj?.handleSelectedBill(bill)}>{utils.formatCurrency(bill.balance)}</TableCell>
                                <TableCell onClick={() => selectedBillObj?.handleSelectedBill(bill)}>{utils.getName(essentials?.billingStatuses, bill.status)}</TableCell>
                                <TableCell align='right'>
                                    <Button 
                                        startIcon={<AddIcon variant='light' />}
                                        onClick={() => handleCredit(bill)}>
                                            Credit
                                    </Button>
                                </TableCell>
                            </TableRow>
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
                        colSpan={8}
                        count={customerBills?.length || 0}
                        rowsPerPage={billsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={PaginationActions}
                    /> 
                </TableFooter> 
            </Table>
        </TableContainer>
    )
}