import React from "react"
import { GET_BUSINESSES } from "../../../qraphQl/businessType"
import { useQuery } from "@apollo/react-hooks"
import TablePaginat from "../TablePaginat/TablePaginat"

export default function AllBusiness() {
  const { data } = useQuery(GET_BUSINESSES, { variables: { published: false, first: 50 } })

  return (
    <>
      <TablePaginat finData={data ? data.businesses.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) : []} />
    </>
  )
}
