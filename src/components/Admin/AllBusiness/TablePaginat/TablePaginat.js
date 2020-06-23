import React, {useState} from 'react'
import { Link}  from 'react-router-dom'
import styles from './TablePaginat.module.scss'
import { useMutation } from '@apollo/react-hooks'
import {DELETE_BUSINESS} from '../../../../qraphQl/businessType'
import {truncate} from '../../../../utils/string'
import PaginationAction from './PaginationAction';
import {makeStyles, Table, TableCell, TableHead, TableBody, TableContainer , TableFooter, TablePagination, TableRow, Paper, StylesProvider} from '@material-ui/core';


const useStyles2 = makeStyles({
    table: {
      minWidth: 500,
    },
  });

export default function TablePaginat({finData }) {

    const classes = useStyles2();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20)

    const [deleteBus, { error, loading}] = useMutation(DELETE_BUSINESS )
 
    let emptyRows = rowsPerPage - Math.min(rowsPerPage, finData.length - page * rowsPerPage)

        const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      }

      const handleDeleteBus = (id) => {
        let decision = window.confirm("Are you sur you wanna delete IT?")
       console.log(decision)
        if(decision) {
          console.log(id)
          deleteBus({variables:{id}})
        }
      }
  
      const definedata = () => {
        let finalData = []
        
          if(finData.length) {
            
              if(rowsPerPage > 0 ) {
                  finalData =  finData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              }else{
                  finalData = finData 
              }
          }
          return finalData
      }
  
    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">city</TableCell>
            <TableCell align="center">desc</TableCell>
            <TableCell align="center">Neigh</TableCell>
            <TableCell align="center">Cat</TableCell>
            <TableCell align="center">subCat</TableCell>
            <TableCell align="center">published</TableCell>
            <TableCell align="center">cordinate</TableCell>
            <TableCell align="center">phone</TableCell>
            <TableCell align="center">action</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
            {
              definedata()
            .map(row => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row"> <Link to={`/business/edit/${row._id}`}>{row.name}</Link></TableCell>
                <TableCell align="left">{row.city}</TableCell>
                <TableCell align="left">{truncate(row.desc, 15)}</TableCell>
                <TableCell align="left">{row.neighborhood}</TableCell>
                <TableCell align="left">{row.cat}</TableCell>
                <TableCell align="left">{row.subCat.map(c => c).join(', ')}</TableCell>
                <TableCell align="left">{row.published ? 'YES' : 'NO'}</TableCell>
                <TableCell align="left">{`${row.latitude} - ${row.longitude}` }</TableCell>
                <TableCell align="left">{row.phone}  </TableCell>
                <TableCell align="left"><Link to={`/business/edit/${row._id}`}>edit</Link>
                <span className={styles.deleteBtn} onClick={()=>handleDeleteBus(row._id)}>delete</span> </TableCell>
              </TableRow>
            ))}
  
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={finData ? finData.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={PaginationAction}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    )
}
