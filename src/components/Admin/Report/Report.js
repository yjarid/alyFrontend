import React, { useState } from "react"
import { GET_REPORTS } from "../../../qraphQl/revStatType"
import { useQuery } from "@apollo/react-hooks"
import TablePaginat from "./TablePaginat/TablePaginat"

export default function Report() {
  const [finData, setFinData] = useState([])

  useQuery(GET_REPORTS, {
    onCompleted({ revReports }) {
      setFinData(revReports)
    }
  })

  console.log(finData)
  return <TablePaginat finData={finData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))} />
}
