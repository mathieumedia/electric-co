import {useState, useEffect} from 'react'
import {
    Table, TableHead, TableBody,
    TableCell, TableRow, TableFooter,
    TablePagination,
} from '@mui/material'
import PaginationActions from '../../components/PaginationActions'

export default function CustomerTable({customers, personal, handleNavigate}) {
    const [customerList, setCustomerList] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - customerList.length) : 0;

    const handlePageChange = (event, newPage) => setPage(newPage);

    const rowsPerPageChange = event => {
        setRowsPerPage(parseInt(event.target.value))
        setPage(0)
    }

    useEffect(() => {
        if(customers) setCustomerList(customers)
    }, [customers])

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell sx={{maxWidth: "20px"}}>#</TableCell>
                    <TableCell sx={{display: personal ? 'flexGrow'  : 'none'}}>First Name</TableCell>
                    <TableCell sx={{display: personal ? 'flexGrow'  : 'none'}}>Last Name</TableCell>
                    <TableCell sx={{display: !personal ? 'flexGrow'  : 'none'}}>Organization Name</TableCell>
                    <TableCell sx={{display: !personal ? 'flexGrow'  : 'none'}}>Care Of</TableCell>
                    <TableCell >Email</TableCell>
                </TableRow>
            </TableHead>
            
            <TableBody>
                {(rowsPerPage > 0
                    ? customerList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : customerList
                ).map((customer, i) => (
                    <TableRow key={customer._id} variant='hovered' onClick={() => handleNavigate(customer._id)}>
                        <TableCell>{i + 1}</TableCell>
                        {personal && <TableCell>{customer.firstName}</TableCell>}
                        {personal && <TableCell>{customer.lastName}</TableCell>}
                        
                        {!personal && <TableCell>{customer.organizationName}</TableCell>}
                        {!personal && <TableCell>{customer.careOf}</TableCell>}

                        <TableCell>{customer.email}</TableCell>
                    </TableRow>
                ))}

                {emptyRows > 0 && (
                    <TableRow>
                        <TableCell colSpan={4}  />
                    </TableRow>
                )}
            </TableBody>
            
            <TableFooter>
                <TableRow>
                    <TablePagination 
                        rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                        colSpan={4}
                        count={customerList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={rowsPerPageChange}
                        ActionsComponent={PaginationActions}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    )
}
