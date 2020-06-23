import React, {useState, Fragment} from 'react'
import { Link}  from 'react-router-dom'
import { HashLink as Link2 } from 'react-router-hash-link'
import {truncate} from '../../../../utils/string'
import {UPDATE_REVREPORT} from '../../../../qraphQl/revStatType'
import { useMutation} from '@apollo/react-hooks'
import FlashMessage from '../../../UI/FlashMessage/FlashMessage'
import PaginationAction from './PaginationAction'
import {timeAgo} from '../../../../utils/timeAgo'
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
    const [flash, setFlash] = useState({message:null , type:null})

    const [updateRevReport] = useMutation(UPDATE_REVREPORT,  {
      onCompleted({revReports}) {   
        setFlash({message: 'sucess', type:'sucess'})
      },
    } )
   
    let emptyRows = rowsPerPage - Math.min(rowsPerPage, finData.length - page * rowsPerPage)

        const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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

      const reportStatus = ({decision, id,}) => {
          updateRevReport({variables: {id, decision }})
      
      }
      
  
    return (
      <Fragment>
        {(flash && flash.message) &&  <FlashMessage message={flash.message} type={flash.type} />}

        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
             <TableCell align="left">review</TableCell>
             <TableCell align="left">review text</TableCell>
            <TableCell align="left">reporter</TableCell>
            <TableCell align="left">report</TableCell>
            <TableCell align="left">decision</TableCell>
            <TableCell align="left">date</TableCell>

          </TableRow>
        </TableHead>
          <TableBody>
            {
              definedata()
            .map(row => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row"> <Link2 to={`/business/${row.review.business._id}#${row.review._id}`}>review</Link2></TableCell>
                <TableCell align="left">{truncate(row.review.text, 20)}</TableCell>
                <TableCell align="left"><Link to={`/profile/${row.from._id}`}>{row.from.name}</Link></TableCell>
                <TableCell align="left">{row.report}</TableCell>
                <TableCell align="left">{row.decision}</TableCell>
                <TableCell align="left">{timeAgo(row.createdAt)}</TableCell>
                <TableCell align="left">
                  <button onClick={()=>reportStatus({decision: 'YES' , id : row._id})}>Yes</button>
                  <button onClick={()=>reportStatus({decision: 'NO' , id : row._id})}>NO</button>
                </TableCell>
              
              
               

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

      </Fragment>
        
    )
}
