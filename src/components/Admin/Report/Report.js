import React from "react"
import { GET_REPORTS } from "../../../qraphQl/revStatType"
import { useQuery } from "@apollo/react-hooks"
import TablePaginat from "./TablePaginat/TablePaginat"

export default function Report() {
  const { data } = useQuery(GET_REPORTS)

  let finData = data ? data.reports : []
  console.log(finData)

  return <TablePaginat finData={finData} />
}
