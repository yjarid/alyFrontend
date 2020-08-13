import React, { useState } from "react"
import { GET_CLAIMS } from "../../../qraphQl/claimType"
import { useQuery } from "@apollo/react-hooks"
import TablePaginat from "./TablePaginat/TablePaginat"

export default function Claim() {
  const { loading, error, data } = useQuery(GET_CLAIMS)
  const finData = data ? data.claims : []

  return <TablePaginat finData={finData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))} />
}
