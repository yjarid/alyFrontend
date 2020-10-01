import React, { useState, useEffect } from "react"
import { useLazyQuery } from "@apollo/react-hooks"
import { GET_USERS } from "../../../../../qraphQl/userType"
import useDefinePage from "../../../../../useFuction/useDefinePage"
import UserCard from "../UserCard"

function FeaturedUser() {
  const PER_PAGE = 6

  const page = useDefinePage()

  const [getUsers, { data }] = useLazyQuery(GET_USERS)

  useEffect(() => {
    if (page >= 0) {
      getUsers({ variables: { first: PER_PAGE, skip: PER_PAGE * page, orderBy: "score_DESC" } })
    }
  }, [page])

  let users = data ? data.users : []

  return (
    <>
      {users.map(user => (
        <div key={user._id}>
          <UserCard user={user} />
        </div>
      ))}
    </>
  )
}

export default FeaturedUser
