import React, { useContext } from "react"
import { useMutation } from "@apollo/react-hooks"
import RegisterForm from "./Forms/RegisterForm"
import Spinner from "../UI/Spinner/Spinner"
import { REGISTER } from "../../qraphQl/userType"
import { DispatchContext } from "../../Context"
import Page from "../Page/Page"

export default function Register() {
  const appDispatch = useContext(DispatchContext)

  const [register, { loading }] = useMutation(REGISTER, {
    onCompleted({ createUser }) {
      if (createUser) {
        appDispatch({ type: "flashMessage", value: { message: `hello ${createUser.userName} Check your email to activate your account`, type: "success" } })
        window.scrollTo(0, 0)
      }
    },
    onError(error) {
      appDispatch({ type: "flashMessage", value: { message: error.message.replace("GraphQL error:", ""), type: "error" } })
      window.scrollTo(0, 0)
    }
  })

  return (
    <Page title="Registration" withTopBar={true}>
      <RegisterForm register={register} loading={loading} />
      {loading && <Spinner />}
    </Page>
  )
}
