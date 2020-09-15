import React, { useState, Fragment, useContext } from "react"
import { Link } from "react-router-dom"
import { UPDATE_CLAIM } from "../../../../qraphQl/claimType"
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

  const [updateClaim] = useMutation(UPDATE_CLAIM, {
    onCompleted({ claims }) {
      appDispatch({ type: "flashMessage", value: { message: "response updated", type: "success" } })
    },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message.replace("GraphQL error:", ""), type: "error" } })
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

  const claimStatus = ({ status, id, user, business }) => {
    updateClaim({ variables: { id, status, user, business } })
  }

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell align="left">business</TableCell>
              <TableCell align="left">claimer</TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">email</TableCell>
              <TableCell align="left">status</TableCell>
              <TableCell align="left">date</TableCell>
              <TableCell align="left">approve</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {definedata().map(row => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {" "}
                  <Link to={`/business/edit/${row.business._id}`}>{row.business.name}</Link>
                </TableCell>
                <TableCell align="left">
                  <Link to={`/profile/${row.user._id}`}>{row.user.name}</Link>
                </TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left">{row.user.email}</TableCell>
                <TableCell align="left">{row.status}</TableCell>
                <TableCell align="left">{timeAgo(row.createdAt)}</TableCell>
                <TableCell align="left">
                  <button onClick={() => claimStatus({ status: "YES", id: row._id, user: row.user._id, business: row.business._id })}>Yes</button>
                  <button onClick={() => claimStatus({ status: "NO", id: row._id, user: row.user._id, business: row.business._id })}>NO</button>
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
