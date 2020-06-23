import React, { useContext, useEffect } from "react"
import ProfileMain from "./ProfileComp/ProfileMain"
import Spinner from "../UI/Spinner/Spinner"
import Page from "../Page/Page"
import { useQuery } from "@apollo/react-hooks"
import { DispatchContext } from "../../Context"
import { PROFILE_INFO } from "../../qraphQl/userType"

const Profile = props => {
  const appDispatch = useContext(DispatchContext)
  const userId = props.match.params.id

  // QUERIES
  const { loading, data, error } = useQuery(PROFILE_INFO, { variables: { id: userId } })

  useEffect(() => {
    if (error) {
      appDispatch({ type: "flashMessage", value: { message: "Something is wrong", type: "error" } })
    }
  }, [error])

  console.log(data)

  //  DISPLAY
  return (
    <Page title="Profile" withTopBar={true}>
      {loading && <Spinner />}
      {typeof data != "undefined" && data && <ProfileMain info={data.user} tab={props.match.params.tab} />}
    </Page>
  )
}

export default Profile
