import React, { useState, Fragment, useContext } from "react"
import { Link } from "react-router-dom"
import { UPDATE_REPORT } from "../../../../qraphQl/revStatType"
import { useMutation } from "@apollo/react-hooks"
import PaginationAction from "./PaginationAction"
import { timeAgo } from "../../../../utils/timeAgo"
import { DispatchContext } from "../../../../Context"
import { makeStyles, Table, TableCell, TableHead, TableBody, TableContainer, TableFooter, TablePagination, TableRow, Paper } from "@material-ui/core"

const useStyles2 = makeStyles({
  table: {
    minWidth: 500
  }
})

export default function TablePaginat({ finData }) {
  const appDispatch = useContext(DispatchContext)

  const classes = useStyles2()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)

  const [updateReport] = useMutation(UPDATE_REPORT, {
    onCompleted() {
      appDispatch({ type: "flashMessage", value: { message: `success`, type: "success" } })
      window.scrollTo(0, 0)
    }
  })

  let emptyRows = rowsPerPage - Math.min(rowsPerPage, finData.length - page * rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const definedata = () => {
    let finalData = []

    if (finData.length) {
      if (rowsPerPage > 0) {
        finalData = finData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      } else {
        finalData = finData
      }
    }
    return finalData
  }

  const reportStatus = ({ decision, id }) => {
    updateReport({ variables: { id, decision } })
  }

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell align="left">type</TableCell>
              <TableCell align="left">Link</TableCell>
              <TableCell align="left">reporter</TableCell>
              <TableCell align="left">report</TableCell>
              <TableCell align="left">decision</TableCell>
              <TableCell align="left">date</TableCell>
              <TableCell align="left">action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {definedata().map(row => (
              <TableRow key={row._id}>
                <TableCell align="left">
                  <Link to={`/profile/${row.from._id}`}>{row.type}</Link>
                </TableCell>

                <TableCell component="th" scope="row">
                  <Link to={row.type === "BUS" ? `/business/${row.business._id}` : `/review/${row.review._id}`}>Click</Link>
                </TableCell>

                <TableCell align="left">
                  <Link to={`/profile/${row.from._id}`}>{row.from._id}</Link>
                </TableCell>

                <TableCell align="left">{row.report}</TableCell>
                <TableCell align="left">{row.decision}</TableCell>
                <TableCell align="left">{timeAgo(row.createdAt)}</TableCell>
                <TableCell align="left">
                  <button onClick={() => reportStatus({ decision: "YES", id: row._id })}>Yes</button>
                  <button onClick={() => reportStatus({ decision: "NO", id: row._id })}>NO</button>
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
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={finData ? finData.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true
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
